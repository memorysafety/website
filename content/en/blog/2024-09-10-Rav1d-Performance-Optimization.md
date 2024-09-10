---
author: Stephen Crane, Khyber Sen
title: "Optimizing rav1d, an AV1 Decoder in Rust"
date: 2024-09-10T00:00:00Z
slug: Rav1d-Performance-Optimization
excerpt: "[```rav1d```](https://github.com/memorysafety/rav1d) is a port of the high performance [```dav1d```](https://code.videolan.org/videolan/dav1d) AV1 decoder from C to memory safe Rust. An essential goal of this project was maintaining performance, building a memory safe decoder with competitive performance compared to the leading C implementation."
---

<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">AV1 is an increasingly important video format and it needs a memory safe, high performance decoder. We worked with the team at Immunant to develop <code>rav1d</code>. Performance is critical in this context, so we've asked Stephen Crane, CTO of Immunant, to explain their efforts in achieving performance parity. If you'd like to dig deeper, <a href="/blog/porting-c-to-rust-for-av1/">check out our recent blog post</a> about how we ported the C AV1 decoder to Rust.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div>


[```rav1d```](https://github.com/memorysafety/rav1d) is a port of the high performance [```dav1d```](https://code.videolan.org/videolan/dav1d) AV1 decoder from C to memory safe Rust. An essential goal of this project is maintaining performance, building a memory safe decoder with competitive performance compared to the leading C implementation. In our [last blog post](https://www.memorysafety.org/blog/porting-c-to-rust-for-av1/), we described our migration process for this project and some of the challenges and solutions we found while rewriting unsafe Rust transpiled from the ```dav1d``` C code into safe, idiomatic Rust.

In this post, we will further explore the performance optimization side of this project. Many of the performance critical operations in ```dav1d``` are implemented in native assembly, so we reused the ```dav1d``` assembly code for these low-level, highly-tuned routines. Rust still accounts for almost exactly half of the total run time in decoding, even with all available assembly routines enabled. Optimizing this Rust code (after transpiling) has been critical to the performance of our implementation. We will cover some of the factors that we found were important to performance (along with some that weren't) and the process of optimizing ```rav1d```.

### Performance Measurement

Before starting in on the performance journey of ```rav1d```, it's worth noting exactly how we measured performance. When not otherwise specified, we measured performance by using [```hyperfine```](https://github.com/sharkdp/hyperfine) to measure the ```dav1d``` CLI tool (built from either C or our ```rav1d``` Rust implementation) decoding the Chimera[^1] 8-bit, 1080p AV1 reference video on a Ryzen 7700X with 8 threads. We measured with 10-bit input and on other CPUs (including Intel and AMD x86, and Apple and Android ARM) and found roughly similar performance results unless we note otherwise. We measured performance counters with Linux ```perf``` and Intel VTune, and compared sampled performance profiles using both tools.

All percentage performance comparisons use ```dav1d``` compiled with Clang 18 as a baseline. We baselined with Clang 18 because this is the same compiler backend used in the version of ```rustc``` we were using (1.81-nightly). Surprisingly, we found that ```dav1d``` built with Clang 18 had worse performance than a version built with Clang 17 (~3% slower). We do not know the source of this regression, but found it to be consistent across Clang and ```rustc``` using corresponding LLVM backends.

## Starting Point

We began this project from Rust code we transpiled from ```dav1d``` using the [```c2rust```](https://github.com/immunant/c2rust) tool. Initially we were focused on refactoring and rewriting this starting point into idiomatic, safe Rust, while attempting to not obviously degrade performance. In later measurements, we found that this initial transpiled version was 3.8% slower than the original C code, after we enabled all of the available assembly routines in both versions. This was surprising, as the functioning of the Rust code at this point should be basically identical to the C version. ```c2rust``` preserves low-level semantics when translating to unsafe Rust, and Rust and Clang share the same LLVM compiler backend.

We theorized that bounds checks introduced during transpilation could be part of this slowdown. ```c2rust``` replaces some fixed-size local and global arrays with Rust arrays, which introduces bounds checks on accesses. Transpiling does not add bounds checks for access to variable-sized buffers, heap allocations, and some fixed-size arrays. These are translated to unsafe raw pointer operations in Rust, so the vast majority of pointer operations are still unchecked at this point in our process. To test our theory about array bounds checking, we hacked on ```rustc``` to remove bounds checks from all slice and array accesses, and compiled a version with this modified compiler. This version was still 3% slower than ```dav1d```, so we can only attribute less than 1% of the transpiled code overhead to bounds checking. Compiling fully ported ```rav1d``` with the bounds check-less ```rustc``` similarly resulted in only a small performance improvement.

Rust also defines signed integer overflow to wrap in release mode, while in C such overflow is undefined and the compiler is free to optimize assuming overflow cannot occur. ```dav1d``` tends to use signed integers in a lot of operations, so we suspected this could be a source of performance regression. To test whether this lost optimization potential was a factor, we modified ```rustc``` to generate unchecked signed arithmetic (```add```, ```sub```, ```mul```) rather than wrapping. Some isolated instances of unchecked signed arithmetic resulted in more efficient code, but this was not a large enough difference to be measurable in aggregate.

When investigating performance counters, we found that the transpiled Rust version executed significantly (7%) more instructions than the original C version. Approximately 2% of the additional 7% instructions executed are from bounds checks. We believe that some of the remaining additional instructions are from additional type conversions and arithmetic in the transpiled code, possibly along with less efficient LLVM IR generation by the Rust frontend.

## Optimization Process

As we rewrote the unsafe ```c2rust``` output into safe and idiomatic Rust, we tried to avoid making changes that significantly affected performance. We monitored performance regressions by graphing decode time for each commit and checking for noticeable jumps, as well as checking performance manually on changes that we guessed might hurt performance. As we went along, we found increasingly subtle factors became performance bottlenecks. The first performance issue we hit was dynamic dispatch to assembly, as these calls are very hot. We then began adding inner mutability when necessary but had to carefully avoid contention. We found as we removed pointers and transitioned to safe Rust types that bounds checks increasingly became a larger factor. Buffer and structure initialization was also an issue as we migrated to safe, owned Rust types. Once we had rewritten the bulk of the code into safe Rust, we profiled and carefully optimized small factors such as branching, inlining, and stack usage until we hit diminishing returns.

### Dynamic Dispatch

```dav1d``` and ```rav1d``` handle assembly routines by providing different assembly functions corresponding to different CPU SIMD features, as well as a backup function in C and Rust, respectively. If assembly was enabled at compile-time, the library then uses runtime CPU feature detection to select which function to use for each routine. ```dav1d``` does this using function pointers, and ```rav1d``` does too, with some modifications.

Initially, we tried replacing the (indirect) function pointer dispatch with ```match```ing on the ```enum CpuFlags``` and then making direct function calls. This should be compiled down to a jump table that will be perfectly predicted, just like the perfectly predicted indirect function pointer. This technique has been known to improve performance in many other contexts, such that there is even a crate to help do this: [```enum_dispatch```](https://docs.rs/enum_dispatch). However, when profiling, we found this was actually slower than the function pointers so we returned to them. It was not clear why enum dispatch was slower in this case, and this may be a pattern the Rust compiler can optimize better.

One significant advantage to the ```enum``` dispatch approach is that it is trivial to make the fallback Rust function call be slightly different. This is needed to pass different arguments so that the fallback function can be made fully safe. With function pointers, however, this isn't as simple. We first tried changing the function pointer signature and adding shims around assembly functions that converted from the safe signature to the ```unsafe``` asm signature. However, this added an extra function call that hurt performance. It may be possible to remove this overhead with better cross-language link/binary-time optimization to allow inlining of assembly functions.

Instead, we ended up passing extra arguments to the function pointers. The assembly functions remain exactly the same and just ignore the extra arguments. This is safe to do according to the calling convention for our architectures. Passing unused arguments is inexpensive, so it ended up not hurting performance. However, we did run into issues where we wanted to pass arguments with non-stable (i.e. non ```#[repr(C)]```) ABIs. In our particular case this is fine, since only the Rust fallback function will actually read and use them, but the compiler does not know this. Ideally, we could add ```#[allow(improper_ctypes)]``` to such parameter types, but parameter type attributes are not yet allowed. To work around this, we added an ```FFISafe<T>``` type that converts between ```&T``` and ```*const FFISafe<T>```. ```FFISafe``` contains a ```PhantomData``` and a bool (to not be a ZST), and the conversion is just a pointer cast. We pass this ```FFISafe``` type as an extra argument to the function pointer, and the Rust fallback function can then access the safe Rust type rather than an unsafe raw pointer.

### Inner Mutability

We had to introduce new locks and atomic fields while porting ```dav1d``` to safe Rust to provide inner mutability of shared data structures. However, adding a ```Mutex``` or ```RwLock``` around any fields and structures that needed inner mutability resulted in lock contention across threads, as different subfields and data were accessed by threads concurrently in ```dav1d```. We had to carefully consider how to architect and split data structures so that threads would not contend with each other on write access to fields with inner mutability. We primarily ensured this by using ```Mutex::try_lock()``` and ```RwLock::try_{read,write}()``` whenever adding new locks, and testing thoroughly to make sure that taking a lock would never fail due to contention. We tried using the [```try-lock```](https://crates.io/crates/try-lock) crate but found that the fallible locking in the [```parking_lot```](https://crates.io/crates/parking_lot) crate was just as efficient for our uses.

When possible and reasonable, we used atomic data types to provide inner mutability rather than introducing new locks. The [```atomig```](https://docs.rs/atomig) crate was especially helpful in using atomics for enums and small aggregate types. We found that, at least on x86_64 and ARM, relaxed atomic loads and stores use the same instructions as non-atomic loads and stores but allow inner mutability of the atomic types supported in Rust. We did have to be careful to not use any of the ```.fetch_*``` methods of Rust atomics, as these methods lower to different instructions that require a bus lock and added noticeable overhead. Instead, we read from the atomic, perform the operation, and then write the result back to the atomic. As each individual operation is atomic, this is sound Rust, although the entire operation is not atomic. We were confident that these data accesses were not contended in the first place as they were not atomic in the ```dav1d``` C implementation. At worst, if this assumption does not hold we would have a (sound) data race, not a memory safety bug. We encapsulated these relaxed atomic types in a wrapper type, ```RelaxedAtomic<T>```, to indicate they were only atomic to provide inner mutability. This wrapper also prevents accidental use of any slow atomic operations.

### Bounds Checking

Bounds checking is one of the largest differences between our safe Rust and the original unsafe C code. C does no implicit bounds checking, while Rust implicitly checks that all buffer accesses are in-bounds. As we migrated ```unsafe``` Rust to safe, idiomatic Rust, we added many bounds checks through the use of safe Rust types. We tried to proactively minimize the impact of these checks, but measuring performance was critical to ensuring that our efforts were useful. The general idea in eliding unnecessary bounds checks was that we needed to expose as much information about indices and slice bounds to the compiler as possible. We found many cases where we knew, from global context, that indices were guaranteed to be in range, but the compiler could not infer this only from local information (even with inlining). Most of our effort to elide bounds checks went into exposing additional context to buffer accesses.

The simplest case of bounds checking is iterating over elements in one or more slice(s). At first we attempted to use iterators whenever possible to avoid bounds checks. We soon realized that they tended to introduce complexity, both at the source code and assembly instruction level because loops in the ```dav1d``` C code are often more complex than just a simple iteration. Instead, we tended toward a technique we call pre-slicing. When indexing into a slice or array in a loop (or just multiple times), first slice up to the length that will be accessed. For example, instead of this:

```Rust
fn square(src: &[u8], dst: &mut [u8], len: usize) {
  for i in 0..len {
    dst[i] = src[i] * src[i];
  }
}
```

we can do this:

```Rust
fn square(src: &[u8], dst: &mut [u8], len: usize) {
  let src = &src[..len];
  let dst = &mut dst[..len];
  for i in 0..len {
    dst[i] = src[i] * src[i];
  }
}
```

This moves the bounds check outside of the loop to the pre-slice, which makes the loop codegen simpler and more amenable to auto-vectorization and other optimizations.

When pre-slicing with ranges with a non-zero start offset, eliminating the lower bounds check was an important optimization. To eliminate the lower check, the compiler must guarantee that the lower bound will always be less than the upper bound. For example with the range ```i..i + n```, if the compiler can guarantee that ```i <= i + n```, then checking that ```i + n``` is in range is sufficient to ensure the whole range is valid. This requires that we can ensure that ```i + n``` will not overflow and wrap around to zero. We had to be careful that our arithmetic was done with the correct precision to ensure that computation could not overflow. In this case, if ```i``` and ```n``` are ```u32``` values then we can first cast to ```usize``` before doing the addition to ensure that operation will not overflow. We had to be particularly careful about this arithmetic precision in Rust, as signed integer overflow is well-defined unlike in C where it is undefined behavior and disallowed.

The type of an index can sometimes guarantee that an index is in bounds. For example, a boolean value used to index into a two element array does not require a bounds check. To take advantage of this property in ```rav1d```, we had to rewrite boolean values stored as integer types in C to Rust ```bool``` types and only cast at the point we are indexing with the value. Similarly for small, fixed sets of named integer values, we can use a Rust ```enum``` and only cast the value to a ```usize``` when it is used as an index.

Inlining is crucial in helping us propagate range information to uses where it allows bounds check elimination. We made our bounds checking methods (such as in our ```DisjointMut``` type, which we discussed further in our [blog post on refactoring ```rav1d```](https://www.memorysafety.org/blog/porting-c-to-rust-for-av1/)) as small as possible and marked them with ```#[inline]```. We moved the error handling code to an inner ```#[inline(never)]``` function, as the standard library does. The panicking and message formatting code is quite large, but since it's not on the hot path, we can put it in its own never inlined function. This way, the hot code will only have a branch and call to this error function (as well as the actual bounds check compare), and there will only be one copy of the error function. Adding this optimization resulted in all of our bounds check functions being fully inlined and made a noticeable performance improvement. Hot/cold path splitting (for panicking code paths) and partial inlining by the compiler could have eliminated the need for this manual annotation.

In some cases, inlining may not result in range information in the same optimization scope as the check we want elided. We cannot direct the compiler to only inline the small parts of larger functions that contain just the information we want to propagate. In some cases when the range is a power of 2, we can use a cheap ```&``` mask. In some others, we can use ```cmp::min```, as a ```cmov/csel``` is generally cheap (and shorter!) than a panicking branch. For cases where we have a fixed, known range, we can encode this information in the type system instead. We created an ```InRange<T, MIN, MAX>``` type, which imposes the restriction that the wrapped ```T``` type is in the range ```MIN..=MAX```. For example, for a value in the range ```0..1024```, we use the type ```InRange<u16, 0, {1024 - 1}>```. At creation we check that the value is in bounds, and then an inlined getter adds an [```assert_unchecked```](https://doc.rust-lang.org/stable/core/hint/fn.assert_unchecked.html) that the value is in the type's range. The optimizer can then rely on this property to eliminate bounds checks when using that value as an index into a sufficiently large buffer.

### Initialization

Initialization of large stack buffers is costly. ```dav1d``` handled this efficiently by leaving the initial declaration uninitialized and (sometimes only partially) initializing the buffer. In Rust, access to uninitialized memory is unsafe, so ```c2rust``` properly initializes all variables before use. This is generally fine, as the types are small and/or the optimizer can optimize out redundant initializations. However, for large, complexly initialized arrays, zero initialization of stack variables proved expensive. In these cases, we had to use an array of ```MaybeUninit``` values, as shown in the example below, and verify that all element reads only access initialized elements. When array methods for ```MaybeUninit``` are stabilized, some of this usage can be simplified, but the fundamental use of uninitialized memory will remain.

<figure>

```Rust
let mut txa = [[[[MaybeUninit::uninit(); 32]; 32]; 2]; 2];

// Calls to `decomp_tx` that initialize portions of the `txa` array omitted.
// After these calls to `decomp_tx`, the following elements of `txa` are initialized:
// * `txa[0][0][0..h4][0..w4]`
// * `txa[1][0][0..h4][0..w4]`
// * `txa[0][1][0..h4][x]` where `x` is the start of a block edge
// * `txa[1][1][y][0..w4]` where `y` is the start of a block edge

// Subsequent use of `txa`
// SAFETY: y < h4 so txa[0][0][y][0] is initialized.
let txa_y = unsafe { txa[0][0][y][0].assume_init() };

// SAFETY: h4 - 1 < h4 and ..w4 < w4 so txa[1][0][h4 - 1][..w4] is
// initialized. Note that this can be replaced by
// `MaybeUninit::slice_assume_init_ref` if it is stabilized.

let txa_slice =
    unsafe { &*(&txa[1][0][h4 - 1][..w4] as *const [MaybeUninit<u8>] as *const [u8]) };
a[..w4].copy_from_slice(txa_slice);
```

<figcaption> Partially initialized stack variable from <a href="https://github.com/memorysafety/rav1d/blob/7d7240943d519288fdc9f2b9532b750bd494bf2f/src/lf_mask.rs#L153">lf_mask.rs</a> </figcaption>
</figure>


```dav1d``` and ```rav1d``` make many large allocations as they decode large videos. We noticed that ```dav1d``` tended to completely ```free``` old buffers and re-```malloc``` new ones (which are subsequently lazily initialized). We initially replaced that with APIs like ```Vec::resize```, which avoided having to re-initialize the existing elements. However, for large allocations like the picture data pool, we realized that this was substantially slower. After some debugging, we realized that this is because zero-initialized large allocations can be optimized by the allocator and kernel, and do not require additional initialization if allocated by the kernel. In Rust, such initialization-free large zero allocations can be made through [```alloc_zeroed```](https://github.com/rust-lang/rust/blob/adf8d168af9334a8bf940824fcf4207d01e05ae5/library/alloc/src/alloc.rs#L169-L171), which ```vec![0; len]``` is special-cased for. And as soon as we started using those APIs, we regained the lost performance of ```Vec```.

### Branchless Instructions and Stack Usage

As we focused on the hottest functions, we noticed that certain optimizations we would try had unpredictable effects on code generation for branches. When making an unrelated change, some other branch became mispredicted often and degraded performance even more. It turned out that code that in most contexts was lowered to a branchless ```cmov/csel``` instruction was instead being lowered to a conditional branch, but avoiding this proved challenging.

For example, we started with this code:

<a name="code-reference-1" id="code-reference-1"></a>

<figure>

```Rust
fn decode_coefs_class<const TX_CLASS: usize, BD: BitDepth>(...) {
    ...
    let mut tok = tok as u32;
    tok *= 0x17ff41;
    level[0] = tok as u8;
    tok = (tok >> 9) & (rc as u32 + !0x7ff);
    if tok != 0 {
        rc = rc_i;
    }
    ...
}
```

<figcaption> <a href="https://github.com/memorysafety/rav1d/pull/1246/files">https://github.com/memorysafety/rav1d/pull/1246/files</a> </figcaption>
</figure>

It was already quite optimized in ```dav1d``` with all of its magic numbers and bitwise operations. When we refactored ```decode_coefs_class``` from a C (and then Rust) macro into a const generic function, performance generally stayed the same, except it introduced a new branch misprediction on ```if tok != 0```, but only for specific combinations of ```BitDepth``` and ```TxClass``` (```TX_CLASS: usize``` is the discriminant of ```enum TxClass```). After some investigation, we realized that the Rust code for ```fn decode_coefs``` (the parent function here) used significantly more stack space than the C code did. There were many stack spills, and we theorize that tiny changes elsewhere in the code (like the ```TxClass``` variant) changed stack usage, and led LLVM to make different branching optimization decisions in trying to limit stack spills.

We also noticed this was a problem in many other very large functions, so for the large and hot functions, we attempted to minimize stack usage. We tried reducing the size of arguments where possible (e.g. ```u32``` instead ```usize```, ```bool``` instead of ```usize```, a ```u8```-sized ```enum``` instead of ```usize```), but this did not consistently improve performance.

We noticed that the existence of panicking code significantly increased stack usage. Similarly to how panicking/formatting code prevented crucial inlining in bounds checking code until moved out of the function, panicking code also increased stack usage and spills. In ```decode_coefs```, we found one panic hiding in a [```#[derive(Atom)]```](https://docs.rs/atomig/latest/atomig/derive.Atom.html). [Removing it by manually ```impl```ing ```Atom```](https://github.com/memorysafety/rav1d/pull/1247) using ```.unwrap_or_default()``` instead of ```.unwrap()```, we were able to reduce ```decode_coefs``` stack usage from 296 to 232 bytes.

However, reducing stack usage all the way to C levels proved too difficult. ```rustc``` seems to generate code that uses more stack space or is harder for LLVM to optimize than ```clang``` for C code. In most cases, this doesn't turn into a performance problem. In especially large and hot functions, the additional stack size can affect performance by causing seemingly unrelated bottlenecks, like branch misprediction.

We're also aware that [```rustc``` tends to generate far more stack copies due to moves](https://web.archive.org/web/20230101080349/http://arewestackefficientyet.com/) than C compilers like ```clang```, some of which has been addressed by new LLVM optimizations for Rust. We investigated if this might be contributing to the performance overhead of Rust in ```rav1d```, but we do not do many large moves, owing to the C-style architecture of the codebase.

We ended up having to work around the branch misprediction, so we first tried changing the <a href="#code-reference-1">above code</a> to this:

<figure>

```Rust
fn decode_coefs_class<const TX_CLASS: usize, BD: BitDepth>(...) {
  ...
  // If we do this after the `tok *= 0x17ff41`,
  // it uses a mispredicted branch instead of `cmov`.
  let tok_non_zero = tok != 0;

  let mut tok = tok as u32;
  tok *= 0x17ff41;
  level[0] = tok as u8;
  tok = (tok >> 9) & (rc as u32 + !0x7ff);
  if tok_non_zero {
      rc = rc_i;
  }
  ...
}
```

<figcaption> <a href="https://github.com/memorysafety/rav1d/pull/1246/files">https://github.com/memorysafety/rav1d/pull/1246/files</a> </figcaption>
</figure>

We just stored ```tok_non_zero``` in its own variable, and this made the branch branchless again. However, after some more optimizations elsewhere in ```decode_coefs```, the branch came back again, for only one combination of ```TxClass``` and ```BitDepth```. This time, we tried to write the code in a more obviously branchless way:

<figure>

```Rust
fn decode_coefs_class<const TX_CLASS: usize, BD: BitDepth>(...) {
  ...
  let tok = tok as u32 * 0x17ff41;
  level[0] = tok as u8;

  // This is optimized differently from C to avoid branches,
  // as simple branches are not always optimized to branchless `cmov`s.
  let mask = tok >> 9;
  let tok = mask & (rc as u32 + !0x7ff);
  let mask = mask as u16;
  rc = (rc_i & mask) | (rc & !mask);
  ...
}
```

<figcaption> <a href="https://github.com/memorysafety/rav1d/pull/1257/files">https://github.com/memorysafety/rav1d/pull/1257/files</a> </figcaption>
</figure>


We rewrote the logic to avoid an ```if``` altogether (a more straightforward approach where we replaced the ```if``` with indexing like ```rc = [rc, rc_i][(tok != 0) as usize]``` resulted in a branchless ```setne```, but less efficient code otherwise). So far, it appears that LLVM has not tried to optimize this back into a branch at all given the much more explicit bit operations, but there are no guarantees that it will stay optimized well. One thing that could help would be to stabilize the recently added [```select_unpredictable```](https://github.com/rust-lang/rust/pull/128250) intrinsic, which appears to be exactly what we want (mark a branch as unpredictable so that it will be optimized as such).

### Deriving ```Clone``` and ```Copy```

A helpful user [pointed out to us](https://github.com/memorysafety/rav1d/issues/1332) that the code generated for clones differed significantly when the type derives both ```Clone``` and ```Copy``` versus only ```Clone```. As noted in [the corresponding ```rustc``` issue](https://github.com/rust-lang/rust/issues/128081), the ```Copy``` version is usually more efficient, but there are also some cases where the ```Clone``` only version is more efficient. We could make all such types both ```Clone``` and ```Copy```, getting better optimizations on average, but we don't want to semantically mark such large types as ```Copy``` and risk having them accidentally copied. We hope that [a fix](https://github.com/rust-lang/rust/pull/128299) for this issue will land in ```rustc``` soon.

### Diminishing Returns

As we profiled ```rav1d``` and compared hot instructions to the corresponding C implementation, we found many opportunities for small optimizations that added up to a few percent of performance improvement. We have covered the most productive optimization opportunities above, but we also found cases where rewriting small sequences to be more amenable for optimization was profitable. This was a tricky process, as most of our attempts to optimize machine code sequences turned out to not make a difference in overall performance. Accurate benchmarking was critical to ensuring that we did not land changes that added source code complexity without improving performance on all targets

Inlining was a small source of differences between our Rust implementation and the original C code. Rust inlines across modules, while C (without LTO) will not. We experimented with tuning the Rust inlining by adding ```#[inline(always)]``` and ```#[inline(never)]``` annotations to match the original C inlining behavior when the two differed. We found that the Rust compiler did a fairly good job of making profitable inlining choices without annotations, with the exception of a few functions that were large and cold and therefore should not be inlined. The upstream ```dav1d``` codebase did not benefit from increased inlining scope much (LTO did not substantially improve performance), which indicates to us that the C code was already structured into compilation units with an eye toward useful inlining. As would then be expected, we found that Rust with LLVM generally made the same inlining choices as Clang with the same backend.

## Current State

After applying the optimization techniques discussed here (and more), we have reduced performance overhead from a peak of about 11% when we started optimizing the safe Rust implementation in earnest to under 6% now on x86_64. We believe there is still room for further improvement, both in how the compiler optimizes Rust and in our implementation details. This will necessarily be a process of small, incremental improvements, as our profiling now indicates that the remaining overhead is spread roughly evenly across the largest, most complex functions in ```rav1d```.

[^1]: http://download.opencontent.netflix.com.s3.amazonaws.com/AV1/Chimera/Old/Chimera-AV1-8bit-1920x1080-6736kbps.ivf

*We'd like to thank Amazon Web Services, Sovereign Tech Fund, and Alpha-Omega for supporting the development of this work. If you want to learn more about ```rav1d``` or start using it, check it out on [GitHub.](https://github.com/memorysafety/rav1d/)*