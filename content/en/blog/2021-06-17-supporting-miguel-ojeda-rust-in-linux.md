---
author: Josh Aas, ISRG Executive Director
date: 2021-06-17T00:00:00Z
slug: supporting-miguel-ojeda-rust-in-linux
title: "Supporting Miguel Ojeda’s Work on Rust in the Linux Kernel"
excerpt: "When we think about what code is most critical for today’s Internet, the Linux kernel is at the top of the list."
---

ISRG’s Prossimo project for memory safety aims to coordinate efforts to move the Internet’s critical software infrastructure to [memory safe code](https://www.memorysafety.org/docs/memory-safety/). When we think about what code is most critical for today’s Internet, the Linux kernel is at the top of the list. Bringing memory safety to the Linux kernel is a big job, but the [Rust for Linux](https://github.com/Rust-for-Linux/) project is making great progress. We’re pleased to announce that we started formally supporting this work in April 2021 by providing Miguel Ojeda with a contract to work on Rust for Linux and other security efforts full time for one year. This was made possible through financial support from Google. Prior to working with ISRG, Miguel was undertaking this work as a side-project. We are happy to do our part in supporting digital infrastructure by enabling him to work full-time on it.

We’ve worked closely with Dan Lorenc, Software Engineer at Google to make this collaboration possible. "Google has found time after time that large efforts to eliminate entire classes of security issues are the best investments at scale. We understand work in something as widely used and critical as the Linux kernel takes time, but we're thrilled to be able to help the ISRG support Miguel Ojeda's work dedicated to improving the memory safety of the kernel for everyone," Dan said.

Miguel recently posted an [RFC for Rust support in the Linux kernel](https://lkml.org/lkml/2021/4/14/1023). We’ve been watching Miguel’s work with great interest, and this RFC is a perfect example of the consideration and diligence that goes into his efforts. “Adding a second language to the Linux kernel is a decision that needs to be carefully weighed. Rust brings enough improvements over C to merit such consideration,” Miguel said about his motivation for this work. We’re excited for Miguel to be able to focus on this work over the next year.

The Linux kernel is at the heart of the modern Internet, from servers to client devices. It’s on the front line for processing network data and other forms of input. As such, vulnerabilities in the Linux kernel can have a wide-ranging impact, putting security and privacy for people, organizations, and devices at risk. Since it’s written largely in the C language, which is not memory-safe, memory safety vulnerabilities such as buffer overflows and use-after-frees are a constant concern. By making it possible to write parts of the Linux kernel in Rust, which is memory-safe, we can entirely eliminate memory safety vulnerabilities from certain components, such as drivers.

We’d like to thank Alex Gaynor, Geoffrey Thomas, Nick Desaulniers, Wedson Almeida Filho, and Miguel Ojeda for their work to get the Rust for Linux project off the ground and build the strong community that supports it today, as well as all of the folks who have contributed to the effort. We’d also like to thank Google again for their financial support.

While this is the first memory safety effort we’ve announced under our new Prossimo project name, our memory safety work began in 2020. You can read about our efforts to bring memory safety to [curl](https://www.memorysafety.org/blog/memory-safe-curl/) and the [Apache HTTP server](https://www.memorysafety.org/blog/memory-safe-tls-apache/), and to add improvements to the [Rustls TLS library](https://www.memorysafety.org/blog/preparing-rustls-for-wider-adoption/).

ISRG is the 501(c)(3) nonprofit organization behind Prossimo and [Let’s Encrypt](https://letsencrypt.org/). We are 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you’d like to support our work, please consider getting involved, [donating](https://www.abetterinternet.org/donate/), or encouraging your company to become a [funder](https://www./become-a-funder/).
