---
author: Josh Aas
date: 2024-06-13T00:00:00Z
slug: rustls-ECH-support
title: "Encrypted Client Hello (ECH) Support for Rustls"
excerpt: "Adding a TLS extension that allows clients to encrypt their Client Hello "
display_default_footer: true
---

We're pleased to announce that the [Rustls](https://github.com/rustls/rustls/) TLS library now has [experimental support](https://github.com/rustls/rustls/pull/1718) for client-side [Encrypted Client Hello (ECH)](https://datatracker.ietf.org/doc/draft-ietf-tls-esni/).

When client software wants to connect to a server it uses an IP address typically obtained via DNS. However, it's quite common for a server at a single IP address to host content from multiple different domain names. To make sure a server knows which domain name the client wants to access it will specify the domain name in the TLS connection request using the [SNI extension](https://en.wikipedia.org/wiki/Server_Name_Indication). This happens during the early Client Hello stage of setting up a TLS connection, and the domain name is not encrypted by default. ECH is a [proposed Internet standard](https://datatracker.ietf.org/doc/draft-ietf-tls-esni/) created in order to encrypt the domain. Without ECH, anyone who can see the network traffic can see which website the connection is intended for. With ECH, the domain name is encrypted, resulting in greater privacy when connecting to hosts serving many domains.

ECH is part of a trifecta of technologies that helps keep connections private: DNS over HTTPS (DoH) for protecting DNS requests, ECH for protecting the connection destination, and TLS for protecting content. You can read more about ECH in this [excellent blog post](https://blog.cloudflare.com/announcing-encrypted-client-hello) from Cloudflare.

Support will be experimental for at least a few months as we get feedback, and we hope to add server-side support by the end of the year.

We'd like to thank [Sovereign Tech Fund](https://www.sovereigntechfund.de/) and [Alpha-Omega](https://alpha-omega.dev/) for funding this work.\
With the advancements made to Rustls over the last few years (including a [FIPS-supported cryptography library](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/), [post-quantum key exchange support](https://www.memorysafety.org/blog/pq-key-exchange/) and [robust benchmarking](https://www.memorysafety.org/blog/rustls-performance/)), we now see it as a viable, performant, and memory safe alternative to OpenSSL. We're pleased to see its adoption picking up. If your organization is interested in exploring the use of Rustls, reach out and let us know! We'll continue making our [planned improvements](https://github.com/rustls/rustls/blob/main/ROADMAP.md) to Rustls but would love adopter feedback.