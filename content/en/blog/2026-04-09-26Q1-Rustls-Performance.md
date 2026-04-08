---
author: Josh Aas
date: 2026-04-09T00:00:00Z
slug: 26Q1-Rustls-Performance
title: "Q1 2026 Rustls Performance Update"
excerpt: "Test results comparing Rustls performance to other TLS libraries."
display_default_footer: true
display_inline_newsletter_embed: false
---


## Overview

Offering top tier performance is a primary goal for the [Rustls](https://github.com/rustls/rustls) project. As such, the project has developed benchmarks representing some of the most performance critical functions and monitors them closely.

The Rustls project [periodically publishes test results](https://rustls.dev/perf/) that compare Rustls performance to other popular TLS libraries, OpenSSL and BoringSSL.

The previously published test results are from [July of 2025](https://rustls.dev/perf/2025-07-31-report/). The Rustls project is planning to start publishing performance reports more frequently going forward.

Here's how library versions have changed since the previous results:

- Rustls: 0.23.31 (aws-lc-rs 1.13.1) -> 0.23.37 (aws-lc-rs 1.16.0)
- OpenSSL: 3.5.1 -> 3.6.1
- BoringSSL: July 2024 -> March 2026 snapshot

The testing discussed here was done in March of 2026.

## Results

![Bulk throughput speed comparison across BoringSSL, OpenSSL, and Rustls](/images/blog/blog-2026-04-09-bulk-throughput.png)

![Full handshake speed comparison across BoringSSL, OpenSSL, and Rustls](/images/blog/blog-2026-04-09-full-handshake.png)

![Resumed handshake speed comparison across BoringSSL, OpenSSL, and Rustls](/images/blog/blog-2026-04-09-resumed-handshake.png)

## Analysis

<div class="trophy-table-wrap">
<table class="trophy-table">
  <thead>
    <tr>
      <th scope="col">Library</th>
      <th scope="col">First Place</th>
      <th scope="col">Second Place</th>
      <th scope="col">Third Place</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Rustls</th>
      <td>14</td>
      <td>2</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="row">BoringSSL</th>
      <td>2</td>
      <td>10</td>
      <td>4</td>
    </tr>
    <tr>
      <th scope="row">OpenSSL</th>
      <td>0</td>
      <td>4</td>
      <td>12</td>
    </tr>
  </tbody>
</table>
</div>

Since the last tests in July of 2025, neither BoringSSL or OpenSSL significantly improved or regressed in any test. Rustls got a bit faster in a few tests, likely because of improvements to the underlying cryptography via updates to [aws-lc-rs](https://github.com/aws/aws-lc-rs).

The results on the whole are roughly what we'd expect. OpenSSL is [known](https://www.feistyduck.com/newsletter/issue_132_openssl_performance_still_under_scrutiny) to have serious performance issues, BoringSSL avoids most of those, and Rustls takes performance a step further.

## Looking Forward

Rustls 0.24 will be released this year with a large number of changes focused on building a strong foundation for a 1.0 release. In particular, Rustls is making some changes to its APIs that will serve users better for the long term.

One performance-related change we are pursuing is "split mode". This is where — after the TLS handshake — a connection can be split into sender and receiver objects. The sender can send TLS-protected data, while the receiver can receive it. Historically this has been challenging because in TLS, a receiver may need to occasionally write (e.g. to send an alert). To address this challenge the split objects have an internal relationship to ensure that (for example) if the receiver object needs to send a message, that can happen in a transparent way. This is a very infrequent occurrence, so doesn't cause contention in normal use.

The intention is that those objects can be used on separate threads, which allows total throughput for a connection to be roughly doubled. The above measurements are per-core, but we're not aware of other TLS libraries that allow the use of one connection from two threads like this. Therefore, the send and receive measurements of Rustls could be added together. We'll confirm that is practically possible in a future performance report.

That is all caveated on applications that can be structured to benefit from full-duplex use of a single connection. Luckily, `tokio` already has this pattern as a first-class concept. We hope the Rustls split-mode feature will contribute to cementing Rust as a great choice for mega-fast and safer network services.

Large releases like this can be a mixed bag for performance, but the team monitors regressions closely and so at a minimum, no significant regressions are expected. For some of the closely contested results it's possible that Rustls 0.24 could pick up or lose a place. If that happens, we'll prioritize improvements that get Rustls back to the prior position.