---
author: "Dirkjan Ochtman"
date: 2025-05-13T00:00:00Z
slug: "rustls-server-perf"
title: "Rustls Server-Side Performance"
excerpt: "Current versions of Rustls show competitive performance when processing many connections at the same time on a server."
---

In past years, the [Rustls](https://github.com/rustls/rustls/) project has been happy to receive substantial investments from the ISRG. One of our goals has been to improve performance without compromising on safety. We last posted about our [performance improvements](https://www.memorysafety.org/blog/rustls-performance-outperforms/) in October of 2024, and we're back to talk about another round of improvements.

What is Rustls?
---------------

Rustls is a memory safe TLS implementation with a focus on performance. It is production ready and used in a wide range of applications. You can read more about its history on [Wikipedia](https://en.wikipedia.org/wiki/Rustls).

It comes with a C API and [FIPS support](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/) so that we can bring both memory safety and performance to a broad range of existing programs. This is important because OpenSSL and its derivatives, widely used across the Internet, have a long history of memory safety vulnerabilities with more being found this year. It's time for the Internet to move away from C-based TLS.

On the server
-------------

In our previous post we looked at handshake latency and traffic throughput for connections on the client and the server. While clients will usually have a small number of connections active at any time, TLS servers generally want to optimize for high utilization, supporting as many connections as possible at the same time. TLS server connections usually share a reference to a backing store, which can be used to resume sessions across connections for a substantial latency improvement in connection setup. Our goal is then to minimize the slowdown that sharing the resumption store imposes on individual connections.

We first validated the assumption that turning off resumption would allow linear scaling:

![](/images/blog/blog-2025-05-14-tls-full-server-handshake-scalability-vs-thread-count.png)

As our testing showed, Rustls manages to avoid any impact from scaling in this case, up to the 80 cores offered by the Ampere ARM hardware used in this test. This is similar to BoringSSL, which shows no impact -- although it spends more time per handshake. OpenSSL handshake latency deteriorates as it scales, although comparing OpenSSL versions shows that its development team have made strides to improve this, as well.

Resumption mechanisms
---------------------

TLS supports two different resumption strategies:

-   Stateful resumption stores resumption state on the server in some kind of map (or database). The key into this map is sent across the wire. Because the key is relatively compact, this uses less bandwidth and therefore slightly reduces latency. On the other hand, it is harder to scale efficiently when multiple servers are serving the same potentially resuming clients.

-   Stateless resumption sends encrypted resumption state to the client. This is easy to horizontally scale because there is no server-side state, but the resumption state is a good deal larger, with an associated increase in bandwidth used (and the associated latency impact).

The resumption state that is sent to a client is commonly called a "ticket". Ticket encryption keys must be regularly rolled over because a key compromise destroys the security of all past and future tickets. In order to enable key rollover while supporting multiple concurrent sessions, Rustls 0.23.16 and earlier wrapped the encryption key in a mutex, which resulted in substantial contention as the number of concurrent server connection handshakes increased. In Rustls 0.23.17, we started using an RwLock instead, which limits contention to the short period when a key rollover happens (by default, every 6 hours).

![](/images/blog/blog-2025-05-14-tls-resumed-server-handshake-scalability-vs-thread-count.png)

Finally, we made another change in Rustls 0.23.17 to reduce the number of tickets sent by default when stateless resumption is enabled from 4 to 2, to align with the OpenSSL/BoringSSL default. This leads to doing less work both in terms of CPU time (encryption) and bandwidth used.

Handshake latency distribution
------------------------------

Apart from specific resumption concerns, we also compared Rustls to other TLS implementations in terms of the latency distribution experienced on the server: not just looking at the average latency, but also at worst-case (in this case, P90 and P99) latency. Rustls does quite well here:

![](/images/blog/blog-2025-05-14-tls-server-full-handshakes-latency-distribution.png)

While this chart shows full TLS 1.3 handshakes in particular, similar results were observed for other scenarios.

Conclusion
----------

Current versions of Rustls show competitive performance when processing many connections at the same time on a server. Rustls servers scale almost linearly with the number of cores available, and server latency for the core TLS handshake handling is roughly 2x lower than OpenSSL in our benchmarks.