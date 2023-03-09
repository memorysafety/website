---
author: Josh Aas
date: 2023-03-09T00:00:00Z
slug: safer-av1-decoder
title: "A Safer High Performance AV1 Decoder"
excerpt: "Memory safety for a major source of exploitable vulnerabilities."
---

Prossimo is excited to announce that we are working on an [AV1 decoder](/initiative/av1/) called [rav1d](https://github.com/memorysafety/rav1d), which can be used for both video and images. Our strategy is to move the C code in the [dav1d](https://code.videolan.org/videolan/dav1d) decoder to Rust, while retaining the high performance assembly code.

Image and video decoders have historically been a major source of exploitable [memory safety vulnerabilities](/docs/memory-safety/#types-of-memory-safety-bugs) because they often process data from networks in complex ways. Improving memory safety for media decoders is important if we want to reduce the number of exploitable vulnerabilities people are exposed to on the Internet.

[AV1](https://en.wikipedia.org/wiki/AV1) is a relatively new, open, royalty-free video coding format. AV1 compression can be used for both video and images (the image format is called AVIF). AV1 is rapidly gaining popularity, and we expect that many applications will need to select an AV1 decoder soon. We want to make sure everyone has a safe option to choose.

[Immunant](https://immunant.com/) is the primary contractor for this work, with assistance from veteran codec expert Frank Bossen. They are going to use a strategy that's new for Prossimo - transpiling.

The C code in dav1d was initially transpiled to Rust using the [c2rust](https://github.com/immunant/c2rust) transpiler built by Immunant. With the transpile complete, the team is now working to manually change unsafe transpiled Rust to safe, idiomatic Rust. Along the way they will make sure all tests are passing and that performance is the same or better than dav1d. The final product will include a C API compatible with the dav1d API, so that C consumers can use rav1d with minimal effort, just like they use dav1d.

When combined with a memory safe [demuxer](https://en.wikipedia.org/wiki/Demultiplexer_(media_file)) like [mp4parse-rust](https://github.com/mozilla/mp4parse-rust) it will be possible to do a lot of the work to decode AV1 images and video with a relatively high degree of memory safety. Some assembly code that is not memory safe will still be part of the decoding process, which is necessary in order to retain great performance.

The first four milestones in the [work plan](/initiative/av1/av1-work-plan/) have been generously funded by Amazon Web Services. We are working to raise an additional $400k to complete the work.

You can follow our work on this initiative [here](/initiative/av1/).

About Us
--------

ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://abetterinternet.org/getinvolved/), [donating](https://abetterinternet.org/donate/), or encouraging your company to [become a funder](/become-a-funder/).
