---
author: Gary Guo
date: 2023-03-08T12:00:00Z
slug: gary-guo-klint-rust-tools
title: "Klint: Compile-time Detection of Atomic Context Violations for Kernel Rust Code"
excerpt: "Improvements to the klint tool will help facilitate adoption of Rust in the Linux kernel."
---

<div class="">
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">Gary Guo is helping us enable the adoption of memory safe software through work to improve a Rust tool called <code>klint</code>. We asked him to provide his perspective on the work in this blog post. Thank you for your partnership and contributions, Gary!</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div><br  />

For the last couple of months, I have been working on a static analysis tool called [`klint`](https://github.com/rust-for-linux/klint) that is able to detect, in compile time, coding errors related to atomic contexts in Rust kernel code.

In this blog post, I'll talk about what is atomic context, what can happen if they are misused, how it is related to Rust and why it is important to detect these errors.

Atomic Contexts
---------------

Generally, a piece of Linux kernel code runs in one of two contexts, atomic context or task context (we are not going to discuss the raw atomic context in this blog post). Code running in task contexts is allowed to sleep, e.g. rescheduling or acquiring a mutex. Code running in atomic contexts, on the other hand, is not allowed to sleep.

One obvious example of atomic context is interrupt handlers. Apart from interrupts, the kernel also moves from task context into atomic context if a spinlock is acquired, or when the code is inside an RCU critical section.

Sleeping inside an atomic context is bad -- if you acquire a spinlock and then go to sleep, and another piece of code tries to acquire the same spinlock, it is very likely that the system will be locked up.

<pre>
<code>spin_lock(&lock);</code>
...
<code>mutex_lock(&mutex);</code>  // BAD
...
<code>spin_unlock(&lock);</code>
</pre><br />

These kinds of mistakes are easy to make and hard to debug, especially when the sleepable call is deeply nested. To debug this, kernel C code has `might_sleep()` annotations all around the place (e.g. inside the `mutex_lock` function). If you have `DEBUG_ATOMIC_SLEEP` config enabled, then the kernel will track the preemption count. This counter is incremented whenever you enter an atomic section (e.g. by acquiring a spinlock) and decremented on exit. If the counter is non-zero, then it means that the kernel is inside an atomic context -- calling `might_sleep()` in this case will produce a warning to aid debugging.


Memory Safety Aspects of Atomic Context
---------------------------------------

The Rust for Linux project tries hard to ensure that it can provide safe abstractions of the kernel C API and empower drivers to be written in safe Rust code. We already have a [list of synchronisation primitives](https://rust-for-linux.github.io/docs/kernel/sync/index.html) implemented, and this includes spinlocks and mutexes. Therefore, the concept of atomic context is as relevant in Rust code as in C code.

You might ask, how is memory safety related here? If you are familiar with Rust, there's a chance that you are aware of what "memory safety" in Rust means. Safe code in Rust should not be able to cause use-after-free or data races, but causing a deadlock is memory safe. If a Rust kernel driver sleeps while inside an atomic context, it might cause a deadlock, which is bad and should be avoided, but it should be memory safe regardless, right?

This would be true if spinlocks were the only source of atomic contexts. However, the kernel very widely employs RCU (read-copy-update). Details of RCU can be found in [the kernel documentation](https://www.kernel.org/doc/html/v6.1/RCU/whatisRCU.html), but in a nutshell, RCU is a synchronisation mechanism to provide efficient read access to shared data structures. It allows multiple readers to access shared data structures without locking. A data structure accessible from an RCU read-side critical section will stay alive and will not be deallocated until all read-side critical sections that may access it have been completed.

In the kernel, an RCU read-side critical section starts with `rcu_read_lock()` and ends with `rcu_read_unlock()`. To drop a data structure unpublished from RCU, one would do `synchronize_rcu()` before dropping it:

<pre>
/* CPU 0 */                 /* CPU 1 */
<code>rcu_read_lock();</code>
<code>ptr = rcu_dereference(v);</code>   <code>old_ptr = rcu_dereference(v);</code>
/* use ptr */               <code>rcu_assign_pointer(v, new_ptr);</code>
                            <code>synchronize_rcu();</code>
                            /* waiting for RCU read to finish */
<code>rcu_read_unlock();</code>
                            /* synchronize_rcu() returns */
                            /* destruct and free old_ptr */
</pre><br  />

If you look at the implementation detail of `rcu_read_lock()`, however, you will see that it compiles down to a single compiler barrier &mdash; `asm volatile("":::"memory")`, if all the debugging facilities are off. Yes, there are absolutely no instructions generated for `rcu_read_lock()` and `rcu_read_unlock()`! Linux kernel plays a trick here -- it implements `synchronize_rcu()` in a way such that it returns after all CPU cores experience context switches at least once. The kernel considers an RCU read-side critical section to be an atomic context, so no code inside it may sleep and thus cause a context switch. With this reasoning, if all CPU cores have gone through context switches, then all live read critical sections must have been completed. **The soundness of `synchronize_rcu()` relies on the fact that code cannot sleep inside RCU read-side critical sections!** If such sleep indeed happens, it can cause `synchronize_rcu()` to return early and thus cause memory to be freed before `rcu_read_unlock()`, leading to use-after-free.

TL;DR: How RCU is implemented in the Linux kernel lifts sleep in atomic context from "it's bad because it might cause deadlock" to "it's bad because it can cause use-after-free".

RCU Abstractions in Rust
------------------------

Rust code, unlike C, usually does not use separate `lock` and `unlock` calls for synchronisation primitives -- instead, [RAII](https://doc.rust-lang.org/rust-by-example/scope/raii.html) is used, and `lock` primitives are typically implemented by having a lock function that returns a `Guard`, and unlocking happens when the `Guard` is dropped.

For example, RCU read-side critical section could be implemented like this:

<pre>
<code>struct RcuReadGuard {
    _not_send: PhantomData<*mut ()>,
}

pub fn rcu_read_lock() -> RcuReadGuard {
    rcu_read_lock();
    RcuReadGuard { _not_send: PhantomData }
}

impl Drop for RcuReadGuard {
    fn drop(&mut self) {
        rcu_read_unlock();
    }
}</code>

// Usage
<code>{
    let guard = rcu_read_lock();</code>

    /* Code inside RCU read-side critical section here */

    // `guard` is dropped automatically when it goes out of scope,
    // or can be dropped manually by `drop(guard)`.
<code>}</code>
</pre><br  />

If we disregard the memory safety issues discussed above just for a second, Rust lifetimes can model RCU fairly well:

<pre>
<code>struct RcuProtectedBox&lt;T&gt; {
    write_mutex: Mutex<()>,
    ptr: UnsafeCell<*const T>,
}

impl&lt;T&gt; RcuProtectedBox&lt;T&gt; {
    fn read<'a>(&'a self, guard: &'a RcuReadGuard) -> &'a T {</code>
        // SAFETY: We can deref because `guard` ensures we are protected by RCU read lock
        <code>let ptr = unsafe { rcu_dereference!(*self.ptr.get()) };</code>
        // SAFETY: The lifetime is the shorter of `self` and `guard`, so it can only be used until RCU read unlock.
        <code>unsafe { &*ptr }
    }

    fn write(&self, p: Box&lt;T&gt;) -> Box&lt;T&gt; {
        let g = self.write_mutex.lock();
        let old_ptr;</code>
        // SAFETY: We can deref and assign because we are the only writer.
        <code>unsafe {
            old_ptr = rcu_dereference!(*self.ptr.get());
            rcu_assign_pointer!(*self.ptr.get(), Box::into_raw(p));
        }
        drop(g);
        synchronize_rcu();</code>
        // SAFETY: We now have exclusive ownership of this pointer as `synchronize_rcu` ensures that all reader that can read this pointer has ended.
        <code>unsafe { Box::from_raw(old_ptr) }
    }
}</code>
</pre><br  />

Note that in `read`, the returned lifetime `'a` is tied to both `self` and `RcuReadGuard`. That is, the `RcuReadGuard` must outlive the returned reference -- leaving RCU read-side critical section by dropping `RcuReadGuard` will ensure that references obtained through the `read` method will no longer be readable.

However, such an abstraction is not sound, due to the sleep-in-atomic-context issue that we have described above.

<pre><code>
fn foo(b: &RcuProtectedBox<Foo>) {        fn bar(b: &RcuProtectedBox<Foo>) {
    let guard = rcu_read_lock();
    let p = b.read(&guard);
                                              let old = b.write(Box::new(Foo { ... }));
    sleep();                                  </code>// `synchronize_rcu()` returns<code>
                                              drop(old);</code>
    // Rust allows us to use `p` here
    // but it is already freed!
<code>}
</code></pre><br  />

There were discussions about how we can provide abstractions of RCU in a sound way in the past two years. One approach is to make all RCU abstractions unsafe -- this is bad from a usability point of view, and wouldn't solve the issue when a Rust callback is called from C code inside RCU read critical sections. We can force preemption count and atomic context checking to be enabled, but this would introduce overhead to all kernel code that makes use of RCU and spinlocks. In fact, this approach was [proposed](https://lore.kernel.org/rust-for-linux/Yyh3kFUvt2aMh4nq@wedsonaf-dev/) by Wedson Almeida Filho and faced [some rather significant pushbacks](https://lore.kernel.org/rust-for-linux/CAHk-=whm5Ujw-yroDPZWRsHK76XxZWF1E9806jNOicVTcQC6jw@mail.gmail.com/) from Linus Torvalds.

People familiar with paradigms in Rust might also wonder if a token type, or some possible [context and capabilities](https://tmandry.gitlab.io/blog/posts/2021-12-21-context-capabilities/) extension might help with this, but unfortunately it would not help this scenario. [You can't do negative reasoning with token types](https://lore.kernel.org/rust-for-linux/20220920233947.0000345c@garyguo.net/) thus a token-based approach would require almost all functions to carry tokens in their signatures.

In the end, we took none of the above approaches. There are no safeguards in the kernel's Rust API abstractions that prevent sleep-in-atomic-context from happening. This means that if you compile your kernel with preemption count tracking disabled, it's possible to write a Rust driver with only safe code that results in a use-after-free. Pragmatism is prioritised over soundness.

Custom Compile-time Checking with `klint`
---------------------------------------

While we have now established that we can't deal with sleep in atomic context with API design, nor with runtime checking (at least not in all configurations), there is still a way out -- custom linting tools. Here's how `klint` comes to play.

`klint` checks atomic context violation by tracking preemption count at compile-time. Each function is given two properties:

-   The **adjustment** to the preemption count after calling this function.

-   The **expected range** of preemption counts allowed when calling the function.

Here's a list of properties for some locking-related functions:

| Function name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Adjustment &nbsp;&nbsp; | Expectation &nbsp;&nbsp; |
| --- | --- | --- |
| `spin_lock` | `1` | `0`.. (any value) |
| `spin_unlock` | `-1` | `1`.. (≥1) |
| `mutex_lock` | `0` | `0` |
| `mutex_unlock` | `0` | `0` |
| `rcu_read_lock` | `1` | `0`.. |
| `rcu_read_unlock` | `-1` | `1`.. |
| `synchronize_rcu` | `0` | `0` |
<br  />

As you can see, sleepable functions (like `synchronize_rcu` and `mutex_lock`) are marked as having an adjustment of 0 (thus will not change the preemption count) and expects the preemption count of precisely 0 (i.e. not in atomic context). `spin_lock` can be called from any context (thus `0`.. expectation) but will adjust the preemption count after returning.

`klint` provides a `#[klint::preempt_count]` attribute that can be applied to functions to annotate their properties. There is also a `#[klint::drop_preempt_count]` that can be used to annotate behaviour when a struct/enum is dropped. For example, the `RcuReadGuard` (and similarly, `SpinLock`) above could be annotated like this:

<pre>
#[klint::drop_preempt_count(adjust = -1, expect = 1.., unchecked)]
<code>struct RcuReadGuard { /* ... */ }</code>

#[klint::preempt_count(adjust = 1, expect = 0.., unchecked)]
<code>pub fn rcu_read_lock() -> RcuReadGuard {</code> /* ... */ <code}</code>
</pre><br />

and sleep function could look like this:

<pre>
#[klint::preempt_count(adjust = 0, expect = 0, unchecked)]
<code>pub fn coarse_sleep(duration: Duration) {</code> /* ... */ <code>}</code>
</pre><br />


`klint` will analyse all functions, inferring possible preemption count values at each function call site, and will raise errors if the annotated expectation is violated. For example, if some code calls `coarse_sleep` with spinlock or RCU read lock held, then `klint` will give an error:

<pre><code>error: this call expects the preemption count to be 0</code>
  --> samples/rust/rust_sync.rs:76:17
   |
76 |  <code>kernel::delay::coarse_sleep(core::time::Duration::from_secs(1));</code>
   |  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = <b>note</b>: but the possible preemption count at this point is 1
</pre><br  />

`klint` will also perform inference on annotated functions, to check that your annotation is correct, unless the `unchecked` option is supplied:

<pre>#[klint::preempt_count(expect = 0..)]
<code>pub fn callable_from_atomic_context() {
    kernel::delay::coarse_sleep(core::time::Duration::from_secs(1));
}</code></pre><br  />
will give

<pre><code>error: function annotated to have preemption count expectation of 0..</code>
  --> samples/rust/rust_sync.rs:97:1
   |
97 | <code>pub fn callable_from_atomic_context() {</code>
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = <b>note</b>: but the expectation inferred is 0
note: which may call this function with preemption count 0..
  --> samples/rust/rust_sync.rs:98:5
   |
98 |     <code>kernel::delay::coarse_sleep(core::time::Duration::from_secs(1));</code>
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   = <b>note</b>: but this function expects preemption count 0</code></pre><br  />

In an ideal world, apart from FFI functions that need to be annotated, all other functions can have these properties inferred. But in reality there are additional difficulties from:

-   Generic functions

-   Indirect function calls (trait objects, function pointers)

-   Recursion`

For recursive functions, `klint` will simply assume a default property, and if the result is different, it will give an error, asking for an explicit annotation.

Generic functions are tricky because it is impossible for us to assign a single property to a generic function. For example, we can't tell whether `Option::map` will sleep or not -- its property depends on its type argument, that is, the function/closure that we give it. Therefore, instead of treating a generic function as one entity, `klint` will check each monomorphized instance of a generic function separately. `klint` does attempt to optimise this process -- it will try to infer properties on a generic function first before bailing out and checking again after monomorphization.

`klint` assumes all function pointers to be sleepable and makes no adjustment to preemption counts. `klint` will warn if a Rust function that adjusts the preemption count is converted to a function pointer. For callers that can ensure their function pointers won't sleep, `klint` provides a way to annotate a function with its properties and skip checks and inferences.

For trait objects, by default `klint` will similarly assume these functions are sleepable and make no adjustment. Unlike function pointers though, trait methods can be annotated. Those annotations will be used on virtual function calls, and they will be checked against their implementations. For example, here's how the `ArcWake` trait is annotated in the `kasync` module:

<pre>/// A waker that is wrapped in [`Arc`] for its reference counting.
///
/// Types that implement this trait can get a [`Waker`] by calling [`ref_waker`].
<code>pub trait ArcWake: Send + Sync {</code>
    /// Wakes a task up.
    #[klint::preempt_count(expect = 0..)]
    <code>fn wake_by_ref(self: ArcBorrow<'_, Self>);</code>

    /// Wakes a task up and consumes a reference.
    #[klint::preempt_count(expect = 0..)] // Functions callable from `wake_up` must not sleep
    <code>fn wake(self: Arc&lt;Self&gt;) {
        self.as_arc_borrow().wake_by_ref();
    }
}</code></pre><br  />

These annotations and inferred results are absent in `rustc`'s metadata so `klint` will persist these data in a separate metadata file. Similar to `clippy`, `klint` is implemented with a custom `rustc` driver, so to use it, simply replace `rustc` invocations with `klint` calls.

`klint` in Action
---------------

<https://github.com/Rust-for-Linux/linux/pull/958> is an experimental PR which includes necessary changes to Rust for Linux code to make it work with `klint`. While still not production-ready, `klint` is already able to find bugs.

If the `FIXME` line in `rust/kernel/kasync/executor/workqueue.rs` is commented out, compiling the "Rust" branch (note that this is the branch with experimental code and is not the branch for upstreaming) with `klint` will fail with the following error:

<pre>
<code>error: trait method annotated to have preemption count expectation of 0..</code>
   --&gt; rust/kernel/kasync/executor/workqueue.rs:147:5
    |
147 |     fn wake(self: Arc&lt;Self&gt;) {
    |     ^^^^^^^^^^^^^^^^^^^^^^^^
    |
    = <b>note</b>: but the expectation of this implementing function is 0
<b>note</b>: the trait method is defined here
   --&gt; rust/kernel/kasync/executor.rs:73:5
    |
73  |     fn wake(self: Arc&lt;Self&gt;) {
    |     ^^^^^^^^^^^^^^^^^^^^^^^^
<b>note</b>: which may drop type `kernel::sync::Arc&lt;kernel::kasync::executor::workqueue::Task&lt;core::future::from_generator::GenFuture&lt;[static generator@samples/rust/rust_echo_server.rs:25:75: 31:2]&gt;&gt;&gt;` with preemption count 0..
   --&gt; rust/kernel/kasync/executor/workqueue.rs:149:5
    |
147 |     fn wake(self: Arc&lt;Self&gt;) {
    |             ---- value being dropped is here
148 |         Self::wake_by_ref(self.as_arc_borrow());
149 |     }
    |     ^
<b>note</b>: which may call this function with preemption count 0..
   --&gt; rust/kernel/sync/arc.rs:236:5
    |
236 |     fn drop(&mut self) {
    |     ^^^^^^^^^^^^^^^^^^
<b>note</b>: which may drop type `kernel::sync::arc::ArcInner&lt;kernel::kasync::executor::workqueue::Task&lt;core::future::from_generator::GenFuture&lt;[static generator@samples/rust/rust_echo_server.rs:25:75: 31:2]&gt;&gt;&gt;` with preemption count 0..
   --&gt; rust/kernel/sync/arc.rs:255:22
    |
255 |             unsafe { core::ptr::drop_in_place(inner) };
    |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    = <b>note</b>: which may drop type `kernel::kasync::executor::workqueue::Task&lt;core::future::from_generator::GenFuture&lt;[static generator@samples/rust/rust_echo_server.rs:25:75: 31:2]&gt;&gt;` with preemption count 0..
    = <b>note</b>: which may drop type `kernel::sync::Arc&lt;kernel::kasync::executor::workqueue::Executor&gt;` with preemption count 0..
<b>note</b>: which may call this function with preemption count 0..
   --&gt; rust/kernel/sync/arc.rs:236:5
    |
236 |     fn drop(&mut self) {
    |     ^^^^^^^^^^^^^^^^^^
<b>note</b>: which may drop type `kernel::sync::arc::ArcInner&lt;kernel::kasync::executor::workqueue::Executor&gt;` with preemption count 0..
   --&gt; rust/kernel/sync/arc.rs:255:22
    |
255 |             unsafe { core::ptr::drop_in_place(inner) };
    |                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    = <b>note</b>: which may drop type `kernel::kasync::executor::workqueue::Executor` with preemption count 0..
    = <b>note</b>: which may drop type `kernel::Either&lt;kernel::workqueue::BoxedQueue, &kernel::workqueue::Queue&gt;` with preemption count 0..
    = <b>note</b>: which may drop type `kernel::workqueue::BoxedQueue` with preemption count 0..
<b>note</b>: which may call this function with preemption count 0..
   --&gt; rust/kernel/workqueue.rs:433:5
    |
433 |     fn drop(&mut self) {
    |     ^^^^^^^^^^^^^^^^^^
    = <b>note</b>: but this function expects preemption count 0
</pre><br />

The problematic call trace that `klint` supplies ends on the `BoxedQueue::drop`. If we navigate to that function, we will see that it ends with a call to `destroy_workqueue`, which indeed might sleep. This can happen if the `Waker` is called after the executor is dropped and the tasks cancelled.

Limitation
----------

Currently, `klint` does not have a way to represent a `try_lock`-like function for spinlocks (`try_lock` for mutexes is fine as it doesn't change the preemption count).

<pre><code>impl&lt;T&gt; SpinLock&lt;T&gt; {</code>
    // Preemption count adjustment of this function is 0 or 1 depending on the variant of the return value.
<code>    fn try_lock(&self) -&gt; Option&lt;Guard&lt;'_, Self, WriteLock&gt;&gt; { ... }
}</code></pre><br  />

Although it's possible to rewrite the `try_lock` function to take a callback to avoid this limitation:

<pre><code>impl&lt;T&gt; SpinLock&lt;T&gt; {</code>
    // Preemption count adjustment of this function is 0!
    <code>fn try_lock&lt;T, F: FnOnce(Option&lt;Guard&lt;'_, Self, WriteLock&gt;&gt;) -&gt; T&gt;(&self) -&gt; T { ... }
}</code></pre><br  />

this is not as easy to use as a simple `try_lock` function that returns an `Option`.

Similarly, this pattern is not yet supported by `klint`:

<pre><code>fn foo(take_lock: bool) {
    if take_lock {
        spin_lock(...);
    }
    ...
    if take_lock {
        spin_unlock(...);
    }
}</code></pre><br  />

The anticipation is that this pattern is less likely to be observed in Rust code due to RAII guards, but similar patterns can still arise from implicit drop flags introduced by the compiler:

<pre><code>fn foo(take_lock: bool) {
    let guard;</code>
    // An implicit bool will be introduced here by the compiler to track if `guard` is initialised
    <code>if take_lock {
        guard = SPINLOCK.lock();
    }
    ...</code>
    // An implicit branch will be introduced here by the compiler to drop `guard` only if it has been initialised
<code>}</code></pre><br  />

Future Work
-----------

While `klint` is already proven to be useful, to date it is largely a prototype and needs more work to be production ready. Some possible future work includes:

-   Extending the analysis to work with acquiring/releasing locks conditionally (as discussed in the previous section);

-   Improving diagnostic messages to be more intuitive for kernel programmers (e.g. use `this function might sleep` as opposed to `this function expects preemption count 0`);

-   Exploring ways to annotate FFI functions automatically or derive them from C source file;

-   Expanding the checks to include raw atomic contexts misuse.

-   Integrating `klint` into CI.

About Us
--------

ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](/getinvolved/), [donating](/donate/), or encouraging your company to [become a funder](/become-a-funder/).