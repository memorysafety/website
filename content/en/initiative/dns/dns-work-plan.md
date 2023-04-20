---
title: DNS
slug: dns-work-plan
background: dce0e9
image: /images/dns.png
---

<h2>Work Plan</h2>

**1. Prepare for Let's Encrypt deployment**

Complete improvements needed in order to deploy to Let’s Encrypt. This is important because it makes DNS safer for Let’s Encrypt but also because it will demonstrate to other potential users that the resolver can function well in a demanding environment.

* <a href="https://github.com/bluejekyll/trust-dns/issues/1440">Add support for fully recursive queries</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/1718">Add support for DNSSEC validation for recursive queries</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/10">Add support for NSEC(3)</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/1719">Add support for IP allow lists for inbound connections</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/1722">Add support for a denylist for outbound ports</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/1723">Add support for a “do-not-query” list</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/1720">Add support for cache policies by record type</a>
* <a href="https://github.com/bluejekyll/trust-dns/issues/1721">Add support for NS round-robin to reduce triggering rate-limiting</a>

**2. Security audit**

A third party security audit will be performed and findings will be addressed.

**3. Performance improvements**

Improve performance (queries/second, CPU and memory usage) such that the resolver can be used in the most critical and demanding environments.
