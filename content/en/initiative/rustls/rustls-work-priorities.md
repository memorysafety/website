---
title: Rustls
slug: rustls-work-plan
background: dce0e9
image: /images/rustls.png
---

<h2>Work Priorities</h2>

**1. Enable Pluggable Cryptographic Back-ends**

Allow plugging in different cryptographic back-ends. ([Ticket](https://github.com/rustls/rustls/pull/1184)).

**2. FIPS Certification for Default Cryptographic Library**

Change the default cryptographic library to something with FIPS certification.

**3. Comprehensive performance benchmarking**

Performance should be a headline feature of Rustls. We need to develop a more comprehensive benchmarking system so that we can assess and improve performance from multiple angles, including CPU usage, latency, and memory usage.

**4. Add No-Allocation / Write-Through API**

Would make handshakes faster and give the caller more control over allocations.

**5. Support no_std**

Enables use of rustls in more memory-constrained environments. ([Ticket](https://github.com/rustls/rustls/issues/283))

**6. OpenSSL API Compatibility Layer**

Add an OpenSSL C API compatibility layer for adoption purposes.

**7. Support Encrypted Client Hello**

Encrypted Client Hello is an upcoming standard from the TLS WG providing better production for some of the data sent by a client in the initial ClientHello message. ([Ticket](https://github.com/rustls/rustls/issues/508))

**8. Improve OS Trust Verifier Support**

While we currently have a way to trust certificates stored in the platform trust store, platform trust stores can have other ways of restricting how/when roots that they expose are trusted. In order to rely on these (on Darwin and Windows) we should rely on the platform verifier directly. Given that platform verifiers may require blocking I/O, some API changes are required. ([Ticket](https://github.com/rustls/rustls-native-certs/issues/25))

**9. Additional Performance Optimization**

Additional performance optimization including CPU usage, latency, and memory usage. The goal is to outperform OpenSSL across the board if we are not already.

**10. Support RFC 8879 Certificate Compression**

Support for a TLS extension that substantially shrinks certificates (one of the largest parts of the TLS handshake), improving handshake latency by decreasing bandwidth used. ([PR](https://github.com/rustls/rustls/pull/534))

**11. Add/extend support for TLS 1.3 Early Data**

Early data allows clients to submit data before the TLS handshake is complete in some cases (idempotent requests, data where replay is not a risk), improving latency in the cases of, for example, HTTP requests by submitting the request in parallel with the TLS handshake.

**12. Enforce Confidentiality / Integrity Limits**

The QUIC use of TLS mandates limited usage of AEAD keys. While TLS 1.3 and 1.2 do not require this, the same kinds of issues can apply here, and we should consider implementing limits for TLS over TCP as well. ([Ticket](https://github.com/rustls/rustls/issues/755))
