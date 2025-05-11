---
author: "Josh Aas"
date: 2025-05-02T00:00:00Z
slug: "rav1d-perf-bounty"
title: "$20,000 rav1d AV1 Decoder Performance Bounty"
excerpt: "Help us close a performance gap."
---

In March of 2023 we [announced](/blog/safer-av1-decoder/) that we were starting work on a safer high performance AV1 decoder called [rav1d](https://github.com/memorysafety/rav1d), written in Rust. We partnered with [Immunant](https://immunant.com/) to do the engineering work. By September of 2024 rav1d was basically complete and we [learned a lot](/blog/porting-c-to-rust-for-av1/) during the process. Today rav1d works well—it passes all the same tests as the dav1d decoder it is based on, which is written in C. It’s possible to build and run Chromium with it.

There’s just one problem—it’s not quite as fast as the C version. We want to change that and we need your help.

Our Rust-based rav1d decoder is currently about 5% slower than the C-based dav1d decoder (the exact amount differs a bit depending on the benchmark, input, and platform). This is enough of a difference to be a problem for potential adopters, and, frankly, it just bothers us. The team at Immunant worked hard to get it to performance parity. We brought in a couple of other contractors who have experience with optimizing things like this. We [wrote about the optimization work we did](/blog/rav1d-performance-optimization/). However, we were still unable to get to performance parity and, to be frank again, we aren’t really sure what to do next.

After racking our brains for options, we decided to offer a bounty pool of $20,000 for getting rav1d to performance parity with dav1d. Hopefully folks out there can help get rav1d performance advanced to where it needs to be, and ideally we and the Rust community will also learn something about how Rust performance stacks up against C.

The [official rules are here](/rav1d-bounty-official-rules), but to summarize:

1. The contest is open to individuals or teams of individuals who are legal residents or citizens of the United States, United Kingdom, European Union, Canada, New Zealand, or Australia.
2. The rules provide instructions for benchmarking performance improvements.
3. You work on improving performance. Your improvements can be in rav1d, the Rust compiler, or the Rust standard library.
4. The dav1d and rav1d decoders share the exact same low-level assembly code optimizations—you cannot modify this assembly. You must improve the Rust code (or the Rust compiler), which is what differs between dav1d and rav1d. You may not introduce code into rav1d in a language other than Rust.
5. If you think you have a solution (a single improvement or a set of improvements), you can file an issue or PR in the rav1d repository explaining it. Alternatively, if you prefer to submit or discuss your proposed solution confidentially, you can [email us](mailto:hello@memorysafety.org).  We encourage you to ask questions early on so as to avoid investing heavily in something that might not be eligible!
6. If our team is happy with the solution, you start the process of getting those improvements merged into the relevant codebase using that codebase’s standard contribution process and under its open source license(s). We will try to help if we can.
7. If your contributions are merged and they make their way into a release, we will award the bounty pool to contributors to the solution(s), which may be a single person, multiple people, or a team.

If there are multiple solutions submitted, we will award the funding to the one we feel is best. If they are of the same quality in our opinion, we will award the one that was submitted first. If there are multiple solutions that fall short of performance parity, but combine to reach performance parity, then we will divide the bounty according to our assessment of each party’s relative contribution. If there are no solutions meeting our criteria, no bounty will be awarded.

At the end of the day, we reserve the right to award the money to the person(s) or team(s) that we deem to have reached performance parity in the best possible way.

Good luck! Have fun!
