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

While this is the first memory safety effort we’ve announced under our new Prossimo project name, our memory safety work began in 2020. You can read about our efforts to bring memory safety to [curl](https://www.memorysafety.org/post/memory-safe-curl/) and the [Apache HTTP server](https://www.memorysafety.org/post/memory-safe-tls-apache/), and to add improvements to the [Rustls TLS library](https://www.memorysafety.org/post/preparing-rustls-for-wider-adoption/). 

ISRG is the 501(c)(3) nonprofit organization behind Prossimo and [Let’s Encrypt](https://letsencrypt.org/). We are 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you’d like to support our work, please consider getting involved, [donating](https://www.abetterinternet.org/donate/), or encouraging your company to become a [sponsor](https://www.abetterinternet.org/sponsor/).




















SSL/TLS libraries are critical software infrastructure for the Internet. Unfortunately, most of them have a long history of serious security issues. Many of those issues stem from the fact that the libraries are usually written in languages like C, which are not [memory safe](https://www.abetterinternet.org/docs/memory-safety/). It’s time for the Internet to move on to more secure software, and that’s why our Memory Safety Initiative is coordinating work to make further improvements to the [Rustls TLS library](https://github.com/ctz/rustls).

Rustls is an excellent alternative to OpenSSL and similar libraries. Much of its critical code is written in Rust so it’s largely memory-safe without sacrificing performance. It has [been audited](https://github.com/ctz/rustls/blob/main/audit/TLS-01-report.pdf) and found to be a high quality implementation. Here’s one of our favorite lines from the report:

“Using the type system to statically encode properties such as the TLS state transition function is one just one example of great defense-in-depth design decisions.”

With financial support from Google, we’ve contracted with Dirkjan Ochtman, an experienced Rust developer and Rustls contributor, to make a number of additional improvements to Rustls, including:

- [Enforce a no-panic policy](https://github.com/ctz/rustls/issues/447) to eliminate the potential for undefined behavior when Rustls is used across the C language boundary.
- Improve the [C API](https://github.com/abetterinternet/crustls) so that Rustls can even more easily be integrated into existing C-based applications. Merge the C API into the main Rustls repository.
- Add support for validating certificates that contain an IP address in the subject alternate name extension.
- Make it possible to configure server-side connections based on client input.

These improvements should make Rustls a more attractive option for many projects. We are already integrating it into [Curl](https://www.abetterinternet.org/post/memory-safe-curl/) and [Apache httpd](https://www.abetterinternet.org/post/memory-safe-tls-apache/), and we hope to replace the use of OpenSSL and other unsafe TLS libraries in use at [Let’s Encrypt](https://letsencrypt.org/) with Rustls.

We currently live in a world where deploying a few million lines of C code on a network edge to handle requests is standard practice, despite all of the evidence we have that such behavior is unsafe. Our industry needs to get to a place where deploying code that isn’t memory safe to handle network traffic is widely understood to be dangerous and irresponsible. People need memory safe software that suits their needs to be available to them though, and that’s why we’re getting to work.

ISRG is a 501\(c\)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you’d like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](/sponsor/).
