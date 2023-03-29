---
author: Josh Aas
date: 2023-03-29T00:00:00Z
slug: rustls-new-features
title: "Rustls 0.21.0 Released With Exciting New Features"
excerpt: "We’re incredibly excited about the latest release of Rustls, a memory safe TLS implementation"
---

We're incredibly excited about the latest release of [Rustls](https://github.com/rustls/rustls), a memory safe TLS implementation. This release has two major new features and a number of other improvements.

The first big feature is support for TLS certificates containing IP addresses. Rustls can now be used to set up TLS connections addressed by IP rather than a domain name. This is useful for things like Kubernetes pods, which often use IP addresses instead of domain names, and for DNS over HTTPS/TLS which need an IP address for the server to avoid circular dependency on name resolution. TLS certificates for IP addresses have been the most heavily requested feature for quite a while now and it's great to have it completed.

The second big feature is support for [RFC8446 C.4 client tracking prevention](https://www.rfc-editor.org/rfc/rfc8446#appendix-C.4). This means that passive network observers will no longer be able to correlate connections from ticket reuse.

Version 0.21.0 also contains a number of other improvements. Rustls gets contributions from many individuals, but we'd like to give particular thanks to Joe Birr-Pixton, Dirkjan Ochtman, Rafael López, Daniel McCarney, Jacob Hoffman-Andrews, and Jacob Rothstein for their work on this release.

ISRG, via our [Prossimo](/) project, is [investing heavily in Rustls](/initiative/rustls/). It's our goal to make Rustls the most attractive option for software needing TLS support. Daniel McCarney and Jacob Rothstein are currently working on Rustls under Prossimo contracts that tackle the items on our work plan. One of the most important priorities is the enablement of pluggable cryptographic backends. This feature will make it possible for Rustls users to choose among cryptographic backends like [Ring](https://github.com/briansmith/ring) or [SymCrypt](https://github.com/microsoft/SymCrypt). We intend for this optionality to reduce the friction for large organizations looking at moving to a memory safe option.

The team is already hard at work on the next version. If you're as excited as we are about the progress and potential, please join Google, Fly.io, and Amazon Web Services in [supporting this work](/become-a-funder/).

About Us
--------

[ISRG](https://www.abetterinternet.org/) is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://abetterinternet.org/getinvolved/), [donating](https://abetterinternet.org/donate/), or encouraging your company to [become a funder](/become-a-funder/).