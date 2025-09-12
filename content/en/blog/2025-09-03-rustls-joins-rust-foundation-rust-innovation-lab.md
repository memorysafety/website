---
author: Josh Aas
date: 2025-09-03T00:00:00Z
slug: rustls-joins-rust-foundation-rust-innovation-lab
title: "Rustls Joins Rust Foundation's Rust Innovation Lab"
excerpt: "The Rust Foundation just announced the launch of the Rust Innovation Lab, with the Rustls TLS library as the inaugural hosted project."
display_default_footer: true
display_inline_newsletter_embed: false
---

The [Rust Foundation](https://rustfoundation.org/) just announced the launch of the [Rust Innovation Lab](https://rustfoundation.org/rust-innovation-lab/), with the [Rustls TLS library](https://github.com/rustls/rustls/) as the inaugural hosted project. We're excited to see Rustls gain a new long-term administrative home where they will receive fundraising, governance, legal, marketing, and administrative support.

When we started the Prossimo project in 2020, we knew that investing in a TLS library that was both high performance and memory safe was a top priority. After looking at the options, we decided that the best path forward was to invest in the Rustls TLS library. Rustls was already a nice library [back then](https://www.memorysafety.org/blog/preparing-rustls-for-wider-adoption/), but it needed a number of features and performance optimizations, as well as a C API, to really become an attractive alternative to the most commonly used (but unfortunately not memory safe) TLS libraries.

Since we decided to invest in Rustls, we've raised well over a million dollars for work on the project and it has come a long way. It has a great feature set, the code quality is high, and the performance [is](https://www.memorysafety.org/blog/rustls-server-perf/) [excellent](https://www.memorysafety.org/blog/rustls-performance-outperforms/). In 2024, it gained [FIPS support.](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/) It also has multiple C APIs (one mirroring the native Rust API, and one for OpenSSL compatibility) to allow it to be easily used from other programming languages besides Rust.

In our opinion, Rustls is now both the fastest and the safest TLS library out there. Now is a great time for other software projects to consider switching to Rustls in order to provide better security and performance to their users.

With features and performance in a good place, the priorities for Rustls are responsiveness to the needs of potential adopters and stable support for long-term maintenance. The Rust Innovation Lab will help Rustls pursue those priorities and more. We couldn't be happier to see it!

We'd like to thank Joe Birr-Pixton, the creator of Rustls, for our years of great collaboration. We'd also like to thank the organizations who supported our vision and investment: the Sovereign Tech Agency, Google, [Fly.io](http://fly.io), AWS, Alpha-Omega, and craig newmark philanthropies.