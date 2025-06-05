---
author: Josh Aas
date: 2025-06-05T00:00:00Z
slug: compatibility-with-c
title: "Compatibility with C is Key for Memory Safe Software"
excerpt: "We're in the beginning phases of a journey towards memory safety for the Internet's critical software infrastructure, and as we get going it makes the most sense to break down big problems into smaller ones by focusing on replacing components within existing C and C++ software."
display_default_footer: true
---

When we're evaluating potential Prossimo initiatives we [take a number of things into consideration](https://www.memorysafety.org/blog/initiative-criteria/). Perhaps one of the most important is compatibility with existing C (and C++) software.

Most of the Internet's critical low-level software infrastructure is written in C or C++. This includes the Linux, Windows, and Apple kernels, most DNS, TLS, NTP, and BGP implementations, most popular server and proxy software, and the core utilities in Linux and most Unix-like operating systems. It's also the case for critical higher-level software infrastructure, like web browsers and media codecs.

This is not going to change any time soon. We're in the beginning phases of a journey towards memory safety for the Internet's critical software infrastructure, and as we get going it makes the most sense to break down big problems into smaller ones by focusing on replacing components within existing C and C++ software. This is why it's a high priority for Prossimo projects to interoperate with C and C++.

## Rustls (TLS)

We've invested quite a bit in the Rustls TLS library, which is now one of the fastest and safest TLS implementations out there. In particular, we've invested heavily in C compatibility.

Rustls has a native Rust API, but it also has a [C interface to the Rust API](https://github.com/rustls/rustls-ffi) as well as an [OpenSSL v3 compatibility layer](https://github.com/rustls/rustls-openssl-compat). The former is probably most useful for C developers doing initial integration with Rustls, or for those transitioning from OpenSSL and hoping to make use of a better API. The latter is a way for existing OpenSSL 3 API users to migrate to Rustls with as little effort as possible, [perhaps without even recompiling their code](https://www.memorysafety.org/blog/rustls-nginx-compatibility-layer/)!

Check out these blog posts for more information about Rustls:

- [Rustls Server-Side Performance](https://www.memorysafety.org/blog/rustls-server-perf/)

- [Rustls Outperforms OpenSSL and BoringSSL](https://www.memorysafety.org/blog/rustls-performance-outperforms/)

- [Encrypted Client Hello (ECH) Support for Rustls](https://www.memorysafety.org/blog/rustls-ech-support/)

- [Rustls Gains OpenSSL and Nginx Compatibility](https://www.memorysafety.org/blog/rustls-nginx-compatibility-layer/)

- [The Rustls TLS Library Adds Post-Quantum Key Exchange Support](https://www.memorysafety.org/blog/pq-key-exchange/)

- [Rustls Now Using AWS Libcrypto for Rust, Gains FIPS Support](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/)

## zlib-rs

Similarly, the [zlib-rs](https://github.com/trifectatechfoundation/zlib-rs) project provides a high performance Rust implementation of the zlib compression format that is drop-in compatible with the zlib C API.

Hopefully we (and others) can take what we've learned here and use it to build other memory safe compression libraries. The Trifecta Tech Foundation is the new home for zlib-rs, and they've published some great blog posts about their work:

- [zlib-rs is faster than C](https://trifectatech.org/blog/zlib-rs-is-faster-than-c/)

- [SIMD in zlib-rs (part 1): Autovectorization and target features](https://trifectatech.org/blog/simd-in-zlib-rs-part-1-autovectorization-and-target-features/)

- [SIMD in zlib-rs (part 2): compare256](https://trifectatech.org/blog/simd-in-zlib-rs-part-2-compare256/)

- [The fastest WASM zlib](https://trifectatech.org/blog/fastest-wasm-zlib/)

## rav1d (AV1 Decoder)

The [rav1d](https://github.com/memorysafety/rav1d) AV1 decoder is a fork of the [dav1d](https://www.videolan.org/projects/dav1d.html) decoder with the C code replaced by memory safe Rust code. It comes with a C API promising drop-in compatibility with dav1d's C API so it's easy to integrate into existing C programs.

As with compression libraries, hopefully we (and others) can take what we've learned here and use it to build other memory safe media decoders. Here are some blog posts about what we've learned:

- [Porting C to Rust for a Fast and Safe AV1 Media Decoder](https://www.memorysafety.org/blog/porting-c-to-rust-for-av1/)

- [Optimizing rav1d, an AV1 Decoder in Rust](https://www.memorysafety.org/blog/rav1d-performance-optimization/)

- [$20,000 rav1d AV1 Decoder Performance Bounty](https://www.memorysafety.org/blog/rav1d-perf-bounty/)

## Rust for Linux

Rust for Linux aims to allow integrating components written in Rust with the rest of the Linux kernel, which is written in C. To that end, developing Rust interfaces to C APIs is central to the work. Kernel developers working in C do not need to know Rust, and Rust code can be introduced component by component.

You can read more about the Rust for Linux project [here](https://rust-for-linux.com/).

## bindgen

From 2022-2023, we made major contributions to [bindgen](https://github.com/rust-lang/rust-bindgen), which automatically generates Rust FFI bindings to C (and some C++) libraries. This has made life easier for many people who integrate Rust with C and C++.

[Ferrous Systems](https://ferrous-systems.com/) was the contractor for this work, they wrote some great blog posts about it:

- [Binding with bindgen](https://ferrous-systems.com/blog/binding-with-bindgen/)

- [Our latest adventures with bindgen](https://ferrous-systems.com/blog/bindgen/)

- [Automating Releases for Bindgen](https://ferrous-systems.com/blog/automating-releases-for-bindgen/)