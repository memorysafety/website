---
title: Rustls
slug: rustls-work-plan
background: dce0e9
image: /images/rustls.png
---

<h2>Work Priorities</h2>

**1. Support IP Address Certificates**

There are some popular use cases where applications want TLS certificates for services that don’t have their own host name, relying on the IP address directly instead. This seems to be common in Kubernetes deployments. ([Ticket](https://github.com/briansmith/webpki/issues/54))

**2. Implement RFC 8446 Appendix C.4 in session cache**

TLS clients should use session tickets at most once for resumption. Without this, TLS clients may be tracked across connections through reuse of session tickets. Requires changes of the internal APIs to the session caching infrastructure. ([Ticket](https://github.com/rustls/rustls/issues/466))

**3. Improve Client Certificate Authentication Support**

Rustls and webpki currently do not provide access to client information supplied as part of the certificate, and there’s no infrastructure to deal with revocation checks. ([Ticket](https://github.com/rustls/rustls-ffi/issues/87))

**4. Enable Pluggable Cryptographic Back-ends**

Allow Rustls consumers to plug in cryptographic back-end alternatives to *ring*. ([Ticket](https://github.com/rustls/rustls/pull/1184)).

**5. Comprehensive performance benchmarking**

Performance should be a headline feature of Rustls. We need to develop a more comprehensive benchmarking system so that we can assess and improve performance from multiple angles, including CPU usage, latency, and memory usage.

**6. Add OS Trust Verifier Implementation**

While we currently have a way to trust certificates stored in the platform trust store, platform trust stores can have other ways of restricting how/when roots that they expose are trusted. In order to rely on these (on Darwin and Windows) we should rely on the platform verifier directly. Given that platform verifiers may require blocking I/O, some API changes are required. ([Ticket](https://github.com/rustls/rustls-native-certs/issues/25))

**7. Add No-Allocation / Write-Through API**

Would make handshakes faster and give the caller more control over allocations.

**8. Support Encrypted Client Hello**

Encrypted Client Hello is an upcoming standard from the TLS WG providing better production for some of the data sent by a client in the initial ClientHello message. ([Ticket](https://github.com/rustls/rustls/issues/508))

**9. Support RFC 8879 Certificate Compression**

Support for a TLS extension that substantially shrinks certificates (one of the largest parts of the TLS handshake), improving handshake latency by decreasing bandwidth used. ([PR](https://github.com/rustls/rustls/pull/534))

**10. Add/extend support for TLS 1.3 Early Data**

Early data allows clients to submit data before the TLS handshake is complete in some cases (idempotent requests, data where replay is not a risk), improving latency in the cases of, for example, HTTP requests by submitting the request in parallel with the TLS handshake.

**11. Enforce Confidentiality / Integrity Limits**

The QUIC use of TLS mandates limited usage of AEAD keys. While TLS 1.3 and 1.2 do not require this, the same kinds of issues can apply here, and we should consider implementing limits for TLS over TCP as well. ([Ticket](https://github.com/rustls/rustls/issues/755))

**12. OpenSSL API Compatibility Layer**

Add an OpenSSL C API compatibility layer for adoption purposes.

**13. FIPS Certification for Default Cryptographic Library**

Either change the default cryptographic library to a FIPS certified library or get the default cryptographic library FIPS certified.

**14. Verify DoS Resilience**

Peers might send very large or very small messages, tying up resources in order to starve well-behaved connections.

**15. Support no_std**

Enables use of rustls in more memory-constrained environments. ([Ticket](https://github.com/rustls/rustls/issues/283))
