---
author: Josh Aas
date: 2024-02-29T00:00:00Z
title: "Rustls Now Using AWS Libcrytpo for Rust, Gains FIPS Support"
excerpt: "The Rustls TLS library is using aws-lc-rs for cryptography by default, with the option to enable FIPS support."
display_default_footer: true
slug: Rustls-with-aws-Crypto-back-end-and-FIPS
---

As of today, the [Rustls TLS library](https://github.com/rustls/rustls) is using AWS Libcrypto for Rust ([aws-lc-rs](https://github.com/aws/aws-lc-rs)) for cryptography by default, with the option to enable FIPS support. This removes a major roadblock for safer TLS in many organizations.

Over the past couple of years it became clear to us that in order to bring the best possible version of Rustls to a wider audience, we would need to make changes to the cryptographic support offered. The first step was to introduce pluggable cryptography, the ability to add support for choosing cryptographic back-ends at build time. Work on this began in Q3 2023 and is now complete. You can now choose to build Rustls with [aws-lc-rs](https://github.com/aws/aws-lc-rs) or [*ring*](https://github.com/briansmith/ring/) for cryptography. The community has started to add support for cryptography from Rust Crypto, Mbed TLS, and BoringSSL. We hope to add support for [SymCrypt](https://github.com/microsoft/SymCrypt) soon.

We chose to make aws-lc-rs the new default because it's a high quality implementation with FIPS support. The AWS cryptography team had already developed excellent Rust bindings by the time we needed them, and their team has been a joy to work with. We also appreciate that their project is open source, hosted and developed in public, on GitHub.

Over the same period of time that we worked on pluggable cryptography, ISRG engaged Adolfo Ochagavía to build [comprehensive benchmarking](https://www.memorysafety.org/blog/rustls-performance/) for Rustls. This system serves two purposes: 1) helping to prevent performance regressions, and 2) informing us about how Rustls performance compares to other libraries. It has already prevented some code from being merged that would have regressed performance, and we'll have more to say soon about the performance advantages of Rustls.

We're incredibly proud of the [big steps](https://www.memorysafety.org/initiative/rustls/) we've taken recently towards a safer TLS implementation for much of the Internet. We're excited about the [next phases of our work](https://github.com/rustls/rustls/blob/main/ROADMAP.md), including an OpenSSL compatibility layer. The OpenSSL compatibility layer will allow Rustls to act as a drop-in replacement for many OpenSSL users.

Prossimo is able to take on the challenging work of rewriting critical components of the Internet thanks to our community of funders from around the world. We'd like to thank AWS, Sovereign Tech Fund, Google, Fly.io, and OpenSSF for their support of our work on Rustls.