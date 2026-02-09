---
author: Miguel Ojeda
slug: memory-safety-in-linux-kernel
date: 2022-06-23T00:00:00Z
title: "Memory Safety for the World’s Largest Software Project"
excerpt: "An update from guest author Miguel Ojeda on his contributions in the Rust for Linux initiative."
---



## Rust for Linux and Prossimo

The Rust for Linux project aims to bring a new system programming language into the Linux kernel. Rust has a key property that makes it very interesting to consider as the second language in the kernel: it guarantees no undefined behavior takes place (as long as unsafe code is sound), particularly in terms of memory management. This includes no use-after-free issues, no double frees, no data races, etc.

Prossimo is an [Internet Security Research Group](https://www.abetterinternet.org/) (ISRG) project. Its goal is to improve the Internet's security-sensitive software infrastructure by addressing memory safety issues in C and C++ code via the use of memory safe languages. One critical example of such infrastructure is the Linux kernel, used in most servers in the world as well as in billions of devices.


## The origins of Rust and the kernel

The desire to write Linux kernel code in Rust has been around for quite a while, and different people have created out-of-tree modules with Rust over the years. The earliest attempt I am aware of is from 2013 by [Taesoo Kim](https://github.com/tsgates/rust.ko), which was even before Rust 1.0 was released.

The [Rust for Linux project](https://github.com/Rust-for-Linux) was created with a dream goal beyond out-of-tree modules: providing Rust support within the kernel itself. If GitHub logs are to be believed, I created the organization back in the summer of 2019, although it did not really have activity until the next summer, when several things happened in a row.

In July 2020, Nick Desaulniers sent an email to the Linux Kernel Mailing List (LKML) about putting together an “in-tree Rust” session for the 2020 Linux Plumbers Conference (LPC). That email resulted
in a few of us presenting the ["Barriers to in-tree Rust"](https://lpc.events/event/7/contributions/804/) talk in August 2020, which triggered quite a few discussions and feedback in the LPC hackrooms. While it was still a moonshot, it seemed like enough people had an interest in Rust around the kernel; thus I thought it would be a good time to get everyone together working in a single place.

To that end, a handful of days later I submitted the first pull request of the Rust for Linux project which added [the initial Rust support](https://github.com/Rust-for-Linux/linux/pull/4), including the Kbuild integration, initial built-in modules support and the beginning of the `kernel` crate (which contained Alex Gaynor's and Geoffrey Thomas' [abstractions](https://www.youtube.com/watch?v=RyY01fRyGhM)).

Others joined the effort over the next few months, such as Wedson Almeida Filho from Google, who is a maintainer of the project and the main contributor to the abstractions and drivers. Soon after that the Internet Security Research Group contacted me to offer support on working on Rust for Linux full time for a year with funding from Google.


## Progress this year

We have had a lot of progress since the Request for Comments was submitted to the Linux Kernel Mailing List. On the infrastructure side, some relevant changes include:

  - Removed panicking allocations by integrating a subset of the `alloc` standard library.
  - Moved to Edition 2021 of the Rust language.
  - Moved to stable releases of the Rust compiler ([unstable features are still used](https://github.com/Rust-for-Linux/linux/issues/2)) and started to track the latest version.
  - Added `arm` (32-bit) and `riscv` basic architecture support.
  - Testing support, including running documentation tests inside the kernel as KUnit tests.
  - Added support for hostprogs (userspace programs used during build) written in Rust.
  - On-the-fly generation of target specification files based on the kernel configuration.
  - Expanded the documentation, including a new example repository showing a Rust out-of-tree module based on the in-tree Rust support.

On the abstractions and driver side, some important changes have been:

  - PrimeCell PL061 GPIO example driver.
  - Functionality for platform and AMBA drivers, red-black trees, file descriptors, efficient bit iterators, tasks, files, IO vectors, power management callbacks, IO memory, IRQ chips, credentials, VMA, Hardware Random Number Generators, networking...
  - Synchronization features such as RW semaphores, revocable mutexes, raw spinlocks, a no-wait lock, sequence locks...
  - Replaced `Arc` and `Rc` from the `alloc` crate with a simplified kernel-based `Ref`.
  - Better panic diagnostics and simplified pointer wrappers.
  - The beginning of Rust `async` support.

Related projects saw a lot of progress too:

  - Rust stabilized a few [unstable features we used](https://github.com/Rust-for-Linux/linux/issues/2).
  - Improvements on the Rust compiler, standard library and tooling, such as making `rustc_parse_format` compile on stable or the addition of the `no_global_oom_handling` and `no_fp_fmt_parse` gates.
  - `binutils`/`gdb`/`libiberty` got support for Rust v0 demangling.
  - `pahole` is getting support for excluding Rust compilation units.
  - Intel's 0Day/LKP kernel test robot started testing a build with Rust support enabled.
  - KernelCI is also looking forward to enable Rust in their runs.
  - Linaro's TuxSuite added Rust support.
  - `rustc_codegen_gcc` (the `rustc` backend for GCC) got merged into the Rust repository.
  - GCC Rust (a Rust frontend for GCC) is working towards compiling `core`, which would be quite a milestone.
  - Compiler Explorer added the alternative compilers for Rust (GCC Rust, `rustc_codegen_gcc` and `mrustc`), as well as other features such as MIR and macro expansion views.

On top of that, we got contacted by several entities from the industry about their interest in the project, such as Google, Arm, Microsoft and Red Hat. Other companies have also privately expressed support for the project and/or are giving time to their engineers to explore its usage.

We have also been in contact with several academics, including researchers at the University of Washington: “Rust for Linux is a key step towards reducing security-critical kernel bugs, and on the path towards our ultimate goal of making Linux free of security-critical bugs. We are using Rust in our OS research, and adoption is easier with an existing Rust in the Linux kernel framework in place”. They recently published [An Incremental Path Towards a Safer OS Kernel](https://sigops.org/s/conferences/hotos/2021/papers/hotos21-s09-li.pdf).

Similarly, members of [LSE](https://www.lse.epita.fr) (Systems Research Laboratory) at EPITA (École pour l'informatique et les techniques avancées) used Rust for Linux because they “are convinced that Rust is changing the landscape of system programming by applying the research done on programming languages in the last decades. We wanted to see how the language was able to help us write code we are really comfortable with thanks to the extensive static checking.”

In addition, we presented Rust for Linux (and Rust in general) in a few avenues: [Linaro Virtual Connect Fall](https://resources.linaro.org/en/resource/A4Z6FpSkwsWJdfixEbNTiZ), [Clang Built Linux Meetup](https://clangbuiltlinux.github.io/cbl-meetup/), Linux Plumbers Conference (LPC) (e.g. on [Rust in the Linux ecosystem](https://www.youtube.com/watch?v=jTWdk0jYy54), on [Rust for Linux](https://www.youtube.com/watch?v=46Ky__Gid7M) and on [Android drivers in Rust](https://www.youtube.com/watch?v=aRbxBeaFf54&t=8367s)), [Samsung Engineering Summit](https://www.srib.in/SEConference/), [Open Source Summit Japan](https://www.youtube.com/watch?v=yxau9EJq9NE&t=2061s), [Rust Cross Team Collaboration Fun Times (CTCFT)](https://rust-lang.github.io/ctcft/meetings/2021-11-22.html) and [Rust Linz](https://www.youtube.com/watch?v=fVEeqo40IyQ). As a fun fact, according to the keynote’s [informal poll](https://www.youtube.com/watch?v=2SHwVhWzwa0&t=256s) at LPC 2021, Rust was the emerging technology attendees were most excited about.

We also gave a couple Linux Foundation Live Mentorship Series sessions on [an introduction to Rust safety and abstractions](https://linuxfoundation.org/webinars/rust-for-linux-writing-abstractions-and-drivers/) and on [code documentation and tests](https://linuxfoundation.org/webinars/rust-for-linux-code-documentation-tests/).

Finally, we organized [Kangrejos](https://kangrejos.com), the Rust for Linux Workshop (using the LPC infrastructure – thanks!), as a place to meet with everyone interested in a single place just before LPC.


## How the last year felt

The kernel is a huge project with a lot of stakeholders. Since the beginning, it was clear that adding a second "main" language to the kernel would have both technical and management challenges.

For instance, we have had discussions and feedback from maintainers of the kernel build system, documentation, testing, CIs, architecture, tooling (e.g. `pahole`), etc. We also had contact with several Rust teams for discussions around features the kernel needed and other topics. We talked to organizations like the Linux Foundation as well as with news organizations such as Linux Weekly News (LWN), which covered several [Rust-related topics](https://lwn.net/Kernel/Index/#Development_tools-Rust) and [Kangrejos](https://lwn.net/Archives/ConferenceIndex/#Kangrejos).

All in all, most of my work last year has been on working with all the stakeholders to try to get everyone on board. There have been _many_ people that have contributed to the project in many different ways: code contributions, reviews, documentation, tooling support, Rust
features... to the point that it is hard to list them all. Please take a look at the "Acknowledgments" section of each [cover letter](https://lore.kernel.org/lkml/20220507052451.12890-1-ojeda@kernel.org/)
throughout the months. Some recurring contributors have been [Björn Roy Baron](https://github.com/bjorn3) and [Gary Guo](https://github.com/nbdd0121) (as experts on the Rust compiler), [Maciej Falkowski](https://github.com/m-falkowski1), [Adam Bratschi-Kaye](https://github.com/adamrk), [Sven Van Asbroeck](https://github.com/TheSven73), [Boqun Feng](https://github.com/fbq), [Finn Behrens](https://github.com/Kloenk)...

Overall, it has been a blast working with all the different teams and people, and I hope we continue forward getting everyone together to make this happen. Prossimo's commitment to this project has allowed me to work full time on it for which I am very grateful – thank you!


## The next year

This second year since the RFC we are looking forward to several milestones which hopefully we will achieve:

  - More users or use cases inside the kernel, including example drivers – this is pretty important to get merged into the kernel.
  - Splitting the `kernel` crate and managing dependencies to allow better development.
  - Extending the current integration of the kernel documentation, testing and other tools.
  - Getting more subsystem maintainers, companies and researchers involved.
  - Seeing most of the remaining Rust features stabilized.
  - Possibly being able to start compiling the Rust code in the kernel with GCC.
  - And, of course, getting merged into the mainline kernel, which should make everything else easier!

In terms of events, we are looking forward to:

  - Open Source Summit North America – [tune in](https://ossna2022.sched.com/event/11Npq/rust-for-linux-status-update-miguel-ojeda-rust-maintainer-wedson-almeida-filho-google) and ask questions!
  - The second edition of [Kangrejos](https://kangrejos.com), the Rust for Linux Workshop, face-to-face this time.
  - Linux Plumbers Conference 2022. This year there will be a [Rust MC](https://lpc.events/event/16/contributions/1159/) (microconference), and we intend to cover talks and discussions on both Rust for Linux as well as other non-kernel Rust topics. [The Call for Proposals is open!](https://lpc.events/event/16/abstracts/)
  - Three more Linux Foundation Live Mentorship Series are coming.
  - Participation planned in a few more venues, to be announced.

If all this happens, it may turn out to be an even more exciting year than the first!





About Prossimo
--------------

ISRG is the 501(c)(3) nonprofit organization behind Prossimo and [Let's Encrypt](https://letsencrypt.org/). We are 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider getting involved, [donating](https://www.abetterinternet.org/donate/), or encouraging your company to become a [funder](/become-a-funder/).