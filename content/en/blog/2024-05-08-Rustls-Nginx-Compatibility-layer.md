---
author: Josh Aas
date: 2024-05-08T00:00:00Z
slug: Rustls-Nginx-Compatibility-layer
title: "Rustls Gains OpenSSL and Nginx Compatibility"
excerpt: "Nginx users can easily switch from OpenSSL to Rustls for better security."
---

The Rustls TLS library can now be used with Nginx via an [OpenSSL compatibility layer](https://github.com/rustls/rustls-openssl-compat). This means that Nginx users can switch from OpenSSL to Rustls with minimal effort - users can simply swap in a new TLS library without needing to modify or recompile Nginx.

We have targeted Nginx versions greater than 1.18 on Ubuntu 22.04 or newer for initial support. Here's how easy it is to get going on x86_64 Ubuntu Linux 22.04:

```
$ wget https://github.com/rustls/rustls-openssl-compat/releases/latest/download/rustls-libssl_amd64.deb
$ sudo dpkg -i rustls-libssl_amd64.deb
$ sudo rustls-libssl-nginx enable
$ sudo systemctl daemon-reload
$ sudo service nginx restart
```


After [investing heavily](https://www.memorysafety.org/initiative/rustls/) in Rustls over the last few years, we now see it as a viable, performant, and memory safe alternative to OpenSSL. Recent releases have brought pluggable cryptography with [FIPS support](https://www.memorysafety.org/blog/rustls-with-aws-crypto-back-end-and-fips/), [performance optimizations](https://www.memorysafety.org/blog/rustls-performance/), [improved OS trust store support](https://www.memorysafety.org/blog/pq-key-exchange/), and numerous other improvements. In the coming months, we will focus on improving performance in the few areas where Rustls doesn't already surpass OpenSSL and add  support for [RFC 8879](https://datatracker.ietf.org/doc/html/rfc8879.html) for certificate compression. ISRG's [Let's Encrypt](https://letsencrypt.org/) certificate authority will begin replacing OpenSSL with Rustls later this year.

The importance of memory safety has been expounded upon recently by a number of groups, including the [White House Office of the National Cyber Director](https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/press-release-technical-report/). Anjana Rajan, Assistant National Cyber Director for Technology Security, The White House, adds: "Moving the cyber ecosystem toward memory safe programming languages is not only good engineering practice, but imperative for our national security. Achieving this will require a pragmatic and methodical approach. Securing the building blocks of cyberspace is critical and there is no better place to start than with TLS."

Regarding Rustls, Ms. Rajan adds "The White House, Office of the National Cyber Director, commends the Prossimo team for their outstanding work in building Rustls, a FIPS compliant memory safe TLS implementation. By prioritizing integration with Nginx, the Prossimo team is actively ensuring a good developer experience when pursuing stronger cybersecurity."

We're pleased to see Rustls adoption picking up. If your organization is interested in exploring the use of Rustls, reach out and let us know! We'll continue making our [planned improvements](https://github.com/rustls/rustls/blob/main/ROADMAP.md) to Rustls but would love adopter feedback.

We'd like to thank Sovereign Tech Fund, Fly.io, Google, AWS, and Alpha-Omega for supporting the work to advance Rustls.

ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/).