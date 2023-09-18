---
author: Sarah Gran
date: 2023-09-18T00:00:00Z
slug: rustls-and-rust-for-linux-funding-openssf
title: "Advancing Rustls and Rust for Linux with OpenSSF Support"
excerpt: "Improving functionality and scalability for security sensitive Open Source software."
---

![Rustls and Rust for Linux funding OpenSSF](/images/OpenSSF-Blog-Post-Cover.png)

Prossimo continues to advance the functionality and scalability of the Rustls TLS library and the Rust for Linux effort thanks to $530,000 in funding from the [OpenSSF’s Alpha-Omega project](https://alpha-omega.dev/). This funding will further Prossimo’s efforts to bring memory safety to critical components of the Internet and further OpenSSF’s Alpha-Omega project’s mission to protect society by improving the security of open source software. "As a memory-safe language, Rust plays a pivotal role in fortifying critical software infrastructure,” said OpenSSF Alpha-Omega co-lead, Michael Scovetta. “Alpha-Omega is proud to support Prossimo's efforts to enhance the Rustls cryptographic library and bolster Rust's integration within the Linux kernel."

##### Rustls 

[Rustls](https://www.memorysafety.org/initiative/rustls/) is a memory safe library that implements the TLS and QUIC protocols. TLS is the most ubiquitous protocol for encrypting traffic on the Internet as well as internal networks. Since we began funding Rustls in 2020, we’ve made [continued](https://www.memorysafety.org/blog/preparing-rustls-for-wider-adoption/) [efforts](https://www.memorysafety.org/blog/rustls-new-features/) to move it toward being a more performant and memory safe alternative to OpenSSL.

Funding will support progress on our [work plan](https://www.memorysafety.org/initiative/rustls/rustls-work-plan/). One of the most exciting priorities is the enablement of pluggable cryptographic backends. This feature will make it possible for Rustls users to choose among cryptographic backends, bringing an important degree of diversity, flexibility and resiliency to the cryptography underlying the Internet. This optionality will also reduce friction for large organizations looking at moving to a memory safe option.

We are also planning to implement a C-based OpenSSL compatibility layer so that OpenSSL consumers can easily switch to Rustls without needing to make major changes to their code or learn Rust.

##### Rust for Linux

OpenSSF funding will help us maintain [Rust as a supported second language for Linux kernel development](https://www.memorysafety.org/initiative/linux-kernel/), and to foster the creation of drivers and modules written in Rust. Rust support was [merged into Linux kernel v6.1](https://www.memorysafety.org/blog/rust-in-linux-just-the-beginning/), an incredible achievement. Work is now focused on improving that support and getting larger modules and drivers contributed. “Bringing memory safety to a piece of software as critical as the kernel is a watershed moment for our efforts,” said the head of Prossimo and Executive Director of ISRG, Josh Aas. “With funding from OpenSSF, we remain resolutely focused on building a more secure Internet for everyone, everywhere.”

The primary maintainer of [Rust for Linux](https://rust-for-linux.com/), Miguel Ojeda, has been working full time under contract with Prossimo since [April of 2021](https://www.memorysafety.org/blog/supporting-miguel-ojeda-rust-in-linux/). His leadership has ushered Rust into the stable Linux kernel, a feat that required gaining the trust of Linux kernel maintainers and decision makers. Ojeda has also fostered the development of an invested and growing community of Contributors. “Since the merge, the kernel has been steadily gaining support for the dependencies that key use cases need, as well as new contributors and companies supporting us with engineering time” commented Ojeda. This growing  momentum for the Rust for Linux project means that now is not the time to take our foot off the gas. “The following months will be critical, because the first users of Rust in the kernel will be submitted to be evaluated by kernel maintainers. If successful, over time, some of those use cases could have a security impact in billions of devices” said Ojeda.

We hope to see more public and private organizations who rely on open source critical digital infrastructure to step up and support it. If you or your organization would like to come on board as a funder of Prossimo, we would be excited to begin a conversation with you at <donate@abetterinternet.org>.

[Internet Security Research Group (ISRG)](https://abetterinternet.org) is the parent organization of [Prossimo](http://memorysafety.org), [Let’s Encrypt](http://letsencrypt.org), and [Divvi Up](http://divviup.org). ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider getting involved, donating, or encouraging your company to become a sponsor.
