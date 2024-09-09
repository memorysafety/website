---
author: Stephen Crane
date: 2024-09-09T00:00:00Z
title: "Porting C to Rust for a Fast and Safe AV1 Media Decoder"
slug: porting-c-to-rust-for-AV1
excerpt: "We ported the ```dav1d``` AV1 decoder to Rust. Here’s how we did it and what we learned."
---


<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">AV1 is an increasingly important video format and it needs a memory safe, high performance decoder. We worked with the team at <a href="https://immunant.com/">Immunant</a> to develop <code>rav1d</code>, a Rust-based port of <code>dav1d</code>, a C decoder. This is the first of two blog posts about how the team approached this effort.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div>



Complex data parsing is one of the most security-critical operations in modern software. Browsers must decode untrusted audio and video inputs encoded with extremely complicated formats in real time. Memory safety bugs in this decoding process are disastrous and common. For example, researchers fuzzing H.264 decoder implementations have demonstrated that these decoders are a [dangerous source of bugs](https://www.usenix.org/conference/usenixsecurity23/presentation/vasquez). AV1 is a similarly complex, widely used video format. We need a [memory safe, performant implementation](https://www.memorysafety.org/initiative/av1/) of AV1 format parsing to avoid parsing vulnerabilities in heavily targeted software such as browsers.

To create this fast and safe AV1 decoder, we have ported an existing high performance AV1 decoding library, [```dav1d```](https://code.videolan.org/videolan/dav1d), from C to Rust: [```rav1d```](https://github.com/memorysafety/rav1d/). Our implementation is drop-in compatible with the ```dav1d``` C API. Format parsers that were unsafe C are now memory safe Rust. To preserve performance, we have kept the (unsafe) native assembly routines that implement low-level decoding operations. These assembly routines primarily operate on buffers of primitive values using validated data from the Rust parsing code. Historically, most exploitable bugs are in higher level format parsing code, rather than low level data operations. We will continue to fuzz and analyze the assembly routines to mitigate memory corruption bugs at that level.

Our goals for the ```rav1d``` implementation are:

-   Move ```dav1d```'s C code to Rust for memory safety
-   Drop-in C API compatibility
-   Performance on par with the C implementation
-   Reuse the assembly code from ```dav1d``` and make it easy to frequently synchronize it
-   X86-64 and ARM64 support

## Migration Approach

Writing a high performance and complete AV1 decoder from scratch is a challenging project. It requires a deep understanding of the AV1 standard and domain knowledge about how to best implement this codec format in a performant and compatible way. The ```dav1d``` implementation, developed by the VideoLAN and FFmpeg communities and sponsored by the Alliance for Open Media, has been under development for 6 years. It contains about 50k lines of C code and 250k lines of assembly. This implementation is mature, fast, and widely used. Rather than try to reimplement such a decoder in Rust from scratch, we chose to migrate the existing ```dav1d``` C code to Rust.

We want to provide a compatible C API to make migration to our new Rust library smoother. We also want to reuse the ```dav1d``` assembly code to preserve performance. These compatibility constraints mean that we must preserve some of the same data structure layout as ```dav1d``` both externally and internally. We must also call the assembly routines in the exact same way as ```dav1d``` does. Functionally, this requires that we implement decoding in effectively the same way as ```dav1d```.

We could have manually rewritten ```dav1d``` into Rust one function or module at a time. However, given the compatibility we wanted to retain, this would have been a tedious process. To get to the point where we could make cross-cutting changes to internal data structures necessary for enforcing memory safety would require rewriting much of the codebase. Instead we chose to migrate by initially transpiling the C code into equivalent but unsafe Rust using [c2rust](http://c2ru.st). This allowed us to start the rewriting process from a fully working, seamlessly compatible Rust codebase without introducing any new logic bugs in the process. The bulk of the work then consisted of manually refactoring and rewriting the unsafe Rust into a safe, idiomatic Rust.

Transpiling into unsafe Rust followed by rewriting provided two important advantages for this project: 1) starting from a fully working Rust implementation allowed us to thoroughly test decoding functionality while incrementally refactoring, and 2) transpiling complex decoding logic reduced the need for expert domain knowledge of the AV1 specification. We found that full CI testing from the beginning while rewriting and improving the Rust code was immensely beneficial. We could make cross-cutting changes to the codebase and run the existing ```dav1d``` tests on every commit. Between the static checking of the Rust compiler and integration testing of the full decoder, we spent comparatively less time debugging than we would have implementing a decoder from scratch. The majority of the team on this project were experts in systems programming and Rust, but did not have previous experience with AV codecs. Our codec expert on the project, [Frank Bossen](http://bossentech.com/), provided invaluable guidance but did not need to be involved in the bulk of the effort.

When we first embarked on this project, we estimated that it would take on the order of 7 person-months of effort. However, we found that we needed to spend significantly more manual effort than we had anticipated. In total we spent more than 20 person-months of effort with a team of 3 developers. The rewriting process, especially while attempting to preserve performance, ended up being far more involved than we had anticipated. We encountered some challenges that were due to idiosyncrasies of the ```dav1d``` codebase itself or the c2rust transpiler tooling. For example, the ```dav1d``` C code structure resulted in significant duplication of transpiled Rust code for both 8- and 16-bit depths, which we had to manually unify and deduplicate. Interfacing with existing assembly in a safe and ergonomic way while preserving performance required significant care and effort. Many of the other challenges we encountered are more fundamental to migrating C code to Rust, so this post will focus on these issues and our solutions.

## Challenges

We encountered various challenges due to the mismatch between C and safe Rust patterns. Lifetime management required understanding the existing codebase in great detail, but we did not find that lifetimes and borrows were the most challenging issues. Rust thread safety, which makes sharing mutable data across worker threads difficult, was a poor fit for the ```dav1d``` threading model which shares almost all data implicitly between threads. Memory ownership and buffer pointers were further important sources of difficulty, as well as unions and other unsafe C patterns.

### Threading

```dav1d``` uses a pool of worker threads to concurrently execute tasks that do not depend on each other. However, these tasks operate on shared global and per-frame context structures and even share mutable access into the same buffers. For example, Figure 1a shows an excerpt from the root context structure that all threads must access. Each in-progress frame has a ```dav1d```FrameContext which is shared between worker threads operating on that frame. Each ```dav1d```TaskContext object is only ever used by a single thread, but in the C version each object is accessible to all other threads via the root ```dav1dContext```. Finally, the root context contains many other state fields, some of which must be mutable by the main thread but readable in worker threads.

<figure>

```C++
struct dav1dContext  {
    dav1dFrameContext *fc;
    unsigned n_fc;

    dav1dTaskContext *tc;
    unsigned n_tc;

    struct dav1dTileGroup *tile;
    int n_tile_data_alloc;
    int n_tile_data;
    int n_tiles;

    // ...
}
```

<figcaption>Figure 1a: Excerpt from the C root context structure</figcaption>
</figure>



Rust requires that all data shared between threads be ```Sync```, which means that the data must be safe to access concurrently from multiple threads. We want to share a borrowed root context between all threads, so all data in that context must be immutable. To allow mutation of shared data, we must introduce locks to ensure thread safety is maintained at runtime. We added ```Mutex``` and ```RwLock``` as needed to allow interior mutation. If we assume that the original C code does not have data races (we did not observe any in ```dav1d```), these new locks should never be contended. We made heavy use of ```Mutex::try_lock()``` and ```RwLock::try_read()``` / ```RwLock::try_write()``` to validate at runtime that a thread could safely access data without possibly introducing delays waiting on a lock.

<figure>

```C++
pub struct rav1dContext {
    pub(crate) state: Mutex<rav1dState>,
    pub(crate) fc: Box<[rav1dFrameContext]>,
    pub(crate) tc: Box<[rav1dContextTaskThread]>,

    // ...
}

pub struct rav1dState {
    pub(crate) tiles: Vec<rav1dTileGroup>,
    pub(crate) n_tiles: c_int,

    // ...
}
```

<figcaption> Figure 1b: Corresponding context excerpt from <code>rav1d</code></figcaption>
</figure>

As shown in Figure 1b, we had to reorganize the ```dav1d``` structures to better fit into the Rust thread safety model. We refactored mutable state into a new ```rav1dState``` structure and wrapped this in a mutex. It's also worth noting that ```tc``` no longer contains thread-local data for all threads but instead only the thread handle and ```Sync``` metadata for thread coordination. All thread-local data from ```dav1dTaskContext``` is now managed by each worker thread independently so it does not need to be ```Sync```.

Adding extra locks handles the case where only a single thread needs to mutate a particular field or structure. ```dav1d```, in many cases, relies on concurrent but non-overlapping access to a single buffer. One thread must read or write from a range of the buffer while another thread accesses a different, disjoint range of the same buffer. This pattern, while free of data races in practice, does not map cleanly into safe Rust idioms. In safe Rust, one would generally first partition a buffer into disjoint slices then distribute these disjoint slices to different threads for processing. That pattern requires knowing the precise partitioning of each data buffer ahead of time in order to properly distribute these slices to task threads. In the case of AV1, this buffer partitioning would be extremely complicated as the partitioning is not static or even contiguous. Crates exist for storing N-dimensional arrays to allow for partitioning and chunking these buffers, such as [ndarray](https://crates.io/crates/ndarray), but we would need to understand the precise access patterns of all tasks for all buffers in order to properly partition these buffers. This would have required a fundamental re-architecting of the ```rav1d``` task scheduling.

Instead, we implemented another approach that more closely fits the model used in ```dav1d```. We created a buffer wrapper type, ```DisjointMut``` that allows for disjoint, concurrent mutable access to a buffer. In debug builds, we track each borrowed range to ensure that each mutable borrow has exclusive access to its range of elements. We found this tracking to be incredibly useful for debugging and ensuring threads did not borrow data in a way that overlaps with other threads. However, tracking each borrow is too expensive for release builds, so in release builds the entire ```DisjointMut``` structure is a zero-cost wrapper over the underlying buffer. Access into the buffer is still bounds checked, so we preserve spatial safety while potentially compromising thread safety. All ```DisjointMut``` buffers in ```rav1d``` are primitive data, so at worst this pattern could only introduce nondeterminism if access is not correctly disjoint. Figure 2 shows an excerpt from a structure that is shared by all worker threads. Multiple threads concurrently mutate different blocks in the b field, so we wrapped this vector in ```DisjointMut``` to allow concurrent access.

<figure>

```C++
struct dav1dFrameContext_frame_thread  {
    // ...

    // indexed using t->by * f->b4_stride + t->bx
    Av1Block *b;
    int16_t *cbi; /* bits 0-4: txtp, bits 5-15: eob */

    // ...
}  frame_thread;
```
<figcaption> Figure 2a: Excerpt from the C frame context structure </figcaption>
</figure>



<figure>

```C++
pub struct rav1dFrameContextFrameThread {
    // ...

    // Indexed using `t.b.y * f.b4_stride + t.b.x`.
    pub b: DisjointMut<Vec<Av1Block>>,

    pub cbi: Vec<RelaxedAtomic<CodedBlockInfo>>,

    // ...
}

```

<figcaption> Figure 2b: <code>rav1d</code> Rust equivalent to Figure 2a </figcaption>
</figure>

Where possible, we used atomic types instead of adding locking. We are relying on the code already avoiding logical data races, and atomic primitive types provide formal thread safety. We did not require any particular atomic memory ordering because we are assuming that writes to shared fields are not racy, so we used relaxed ordering. On the platforms we are targeting, naturally aligned loads and stores are already atomic, so relaxed ordering atomic operations in Rust lower to the same memory operations as in C with no additional overhead[^1]. We could not use non-relaxed atomics or fetch+update methods, as these operations lower to complex, slower instructions. We added a ```RelaxedAtomic``` wrapper to simplify usage of these atomic fields and ensure that we did not use inefficient patterns. We also used the [atomig](https://docs.rs/atomig) crate to make simple primitive sized structures and enums atomic.

Overall, we found the Rust thread safety model to be overly strict. Were we to write this decoder from scratch, we would have designed more disjoint and clear data sharing between threads. However, we were able to basically preserve performance without drastic changes to the existing logic by using new data structures such as ```DisjointMut``` and ```RelaxedAtomic``` that still give us the memory safety guarantees we want while relaxing data race safety enforcement.

### Self-Referential Structures

Pointers into the same structure or recursively between structures is a common pattern in C that is not easily reproducible in safe Rust. The challenging pointers we encountered in porting ```dav1d``` largely fit into one of two categories: cursors tracking buffer positions, and links between context structures.

We generally refactored buffer cursor pointers into integer indices. However, this was not always straightforward -- some buffer pointers could temporarily go out of bounds before the beginning of the buffer because a positive offset would later be added or the pointer would not be dereferenced at all. We refactored these cases to ensure that offsets stayed non-negative by moving index calculations. Even for simpler cases, changing pointers to indices required that we carefully track and document which buffer each index was referencing and ensure that every use of the index had access to the corresponding buffer.

We had to disentangle the ```dav1d``` context structures by removing pointers from child structures to their containers and then passing additional structure references as function parameters instead. For example, we added ```rav1dContext``` and ```rav1dFrameData``` reference parameters to ```decode_tile_sbrow```, because we had to remove these pointers from the task context structure.

<figure>

```C++
// Original C function
int dav1d_decode_tile_sbrow(dav1dTaskContext *const t) {
  const dav1dFrameContext *const f = t->f;
  dav1dTileState *const ts = t->ts;
  const dav1dContext *const c = f->c;
  // ...
}
```

```Rust
// Safe Rust version
pub(crate) fn rav1d_decode_tile_sbrow(
    c: &rav1dContext,
    t: &mut rav1dTaskContext,
    f: &rav1dFrameData,
) -> Result<(), ()> {
    let ts = &f.ts[t.ts];
}
```

<figcaption>Figure 3: Separating context structure</figcaption>
</figure>



### Unions

```dav1d``` makes some use of untagged C unions. In cases where an additional field was used as a tag, we rewrote these unions into safe tagged Rust enums. The discriminant for some unions, however, was implicit in C. For example, the stage of a task, stored in an entirely different context structure, would determine which union variant should be used. For these cases, rather than add a redundant tag and change the structure representation and size, we opted to use the [zerocopy](https://docs.rs/zerocopy) crate to reinterpret the same bytes as two different types at runtime. This was only an option because these unions consisted entirely of primitive types without padding. The ```zerocopy``` traits enforce this invariant and allow zero-cost access to the union contents, without requiring an explicit tag. Though this pattern is less idiomatic, we found it was necessary in a few cases for performance and compatibility.

## Conclusions

Was transpiling and rewriting worthwhile? We believe so, at least for the ```rav1d``` project. Rewriting an AV1 video decoder from scratch would have introduced all sorts of new bugs and compatibility issues. We found that, despite the threading and borrowing challenges, rewriting existing C code into safe, performant Rust was possible. Our ```rav1d``` implementation is currently about [6% slower](https://github.com/memorysafety/rav1d/issues/1294) than the current ```dav1d``` C implementation. We will go into more detail on the process of optimizing ```rav1d``` performance in an upcoming blog post. For applications where safety is paramount, ```rav1d``` offers a memory safe implementation without additional overhead from mitigations such as sandboxing. We believe that with continued optimization and improvements, the Rust implementation can compete favorably with a C implementation in all situations, while also providing memory safety.

[^1]: The only overhead is from not being able to combine, for example, 2 consecutive, aligned ```AtomicU8``` loads into a single ```AtomicU16``` store, which would transparently be done for ```u8```s and ```u16```s. For individual fields accessed separately, this is not a problem. It does, however, introduce more overhead when working with arrays and slices.

*We'd like to thank Amazon Web Services, Sovereign Tech Fund, and Alpha-Omega for supporting the development of this work. If you want to learn more about ```rav1d``` or start using it, check it out on [GitHub](https://github.com/memorysafety/rav1d/).*