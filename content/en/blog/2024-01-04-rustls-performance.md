---
author: Adolfo Ochagavía
date: 2024-01-04T00:00:00Z
slug: Rustls-Performance
title: "Securing the Web: Rustls on track to outperform OpenSSL"
excerpt: "A focus on performance with a strong benchmarking system makes Rustls an attractive and memory safe option for TLS."
display_default_footer: true
---

## Securing the Web: Rustls on track to outperform OpenSSL

Prossimo is funding the development of [Rustls](https://github.com/rustls/rustls), a high-quality TLS implementation written in Rust, with the aim of replacing less safe alternatives such as OpenSSL. This article goes into recent developments in performance tracking for Rustls and provides a performance comparison between Rustls 0.22.0 and OpenSSL 3.2.0 - the latest releases of both projects at the time of writing.

Our investment in benchmarking has helped confirm that Rustls is competitive with OpenSSL. In some scenarios Rustls is already faster, or less resource intensive. In other cases the benchmarking has highlighted areas we can target for improvements. Tight integration with the development process has already paid dividends in identifying regressions and helping inform architectural choices.

## Performance as a feature

Aside from correctness and security, it is important for a TLS implementation to keep overhead at a minimum. Consider, for instance, the case of a web server under heavy load: a performant TLS implementation will be able to serve more clients than a less performant one. Historically, this has led the industry to treat performance as a non-negotiable feature, preferring TLS implementations with low latency and a low resource footprint, even if they are written in unsafe languages such as C.

With the rise of Rust, however, safer alternatives have become possible without compromising on performance. This was confirmed in 2019 when Joseph Birr-Pixton's [benchmarks](https://jbp.io/2019/07/01/rustls-vs-openssl-performance.html) showed Rustls beat OpenSSL in data transfer throughput, handshakes per second and memory usage. Though later versions of OpenSSL caught up in some of the benchmarks, the results made clear that Rustls is a contender to keep an eye on.

As Rustls grows in popularity and the industry trends towards memory safety[^1], it becomes more and more important to guarantee top-notch performance. For that reason, I spent the months between August and December developing an advanced setup to track the library's performance in a more principled way. Thanks to this work, maintainers now receive automatic feedback on the performance impact of each pull request and have the data to drive performance optimization efforts.

## Automated feedback on pull requests

The topic of benchmarking in a continuous integration setup is challenging. Rustls' issue tracker states the problem as follows in [issue 1385](https://github.com/rustls/rustls/issues/1385):

It would be very useful to have automated and accurate feedback on a PR's performance impact compared to the main branch. It should be automated, to ensure it is always used, and it should be accurate, to ensure it is actionable (i.e. too much noise would train reviewers to ignore the information). The [approach used by rustc](https://github.com/rust-lang/rust/pull/112849#issuecomment-1661062264) [the Rust compiler] is a good example to follow, though its development required a daunting amount of work.

After careful research, prototyping, and talking to people involved in benchmarking the Rust compiler, we arrived at a design with the  following setup:

1.  Hardware: the benchmarks run on a bare-metal server at [OVHcloud](https://www.ovhcloud.com/en/), configured in a way that reduces variability of the results.

2.  Scenarios: we exercise the code for bulk data transfers and handshakes (full and resumed[^2]), with code that has been carefully tuned to be as deterministic as possible.

3.  Metrics: we measure executed CPU instructions and wall-clock time (the former because of its stability, the latter because it is the metric end users care about).

4.  Reporting: once a benchmark run completes, its respective pull request gets a comment showing an overview of the results, highlighting any significant changes to draw the reviewer's attention ([here](https://github.com/rustls/rustls/pull/1640#issuecomment-1854147668) is an example). [Cachegrind](https://valgrind.org/docs/manual/cg-manual.html) diffs are also available to aid in identifying the source of any performance difference.

5.  Tracking: each scenario keeps track of measured performance over time, to automatically derive a significance threshold based on how noisy the results are. This threshold is used during reporting to determine whether a result should be highlighted.

You can find the code for the benchmarked scenarios in the [main rustls repository](https://github.com/rustls/rustls/tree/75edb20a1e6a894089516053348b6137a425b9b4), under ci-bench. The code for the application that coordinates benchmark runs and integrates with GitHub lives in its [own repository](https://github.com/rustls/rustls-bench-app/).

## Trophy case

In the past months, early versions of the benchmarking system have already helped drive development of Rustls. Below are some examples:

-   [PR 1448](https://github.com/rustls/rustls/pull/1448): introducing dynamic dispatch for the underlying cryptographic library was necessary to make the API more user-friendly, but maintainers were concerned about potential performance regressions. The automated benchmark report revealed that the change had a mildly positive effect on handshake latency, and no effect at all in other scenarios. With this, maintainers were able to merge the pull request with confidence.

-   [PR 1492](https://github.com/rustls/rustls/pull/1492): a security feature was introduced to zeroize fields containing secrets, which was expected to have some performance impact. The automated benchmarks showed that the regressions were manageable (between 0.5% and 0.85% for resumed handshake latency, and lower to no impact in other scenarios). Again, this information allowed the maintainers to merge the pull request with confidence. Quoting [ctz](https://discord.com/channels/976380008299917365/1015156984007381033/1184153108599803924): [there]  was a clear security/performance tradeoff, and being able to transparently understand the performance cost was very useful.

-   [PR 1508](https://github.com/rustls/rustls/pull/1508): upgrading the *ring* dependency, which Rustls uses by default for cryptographic operations, caused an up to 21% regression for server-side handshake latency. After some investigation and discussion with *ring*'s maintainer, we [concluded](https://github.com/rustls/rustls/pull/1528#issuecomment-1754786446) that the regression was due to missed optimizations in GCC. The regression was filed to [BoringSSL](https://bugs.chromium.org/p/boringssl/issues/detail?id=655) and [GCC](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=111774) issue trackers, but there is currently no planned fix. The recommended solution is to compile *ring* using Clang, or to use a different cryptographic library such as aws-lc-rs.

-   [PR 1551](https://github.com/rustls/rustls/pull/1551#issuecomment-1780734571): a refactoring caused a mild regression for handshake latency, but it was caught during review thanks to the automated benchmarks. The regression was promptly fixed and even resulted in a mild performance improvement.

## Comparison against OpenSSL

The system described above is ideal to track performance differences among versions of Rustls, but it cannot be used to compare against other TLS implementations. For one, CPU instruction counts are an unsuitable metric when comparing totally different codebases. Using the secondary wall-clock time metric is not an option either, because the scenarios are tweaked for determinism and to detect relative variations in performance, not to achieve the maximum possible throughput.

Fortunately, the Rustls repository provides a set of benchmarks meant to obtain absolute measurements, making it possible to answer questions like: what is the maximum throughput the library can achieve when transferring data over TLS 1.2 with the ECDHE_RSA_AES128-GCM_SHA256 cipher suite? These benchmarks were used in the [2019 comparison against OpenSSL](https://jbp.io/2019/07/01/rustls-vs-openssl-performance.html), and we recently reused them to generate up-to-date results on server-grade hardware.

The full results, including details about our hardware and methodology, are available on [GitHub](https://github.com/aochagavia/rustls-bench-results). Below follow the most important conclusions from comparing Rustls 0.22.0 and OpenSSL 3.2.0:

1.  Rustls achieves best overall performance when used together with the [aws-lc-rs](https://aws.amazon.com/blogs/opensource/introducing-aws-libcrypto-for-rust-an-open-source-cryptographic-library-for-rust/) cryptography provider instead of *ring*. For the highest throughput, the [jemalloc](https://crates.io/crates/jemallocator) allocator should be used (it more than doubles the throughput for outgoing data transfers, compared to Rust's default glibc malloc). Since this is the most performant configuration we use it when discussing further results below.

2.  Rustls uses significantly less memory than OpenSSL. At peak, a Rustls session costs ~13KiB and an OpenSSL session costs ~69KiB in the tested workloads. We measured a [C10K](https://en.wikipedia.org/wiki/C10k_problem) memory usage of 132MiB for Rustls and 688MiB for OpenSSL.

3.  Rustls offers roughly the same data send throughput as OpenSSL when using AES-based cipher suites. Data receive throughput is 7% to 17% lower, due to a limitation in the Rustls API that forces an extra copy. [Work is ongoing](https://github.com/rustls/rustls/pull/1420) to make that copy unnecessary.

4.  Rustls offers around 45% less data transfer throughput than OpenSSL when using ChaCha20-based cipher suites. Further research reveals that OpenSSL's underlying cryptographic primitives are better optimized for server-grade hardware by taking advantage of AVX-512 support (disabling AVX-512 results in similar performance between Rustls and OpenSSL). Curiously, OpenSSL compiled with Clang degrades to the same throughput levels as when AVX-512 is disabled.

5.  Rustls handles 30% (TLS 1.2) or 27% (TLS 1.3) fewer full RSA handshakes per second on the server side, but offers significantly more throughput on the client side (up to 106% more, that is, a factor of 2.06x). These differences are presumably due to the underlying RSA implementation, since the situation is reversed when using ECDSA (Rustls beats OpenSSL by a wide margin in server-side performance, and lags behind a bit in client-side performance).

6.  Rustls handles 80% to 330% (depending on the scenario) more resumed handshakes per second, either using session ID or ticket-based resumption.

## The future

As far as performance goes, Rustls is steadily positioning itself to become the default TLS implementation on the internet. Next to confirming the library's potential, the benchmark results reveal where Rustls needs to improve. Now we have the necessary benchmarking infrastructure in place, one of the priorities for 2024 will be to outperform OpenSSL on all fronts. Stay tuned!

[^1]: Consider, for instance, [Microsoft's stance](https://msrc.microsoft.com/blog/2019/07/a-proactive-approach-to-more-secure-code/) on the matter, [AWS' commitment](https://www.memorysafety.org/blog/aws-funding/) to fund memory safety initiatives, and the recently published [Case for Memory Safe Roadmaps](https://media.defense.gov/2023/Dec/06/2003352724/-1/-1/0/THE-CASE-FOR-MEMORY-SAFE-ROADMAPS-TLP-CLEAR.PDF).
[^2]: It is important to test both from-scratch (or full) and resumed handshakes, because the performance characteristics of the two are very different.