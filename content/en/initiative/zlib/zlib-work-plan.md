---
title: zlib
slug: zlib-work-plan
background: dce0e9
image: /images/zlib.png
---

# Work Plan

1. Pure Rust implementation
  * Implement zlib compression and decompression in pure rust
  * Fuzz output versus zlib-ng
2. C API layer and security verification
  * Complete the C interface to mirror (at the ABI level) the zlib api
  * Fuzz the public interface
3. Integrate with flate2
  * Alternative zlib backend through C interface
  * Ensure the implementation works on all platforms (Windows, Linux, Macos) 
4. Benchmarking
  * Benchmark on CI (similar to rustls)
  * Benchmark for all supported architectures 
    * aarch64 (NEON)
    * x86_64 (SSE, AVX2, AVX512)
5. x86_64 and ARM optimizations
  * Add SIMD acceleration based on zlib-ng
  * Incorporate optimizations from other implementations
6. First stable release
  * Provide downloads for the dynamic library for supported platforms (x86_64 & aarch64 for linux, macos and windows)
  * Stabilize and publish the safe rust API
