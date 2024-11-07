---
author: Josh Aas
date: 2024-11-07T00:00:00Z
title: "A new home for memory safe Zlib"
slug: zlib-to-trifecta-tech
excerpt: "Zlib-rs, an open source memory safe implementation of zlib, has a new long-term home at the Trifecta Tech Foundation."
display_default_footer: true
---

<div class="card border-0 mb-4 pic-quote-right">
    <img alt="Trifecta Tech Foundation Logo" class="mx-auto img-fluid" src="/images/blog/logo-trifecta.png" />
</div>

Today we're pleased to announce that the recently developed open source [memory safe implementation of zlib](https://www.memorysafety.org/initiative/zlib/) &mdash; [zlib-rs](https://github.com/trifectatechfoundation/zlib-rs) &mdash; has a new long-term home at the [Trifecta Tech Foundation](https://trifectatech.org/).

We set out to develop a strategy, raise funds, and select a contractor for a memory safe zlib implementation in 2023. We did this because data compression algorithms, and zlib in particular, are used in a vast number of protocols and file formats throughout all of computing. In the past, compression libraries have encountered [memory safety vulnerabilities](https://www.memorysafety.org/docs/memory-safety/), a common phenomenon for libraries written in C/C++ and a class of issues that critical system software should not suffer from.

We contracted [Tweede golf](https://tweedegolf.nl/) in December of 2023 for an initial implementation based on zlib-ng, with a focus on maintaining excellent performance while introducing memory safety. The project was made possible through funding provided by [Chainguard](https://www.chainguard.dev/) and a time investment by Tweede golf.

An early release of the zlib-compatible dynamic library is available on [crates.io](https://crates.io/crates/libz-rs-sys).

## New home

Trifecta Tech Foundation is already the long-term home of two other Prossimo initiatives: memory safe [NTP](https://github.com/pendulum-project/ntpd-rs) and [sudo](https://github.com/trifectatechfoundation/sudo-rs).

When the Tweede golf team suggested having zlib-rs become part of Trifecta Tech Foundation's [data compression initiative](https://trifectatech.org/initiatives/data-compression/), it was an easy decision to make on our end. Trifecta Tech Foundation is backed by the team from Tweede golf and we know that they are good stewards of open source while also being leading experts in writing in memory safe languages.

<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">Given the widespread use of zlib across the tech industry, offering a memory safe alternative to C implementations is a huge win. The investment required is tiny compared to the gain, as zlib is relatively small in terms of lines of code. When a memory safe zlib is in place, it allows adding (performance) improvements with confidence; to iterate without breaking things.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Erik Jonkers, chair of Trifecta Tech Foundation and Director of Open source at Tweede golf</cite></footer>
    </div>
  </blockquote>
</div>


Trifecta Tech Foundation aims to mature the zlib-rs project and support its maintainers. Zlib-rs will be part of the Foundation's data compression initiative that includes four compression libraries: [zlib, bzip2, zstd and xz](https://trifectatech.org/initiatives/data-compression/).

## What's next?

Work on Webassembly optimizations, kindly funded by [Devolutions](https://devolutions.net/), is underway. A security audit by Prossimo is nearing completion and is expected to be done in November 2024. When successfully finished, the Trifecta Tech Foundation team will continue to work with Mozilla, who are interested in potentially shipping zlib-rs in Firefox.

That said, work on zlib-rs is not yet complete. Trifecta Tech Foundation is seeking funding to make the initial implementation ready for production. [Contact](mailto:donate@trifectatech.org) Trifecta Tech Foundation if you're interested.