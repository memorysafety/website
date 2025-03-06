---
author: "Josh Aas"
date: 2025-03-06T00:00:00Z
slug: "linux-kernel-2025-update"
title: "An Update on Memory Safety in the Linux Kernel"
excerpt: "Rust drivers are on the way via growing interest and community."
---

<div class="card border-0 pic-quote-right" style="max-width: 200px">
    <img alt="Rust for Linux logo" class="mx-auto img-fluid" src="/images/blog/Rust-for-Linux.svg" />
</div>

[Rust for Linux](https://rust-for-linux.com/) is an effort to support the use of the Rust language in the Linux kernel. Memory safety errors account for a large portion of kernel vulnerabilities, but this can be reduced as more drivers are written in a memory safe language. In 2021, we started working with the project's primary maintainer, [Miguel Ojeda](https://ojeda.dev/), shortly after he published the [original RFC](https://lore.kernel.org/lkml/20210414184604.23473-1-ojeda@kernel.org/) for Rust in the Linux kernel:

-   New code written in Rust has a reduced risk of memory safety bugs, data races, and logic bugs overall, thanks to the language properties.
-   Maintainers are more confident in refactoring and accepting patches for modules thanks to the safe subset of Rust.
-   New drivers and modules become easier to write, thanks to abstractions that are easier to reason about, based on modern language features, as well as backed by detailed documentation.
-   More people get involved overall in developing the kernel thanks to the usage of a modern language.
-   By taking advantage of Rust tooling, we keep enforcing the documentation guidelines we have established so far in the project. For instance, we require having all public APIs, safety preconditions, 'unsafe' blocks and type invariants documented.

Progress continued, and in [October 2022](https://www.memorysafety.org/blog/rust-in-linux-just-the-beginning/), Rust was merged into the Linux kernel as an official language. We were excited by the milestone, but understood that this change could be rolled back if there was no support and progress in driver development, so the work continued!  Today, Miguel continues to lead the Rust for Linux effort by maintaining the development and stable branches, managing the Rust for Linux core team and building its community, along with contributing to technical development and other subsystem maintenance in order to solidify and expand the Rust community in the kernel. This is a lot of work and is critical to continuing to foster a more memory safe future for the Linux kernel.

While our goal was never to rewrite the entire kernel in Rust, we are glad to see growing acceptance of Rust's benefits in various subsystems. Today, multiple companies have full time engineers dedicated to working on Rust in the Linux kernel. As recently [noted](https://fosdem.org/2025/events/attachments/fosdem-2025-6507-rust-for-linux/slides/237976/2025-02-0_iwSaMYM.pdf) by Jonathan Corbet, kernel maintainer and Executive Editor of [LWN](https://lwn.net/):

<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">In my mind, the Rust for Linux project has already achieved an important goal: proving that Rust is indeed a viable and desirable language for kernel development... This work is important for the long-term viability of Linux, and I am glad that it is succeeding.</p>
    </div>
  </blockquote>
</div>

There are several efforts that are now underway:
| Upstreamed Users | Targeted Upstream Users |
|-----------------|------------------------|
| PHY Drivers<br>Null Block driver<br>DRM panic screen QR code generator | Android Binder driver<br>Apple AGX GPU driver<br>NVMe driver<br>Nova GPU driver |

We expect that one of them will be merged into the mainline kernel in the next 12-18 months. In the recent 6.13 merge window, Greg Krogh-Hartman [noted](https://lore.kernel.org/lkml/Z0lG-CIjqvSvKWK4@kroah.com/), "rust misc driver bindings and other rust changes to make misc drivers actually possible. I think this is the tipping point, expect to see way more rust drivers going forward now that these bindings are present. Next merge window hopefully we will have pci and platform drivers working, which will fully enable almost all driver subsystems to start accepting (or at least getting) rust drivers. This is the end result of a lot of work from a lot of people, congrats to all of them for getting this far, you've proved many of us wrong in the best way possible, working code :)".

At this point, the goal of the effort will start to be realized: products and services running Linux with Rust drivers will be more secure, and that means the people using them will be more secure, too.

We'd like to thank Miguel for tirelessly working on this effort and thank the [Alpha-Omega](https://alpha-omega.dev/) project for their financial support.