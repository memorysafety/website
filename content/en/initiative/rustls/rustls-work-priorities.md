---
title: Rustls
slug: rustls-work-plan
background: dce0e9
image: /images/rustls.png
---

<h2>Work Priorities</h2>

**1. FIPS Certification for Default Cryptographic Library**

Change the default cryptographic library to something with FIPS certification.

**2. Add No-Allocation / Write-Through API**

Would make handshakes faster and give the caller more control over allocations. [See RFC](https://github.com/rustls/rustls/pull/1420).

**3. Support no_std**

Enables use of rustls in more memory-constrained environments. [See RFC](https://github.com/rustls/rustls/pull/1399).

**4. OpenSSL API Compatibility Layer**

Add an OpenSSL C API compatibility layer for adoption purposes.

**5. Support Encrypted Client Hello**

Encrypted Client Hello is an upcoming standard from the TLS WG providing better production for some of the data sent by a client in the initial ClientHello message. ([Ticket](https://github.com/rustls/rustls/issues/508))

**6. Additional Performance Optimization**

Additional performance optimization including CPU usage, latency, and memory usage. The goal is to outperform OpenSSL across the board if we are not already.

**7. Support RFC 8879 Certificate Compression**

Support for a TLS extension that substantially shrinks certificates (one of the largest parts of the TLS handshake), improving handshake latency by decreasing bandwidth used. ([PR](https://github.com/rustls/rustls/pull/534))

**8. Add/extend support for TLS 1.3 Early Data**

Early data allows clients to submit data before the TLS handshake is complete in some cases (idempotent requests, data where replay is not a risk), improving latency in the cases of, for example, HTTP requests by submitting the request in parallel with the TLS handshake.

**9. Enforce Confidentiality / Integrity Limits**

The QUIC use of TLS mandates limited usage of AEAD keys. While TLS 1.3 and 1.2 do not require this, the same kinds of issues can apply here, and we should consider implementing limits for TLS over TCP as well. ([Ticket](https://github.com/rustls/rustls/issues/755))
