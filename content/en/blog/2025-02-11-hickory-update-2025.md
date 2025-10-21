---
author: "David Cook"
date: 2025-02-11T00:00:00Z
slug: "hickory-update-2025"
title: "Hickory DNS is Moving Toward Production Readiness"
excerpt: "A high performance, memory safe, and open source recursive DNS resolver now has improved DNSSEC support, NSEC3 support, and new features."
---


<div class="card border-0 pic-quote-right">
    {{< optimized-image src="images/blog/blog-2025-02-11-Hickory-DNS.png" alt="Hickory DNS logo" class="mx-auto img-fluid" maxWidth="520" >}}
</div>

The Domain Name System (DNS) is a foundational part of the Internet. It stores data associated with domain names, like web server addresses and mail server addresses. Almost all network connections are preceded by a DNS lookup. The most popular DNS server implementations are written in C, and as a result, they have been affected by a series of memory safety vulnerabilities. These vulnerabilities can put DNS infrastructure at risk, as well as any system that depends on DNS.

We've been investing in [Hickory DNS](https://github.com/hickory-dns/hickory-dns), an open source DNS implementation, which provides a memory safe alternative. The Hickory DNS project implements all major protocol roles, including a client library, stub resolvers, forwarding resolvers, recursive resolvers, and authoritative name servers. It has a growing community of users and contributors. Our [current goal](https://www.memorysafety.org/initiative/dns/) is to prepare Hickory DNS for deployment at Let's Encrypt, as the recursive resolver used during domain control validation. We're happy to see initial production use of the client and stub resolver growing already.

Over the past year, Hickory DNS contributors, including the maintainers, Ferrous Systems, and others, have improved Hickory DNS's support for Domain Name System Security Extensions (DNSSEC). They have fixed spec conformance and compatibility bugs, and added features that will be needed in production deployments.

### DNSSEC

Hickory DNS's support for DNSSEC advanced by leaps and bounds this year. DNSSEC adds digital signatures to DNS zones, allowing records to be authenticated. Implementation of these features was led by Ferrous Systems (see their [blog post](https://ferrous-systems.com/blog/hickory-dns-client/) for more details).

The recursive resolver now supports DNSSEC validation. Previously, there was only basic support for DNSSEC validation on the client side. This required special handling of DNSSEC-related flags and record types throughout the resolver.

Support was added for generating and validating NSEC3 records. NSEC3, specified in [RFC 5155](https://www.rfc-editor.org/rfc/rfc5155), is the successor to the NSEC record type, and both are used to authenticate negative responses, i.e. confirm that specific records do not exist.

A conformance test suite was added, to confirm that specific requirements in DNSSEC RFCs were implemented. This test framework has also proven useful beyond DNSSEC because it allows running multiple DNS server implementations together in a virtual network. This both simplifies testing the recursive resolver, which expects to communicate with other hosts on port 53, and compares Hickory DNS's behavior against other DNS implementations. Various DNSSEC bugs were identified with the expanded test suite and fixed, especially regarding insecure and bogus validation results.

### Specification Conformance Bug Fixes

There have been many protocol correctness fixes to Hickory DNS over the past year. These were driven in part by new test suites covering a variety of edge cases. In addition to the DNSSEC conformance test suites mentioned above, new [conformance tests](https://github.com/hickory-dns/hickory-dns/issues/2572) based on [RFC 8906](https://datatracker.ietf.org/doc/html/rfc8906) were added, which identified issues when handling unrecognized opcodes and empty question sections. Another test suite was added based on test fixtures from [an IMC 2023 paper by Nosyk et. al.](https://extended-dns-errors.com/) ([PR #2385](https://github.com/hickory-dns/hickory-dns/pull/2385), [PR #2711](https://github.com/hickory-dns/hickory-dns/pull/2711)). This provides a broad variety of misconfigured zones, representative of problems seen in the wild.

Multiple improvements were made to the recursive resolver to fix infinite loops when encountering missing glue records, lame delegations, and other edge cases ([issue](https://github.com/hickory-dns/hickory-dns/issues/2306), [PR #2332](https://github.com/hickory-dns/hickory-dns/pull/2332), [PR #2522](https://github.com/hickory-dns/hickory-dns/pull/2522)).

Error propagation was improved throughout Hickory DNS, both in plain DNS contexts and DNSSEC contexts ([issue](https://github.com/hickory-dns/hickory-dns/issues/1891), [PR #2379](https://github.com/hickory-dns/hickory-dns/pull/2379), [PR #2502](https://github.com/hickory-dns/hickory-dns/pull/2502)). These changes correct the response codes sent when certain errors are encountered, and enable DNSSEC validation of negative responses.

The recursive resolver's handling of truncated responses was fixed ([issue](https://github.com/hickory-dns/hickory-dns/issues/2608), [PR](https://github.com/hickory-dns/hickory-dns/pull/2682)). Initial DNS queries are sent over UDP, and thus responses are limited to a fixed maximum size, in one UDP datagram. If the authoritative name server can't fit all records into a response message, it sends as many records as it can and sets the "truncation" bit in the response message's header. In this case, the recursive resolver is supposed to retry its request via TCP, which is not affected by the same message size limitations. This bugfix corrected an edge case where the response received via TCP could be discarded in favor of the truncated UDP response. Now, the TCP response is always used if the UDP response was truncated.

The CAA record type, defined in [RFC 8659](https://www.rfc-editor.org/rfc/rfc8659), is relevant to Certificate Authorities, and thus it's important that Hickory DNS processes these records correctly before Let's Encrypt can deploy it. Multiple fixes were made to CAA record handling, all involving invalid property values or issuer names ([issue](https://github.com/hickory-dns/hickory-dns/issues/2415), [PR #2373](https://github.com/hickory-dns/hickory-dns/pull/2373), [PR #2418](https://github.com/hickory-dns/hickory-dns/pull/2418), [PR #2419](https://github.com/hickory-dns/hickory-dns/pull/2419)). Since the specification says that invalid issuer names must be interpreted to forbid certificate issuance, invalid records must be preserved when transiting through Hickory DNS.

### Production-readiness Features

Running a DNS service in production imposes a number of non-functional requirements such as robustly handling traffic from malfunctioning or malicious third parties, flexible configuration, and scalable performance.

We hired OSTIF to perform a security audit of Hickory DNS and addressed the issues it identified. These were all denial of service vulnerabilities via resource exhaustion, affecting [the call stack in the recursive resolver](https://github.com/hickory-dns/hickory-dns/pull/2522), [memory consumption by the recursive resolver](https://github.com/hickory-dns/hickory-dns/pull/2531), [TCP connection setup](https://github.com/hickory-dns/hickory-dns/pull/2622), [TLS/QUIC handshakes](https://github.com/hickory-dns/hickory-dns/pull/2583), and [DNSSEC verification](https://github.com/hickory-dns/hickory-dns/pull/2533) (this is the [KeyTrap vulnerability](https://www.athene-center.de/en/keytrap)). These fixes will improve the availability of Hickory DNS-based servers when under attack.

New options were added to the Hickory DNS server configuration. First, [allow/deny lists](https://github.com/hickory-dns/hickory-dns/issues/1719) were added to enable controlling access to the server. Second, cache policy configuration was added to the recursive resolver ([issue](https://github.com/hickory-dns/hickory-dns/issues/1720), [PR](https://github.com/hickory-dns/hickory-dns/pull/2524)). This allows setting minimum and maximum time-to-live values for cached records, and customizing these limits for particular resource record types.

The record cache used by the stub resolver, forwarding resolver, and recursive resolver was [replaced with a cache that allows concurrent access](https://github.com/hickory-dns/hickory-dns/pull/2576). This removed a coarse-grained lock from the main code path, improving scalability.

Looking Forward
---------------

In the coming year, our work will continue along the same themes. We are moving through the items on this [GitHub issue](https://github.com/hickory-dns/hickory-dns/issues/2725) to get to our goal of deployment in Let's Encrypt. We expect to fix more spec compliance bugs and edge cases, add support for DNSSEC signing and verification using aws-lc-rs, improve performance, and more. [Dirkjan Ochtman](https://dirkjan.ochtman.nl/writing/), one of the Hickory DNS maintainers, will be working under contract with Prossimo to drive this work forward.

If you are interested in trying out Hickory DNS as a memory safe alternative, the authoritative name server and stub resolver implementations have deployment experience already in various applications. [Version 0.25](https://github.com/hickory-dns/hickory-dns/issues/2206) will include the above improvements, and 0.25 alpha prereleases are available for testing now. If you are interested in using the recursive resolver, stay tuned for further improvements in the coming year, and keep an eye on the above tracking issue.

Benjamin Fry is the creator of Hickory and has been a great partner along this journey. We'd like to thank the Sovereign Tech Agency for their financial support of Prossimo to fund improvements to Hickory DNS and craig newmark philanthropies for ongoing support to improve memory safety in critical infrastructure.

If you're interested in updates on Hickory and our memory safety work in general, subscribe to the mailing list below.
