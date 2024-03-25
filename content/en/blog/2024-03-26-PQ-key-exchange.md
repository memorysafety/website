---
author: Josh Aas
date: 2024-03-25T00:12:00Z
title: "The Rustls TLS Library Adds Post-Quantum Key Exchange Support"
excerpt: "Protecting TLS encryption keys in a post-quantum world."
display_default_footer: true
slug: PQ-key-exchange
---

The [Rustls TLS library](https://github.com/rustls/rustls/) has added experimental support for post-quantum key exchange (specifically, a [Kyber/X25519 hybrid scheme](https://datatracker.ietf.org/doc/draft-tls-westerbaan-xyber768d00/)). This feature prevents a post-quantum adversary from discovering the encryption keys to be used in a TLS connection. While no post-quantum adversary is known to exist today, it's important that we prepare for the eventuality now. This change is just the latest in a flurry of progress on Rustls, including the recent addition of a [FIPS-supported cryptography library ](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/)and the design and utilization of a robust [performance benchmarking system](https://www.memorysafety.org/blog/rustls-performance/).

One of the first tasks in setting up a TLS connection is figuring out which encryption keys will be used. That process is called key exchange. Most modern TLS connections use an algorithm called X25519 to exchange keys today, but that algorithm is not safe in a post-quantum context. In order to secure key exchanges for a post-quantum world, Rustls is using a hybrid approach combining the well-tested X25519 algorithm with a post-quantum [Kyber](https://en.wikipedia.org/wiki/Kyber) key encapsulation mechanism (KEM).

Support for post-quantum key exchange is currently considered to be experimental and is implemented as [a separate crate](https://crates.io/crates/rustls-post-quantum). As the specification standardizes and the code stabilizes, we will eventually make it part of the standard Rustls crate as a stable feature.

We recently learned that nearly two percent of all TLS 1.3 connections established with Cloudflare are secured with post-quantum technology. In February of this year, Apple announced that iMessage will be secured with post-quantum algorithms before the end of the year. Signal has already deployed post-quantum protection. We love to see the world proactively prepare itself for upcoming threats on a responsible timeline rather than rushing to react, and we're excited that Rustls is now on this path as well.

There are a few things that need to happen to prepare the Internet for a post-quantum world. Protecting TLS key exchange is just one of them. You can learn more about the state of post-quantum defense on the Internet in [this excellent blog post from Cloudflare](https://blog.cloudflare.com/pq-2024/).

With the advancements made to Rustls over the last few years, we now see it as a viable, performant, and memory safe alternative to OpenSSL. We're pleased to see its adoption picking up. If your organization is interested in exploring the use of Rustls, reach out and let us know! We'll continue making our [planned improvements](https://github.com/rustls/rustls/blob/main/ROADMAP.md) to Rustls but would love adopter feedback.