---
author: Josh Aas, Joe Birr-Pixton, and Daniel McCarney
date: 2024-10-21T00:00:00Z
title: "Rustls Performance"
slug: rustls-performance-outperforms
excerpt: "Memory Safe Rustls Outperforms OpenSSL and BoringSSL."
display_default_footer: false
---

ISRG has been investing heavily in the [Rustls TLS library](https://github.com/rustls/rustls) over the past few years. Our goal is to create a library that is both memory safe and a leader in performance.

Back in January of this year we published a [post](https://www.memorysafety.org/blog/rustls-performance/) about the start of our performance journey. We've come a long way since then and we're excited to share an update on Rustls performance today.

## What is Rustls?

Rustls is a memory safe TLS implementation with a focus on performance. It is production ready and used in a wide range of applications. You can read more about its history on [Wikipedia](https://en.wikipedia.org/wiki/Rustls).

It comes with a C API and [FIPS support](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/) so that we can bring both memory safety and performance to a broad range of existing programs. This is important because OpenSSL and its derivatives, widely used across the Internet, have a long history of memory safety vulnerabilities with more being found this year. It's time for the Internet to move away from C-based TLS.

## Handshake Performance

The first metric we'll look at is the number of handshakes that can be completed per second on the same hardware with the same resource constraints. These tests connect one client to one server over a memory buffer, and then measure the time elapsed in client and server processing &mdash; therefore, they give an upper bound on performance given no network latency or system call overhead.

![](/images/blog/blog-2024-10-22-chart1.png)

![](/images/blog/blog-2024-10-22-chart2.png)

Rustls leads in every scenario tested.

## Throughput Performance

The next metric we'll look at is throughput on the same hardware with the same resource constraints, in terms of megabytes per second:

![](/images/blog/blog-2024-10-22-chart3.png)

Rustls leads across the board in throughput as well.

## Testing Methodology

Tests were performed using Debian Linux on a bare-metal Intel Xeon E-2386G CPU with hyper-threading disabled, dynamic frequency scaling disabled, and the CPU scaling governor set to performance for all cores. More details are available [here](https://gist.github.com/ctz/deaab7601f20831d0f9d4bf5f3ac734a).

## Try Rustls!

Rustls is ready for production use today and we encourage folks to [try it out](https://github.com/rustls/rustls). In addition to memory safety and great performance, it offers:

* C and Rust APIs
* FIPS Support
* Post-quantum key exchange (updated algorithms coming soon)
* Encrypted Client Hello (client side)
* OS trust verifier support



## Thank You

Rustls uses the [aws-lc-rs](https://github.com/aws/aws-lc-rs) cryptographic library by default. We'd like to thank the aws-lc-rs team at AWS for helping us reach our performance goals, and for being generally helpful with our adoption of their library. We couldn't have asked for better partners in this.

We'd also like to thank Intel for helping with AVX-512 optimizations for aws-lc-rs recently. This was an important part of achieving our performance goals.

We would not be able to do this work without our funders. Thank you to Sovereign Tech Fund, Alpha-Omega, Google, Fly.io, and Amazon Web Services for their support.
