---
author: Josh Aas
date: 2024-09-17T00:00:00Z
title: "River Reverse Proxy Making Great Progress"
slug: river-release
excerpt: "Memory safe River now supports load balancing, rate limiting, graceful reloads, and more."
display_default_footer: false
---


## Our Latest Release

The [River](https://github.com/memorysafety/river) reverse proxy recently has come a long way since we [announced the project](https://www.memorysafety.org/blog/introducing-river/) in February. In addition to basic proxy functionality, River now has:

*Load Balancing Support*: The ability to divide up incoming traffic to be forwarded to different back-end destinations in order to spread out load. It is one of the most essential pieces of functionality for a reverse proxy these days.

*Rate Limiting Support*: The ability to control the rate at which the reverse proxy will accept certain kinds of requests. This can be used for anti-abuse or load control purposes.

*KDL-based Configuration*:  [KDL](https://kdl.dev/) is an easy-to-use language for writing out configurations. It's particularly strong when it comes to configuration with nested directives, which is common for reverse proxy configurations. This will likely be the default configuration method in the future.

*Static File Support*: It's common for reverse proxy deployments to want to be able to serve static files in response to certain requests, things like HTML and CSS files or media assets.

*Graceful Reloads*: The ability to restart River with a new configuration, without disrupting the handling of existing or new downstream connections, allowing existing connections to be handled by the previous instance of River, and all new connections being handled by the new instance.

*CIDR Range Blocking*: The ability to block entire incoming IPv4 or IPv6 ranges, for example in response to malicious traffic, where it is desirable to terminate the connection as quickly as possible to prevent attacks that would require additional resources to process.

Please see the [release notes](https://github.com/memorysafety/river/releases) for more detailed information, as well as the [user manual](https://github.com/memorysafety/river/blob/main/user-manual/src/SUMMARY.md).

## Why River?

Just about every significantly-sized deployment on the Internet makes use of reverse proxy software, and the most commonly deployed reverse proxy software is not memory safe. This means that most deployments have millions of lines of C and C++ handling incoming traffic at the edges of their networks, a risk that needs to be addressed if we are to have greater confidence in the security of the Internet.

There are reverse proxies written in memory safe languages, but for the most part their language choice caps performance at a level below what C and C++ can accomplish. River aims to offer safety and high performance at the same time by using Rust, as well as offering the following architectural advantages:

-   Better connection reuse than proxies like Nginx due to a multithreading model, which greatly improves performance.
-   WASM-based scriptability means scripting will be performant and River will be scriptable in any language that can compile to WASM.
-   Simple configuration, as we've learned some lessons from configuring other software for the past couple of decades.

The risk that comes with running reverse proxy software that consists of millions of lines of C and C++ on the edge of just about every significant network ought to be viewed as simply unacceptable going forward. We need a memory safe alternative with performance characteristics that can meet the needs of the most demanding high-volume environments.

## What's Next

While we do not believe River is ready for production deployments yet, we encourage people to give it a spin and file issues and feature requests. Our own goal is to have River ready to replace Nginx and other reverse proxy software used by [Let's Encrypt](https://letsencrypt.org/) within the next year, and we encourage other organizations to start considering where they might start to improve the security of their networks with memory safe proxy software.

In the next release of River we plan to include full support for getting and managing certificates using the ACME protocol, as well as a change from BoringSSL to Rustls as the default TLS library. After that, per our [roadmap](https://github.com/memorysafety/river/blob/main/docs/roadmap.md), we will work on adding better support for active service discovery modes followed by improvements to path control facilities. Soon after that we will likely start the process of integrating extensibility via Web Assembly (WASM), a cornerstone feature.

## Thank You

We'd like to thank Shopify and Chainguard for their financial support of this project, as well as the [Pingora](https://github.com/cloudflare/pingora) team at Cloudflare for making their networking library available and working closely with us. Without them, this project would not have been possible. If your organization would like to contribute financial support, please reach out to us at <donate@abetterinternet.org>. We have a lot of work left to do and your help will get us there faster.