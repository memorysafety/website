---
author: Josh Aas
date: 2023-08-29T00:00:00Z
slug: sudo-first-stable-release
title: "The First Stable Release of a Memory Safe sudo Implementation"
excerpt: "Our Rust rewrite of sudo is ready for use."
display_default_footer: true
---

Prossimo is pleased to announce the [first stable release](https://crates.io/crates/sudo-rs) of [sudo-rs](https://github.com/memorysafety/sudo-rs), our Rust rewrite of the critical sudo utility.

The sudo utility is one of the most common ways for engineers to cross the privilege boundary between user and administrative accounts in the ubiquitous Linux operating system. As such, its security is of the utmost importance.

The [sudo-rs project](https://www.memorysafety.org/initiative/sudo-su/) improves on the security of the original sudo by:

-   Using a memory safe language (Rust), as it's estimated that one out of three security bugs in the original sudo have been memory management issues

-   Leaving out less commonly used features so as to reduce attack surface

-   Developing an extensive test suite which even managed to [find bugs in the original sudo](https://ferrous-systems.com/blog/testing-sudo-rs/)

The Wolfi Linux OS already includes sudo-rs and we hope that others will follow their lead. "When we first set out to build Wolfi, making sure it was memory safe was always a top priority," said Dan Lorenc, CEO and Co-founder at Chainguard. "The sudo utility is a perfect example of a security-critical tool that's both pervasive and under-appreciated. Security improvements to tools like this will have an outsized impact on the entire industry. The work that went into building the first sudo-rs release is a great step forward in eliminating potential security issues by adopting memory safe languages like Rust. This is critical for upholding and maintaining Wolfi as the secure-by-default foundation for developers who want to address most modern supply chain threats."

A joint team from [Tweede Golf](https://tweedegolf.nl/) and [Ferrous Systems](https://ferrous-systems.com/) built sudo-rs under contract with Prossimo. We're pleased with how much progress they've made since [starting this project](https://www.memorysafety.org/blog/sudo-and-su/) in December, 2022. An external security audit of the sudo-rs code is scheduled to start in September 2023. After that, the team will start on Milestone 4 of our [work plan](https://www.memorysafety.org/initiative/sudo-su/sudo-su-work-plan/), which focuses on enterprise features.

The original [C-based sudo utility](https://www.sudo.ws/) has been maintained by Todd C. Miller for many years now, and we're grateful to him for taking on this huge and important task. We're also grateful that Todd has made time to offer us excellent advice on implementing sudo-rs.

Prossimo is able to take on the challenging work of rewriting critical components of the Internet thanks to our community of funders from around the world. We’d like to thank the NLnet Foundation for their funding of the audit of Sudo-rs. We'd also like to thank Amazon Web Services for supporting this work and supporting the transition to memory safe software.

