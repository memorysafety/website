---
author: Josh Aas
slug: rust-in-linux-just-the-beginning
date: 2022-10-18T00:00:00Z
title: "Rust in the Linux Kernel: Just the Beginning"
excerpt: "The next steps to bring memory safety into the Linux Kernel."
---

Support for using Rust in the Linux Kernel was [recently merged](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=8aebac82933ff1a7c8eede18cab11e1115e2062b) by Linus Torvalds. This is important because Rust is memory safe, meaning that code written in Rust does not suffer from things like buffer overflows, use-after-free, and other memory management vulnerabilities that plague software written in unsafe languages like C and C++. Being able to use Rust in the Linux kernel is an incredible milestone on the road to a more secure future for the Internet and everything else that depends heavily on Linux.

This milestone is the result of amazing work led by [Miguel Ojeda](https://ojeda.dev/). Miguel has been doing his work under contract with our [Prossimo project](https://www.memorysafety.org/), which was made possible with generous financial support from [Google](https://opensource.google/).

We will soon be lending more support to the Rust for Linux project by financially supporting [Gary Guo](https://github.com/nbdd0121)'s work on improving the Rust compiler's support for features needed in the kernel. This work has been made possible with generous support from [Futurewei](https://www.futurewei.com/).

While adding Rust support to the Linux kernel is an almost unbelievable achievement requiring years of hard work, this is just the beginning. Now this new capability needs to be used by developing and merging safer device drivers and possibly other kernel components written in Rust.

We are working to identify Rust drivers that would benefit from investment so that we can coordinate fundraising and contractors to help. We're also talking with companies that maintain drivers for their hardware and encouraging them to experiment with moving drivers to Rust.

A lot of progress has been made on an [NVMe driver](https://lpc.events/event/16/contributions/1180/attachments/1017/1961/deck.pdf) that we're excited about. We hope to make significant investments in this effort soon. The Android team at Google has been experimenting with porting their Binder IPC driver, and we expect this may be one of the first to achieve production status. Other vendors in the Android ecosystem have also expressed an interest in using Rust for new driver development. There's additionally a [GPU driver for Apple's M1](https://twitter.com/LinaAsahi/status/1575343067892051968) platform being worked on by "Asahi Lina," a member of the [Asahi Linux](https://asahilinux.org/) community.

If you'd like to help us support work on Rust drivers for the Linux kernel please get in touch!