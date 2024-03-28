---
author: Josh Aas
date: 2024-03-28T00:00:00Z
slug: tectonics-readout
title: "A Readout from Tectonics"
excerpt: "Challenges and solutions for moving forward with memory safety for critical Internet infrastructure."
images:
- /images/blog/Tectonics-Readout-Social-Share.jpg
---

<div class="card border-0 mb-3 pic-quote-right">
    <img alt="Tectonics Readout" class="mx-auto img-fluid" src="/images/blog/Tectonics-Readout-Social-Share.jpg" />
</div>

In November of 2023, ISRG held an event in San Francisco called [Tectonics](https://tectonics.memorysafety.org/). Our goal was to discuss solutions for moving forward with memory safety for critical Internet infrastructure. We had a group of about 50 people at the center of the memory safety movement, from engineers to public policy and corporate decision makers. We could not have asked for a better group.

There were four tracks, plus substantial open time for all attendees to discuss amongst themselves. The tracks were:

-   Facilitating adoption of memory safe code for Internet critical infrastructure
-   Memory safety roadmaps for organizations
-   Facilitating the inclusion of Rust in operating systems
-   Improving trust in Rust dependency trees

In this post we'd like to communicate some of the take-aways from the group as a whole as well as each track.

## Making Connections

Just from having spent the day together, we've seen connections and conversations continue between groups that previously weren't working together.

For example - folks from Tweede golf met folks from Immunant at the event. Tweede golf is now contributing to the [memory safe AV1 decoder](https://github.com/memorysafety/rav1d) that Immunant is working on, and Immunant is contributing to the [memory safe zlib implementation](https://github.com/memorysafety/zlib-rs) that Tweede golf is working on. We love to see it!

## General Memory Safe Language Adoption Issues

Across all of our tracks there was quite a bit of discussion about general issues that prevent developers and organizations from moving to safer languages. The main issues identified were:

-   Developer fondness for and commitment to C/C++, unwillingness to learn a new language.
    -   Fear that the knowledge one has built up over many years is now obsolete.
    -   Fear that any new language that isn't 20+ years old already is a fad, won't be around long enough to justify commitment.
    -   Lack of understanding about just how unsafe C and C++ are, and associated belief that one knows how to write/ship safe C/C++.
-   Need to invest in making operating system support for memory safe languages like Rust equivalent or better than support for C/C++. Compilers need to be included, packaging systems need work, policies need updating.
-   Lack of resources to rewrite components when people and orgs are stressed with maintenance and other demands for their current C/C++ software.
-   Concern that new code will introduce an unacceptable number of new logic bugs while resolving memory safety issues.
-   Complications and security risks associated with languages that tend to produce programs with large numbers of dependencies.


## Facilitating Adoption of Memory Safe Code for Internet Critical Infrastructure

This track covered a lot of ground trying to identify roadblocks and paths forward. The group examined dynamics within and between private companies, the open source community, philanthropy, and government.

Ease of use was a major topic, with the conversation frequently returning to improving the toolchains for memory safe languages and making them, and various domain specific frameworks, more readily accessible to developers.

There was also quite a bit of discussion about the need for more regular communication between people working on memory safety issues at various organizations. There was general agreement that de-siloing some of the problem solving would help move things along faster.

Policy making came up frequently, and memory safety was identified as an interesting policy problem because this is an engineering problem that we know how to solve. The people and resources are out there, we just need to bring it all together to move forward. It's likely that there are many policy levers worth pulling to help move things forward. A key driver behind this view was the observation that in many contexts, a migration to a memory safe language is entirely a question of whether or not the project is resourced.

The group also discussed whether there are more places where we can build collective commitments that we could seek funding from companies and governments for.

We'd like to thank Alex Gaynor and Paul Kehrer for leading this track.

## Memory Safety Roadmaps for Organizations

Various people and groups have been considering the role that [memory safe roadmaps](https://media.defense.gov/2023/Dec/06/2003352724/-1/-1/0/THE-CASE-FOR-MEMORY-SAFE-ROADMAPS-TLP-CLEAR.PDF) for organizations might have to play in moving things forward. The goal for this track was to spend time examining the potential in more depth.

There was general agreement that there isn't a single kind of roadmap likely to work across the entire spectrum of sizes and types of organizations. To get coverage across the organizations that matter, we'll probably have to pursue multiple strategies.

The three sources of influence in the space are regulation, market forces, and distribution channels. We're looking for roadmap solutions that help these sources of influence make good decisions and exert their influence in the right areas. In order to do this, we need ways to measure the safety of software and perhaps also the soundness of organizational policy and direction.

There are questions about how to get executive buy-in for producing roadmaps, and how to make sure there is organizational follow-through. On the subject of what it would take to get executive buy-in, there was discussion about what other benefits might be bundled with the security benefits. For example - Moore's law is over and parallelism is the way forward for performance. Memory safety [really helps with this](https://medium.com/@adetaylor/fearless-concurrency-a-practical-win-ae59e613c7ab).

When we think about the substance of a plan in a roadmap, there is broad agreement that we want organizations to commit to writing all new projects in a memory safe language, followed by a commitment to moving critical components of existing software (e.g. media decoders, TLS libraries) to memory safe software. What exactly we're looking for beyond that, and what's realistic, is not clear enough.

It was proposed that if a roadmap plan encounters too many challenges, we could pivot to some kind of external analysis for gaining insight into progress. One option for external analysis is something like SSL Labs but for memory safety. Pieces of software could be scored based on their memory safety, and organizations could be scored based on their software, policies, and practices.

We'd like to thank Eric Mill and Bob Lord for leading this track.

## Facilitating the inclusion of Rust in operating systems

Rust is a key tool for programs that need to be both high performance and memory safe. Strong support for Rust in operating systems can greatly improve security. This track explored the challenges and possibilities for Rust support in operating systems. The takeaways included:

-   Interfacing between Rust and C++ is extremely difficult. Because of limitations imposed by the complexity of C++, Bindgen forces a C interface model.
    -   Can interoperability with C++ be improved with deeper integration of clang++ in the Rust compiler?
    -   Would it be possible to create a model in which C++ and Rust are subsumed into one model, with Rust bringing the memory management verification?
-   Need to make a better plan for long-term support of older Rust compiler/toolchain versions. This is also a problem for LLVM to some extent.
-   Porting some parts of libc (e.g. DNS, malloc) to Rust would certainly be a boon for operating system security.
-   Static compilation presents challenges for updating dependencies because each package using a dependency must update instead of a single shared library. Operating systems will take some time to adjust to this.
    -   Is there a future in which it's possible to ship dependencies as dynamically linked libraries?
-   Integrating additional memory safe code in operating systems will involve more cross-language boundaries in binaries. We should try to minimize the possibility of memory management issues on these boundaries, including the ones described [here](https://zhuohua.me/assets/ESORICS2022-FFIChecker.pdf).
-   More a la carte separation of std and core (e.g. stack unwinder) would be helpful. The ability to move platform irrelevant components would be helpful in order to support additional platforms.

We'd like to thank Arlie Davis and Siddarth Pandit for leading this track.

## Improving Trust in Rust Dependency Trees

Rust makes it easy to include dependencies, but this has led to a tendency for Rust programs to [include many dependencies](https://tweedegolf.nl/en/blog/104/dealing-with-dependencies-in-rust). It's not uncommon to see 100+ dependencies even for modest programs. The problem is that this necessitates an extensive web of trust that is a serious security liability. We have seen similarly vulnerable supply chains in Node and Python lead to disaster [[1](https://www.techtarget.com/searchsecurity/news/252525335/Malicious-NPM-package-discovered-in-supply-chain-attack?Offer=abMeterCharCount_ctrl)][[2](https://www.mend.io/blog/npm-package-javascript-library-compromised-via-account-takeover/)].

Logistically, having many dependencies can create problems for operating system packages trying to introduce Rust programs into contexts where having so many dependencies is rare (e.g., C).

While it is [possible to build applications with fewer dependencies](https://tweedegolf.nl/en/blog/119/sudo-rs-depencencies-when-less-is-better), the problem is endemic within the Rust ecosystem. It's not clear that the Rust project today is keen to address the problem, so Tectonics attendees have been discussing two possible options, which could be pursued in parallel:

1.  Building and promoting a more advanced version of [blessed.rs](https://blessed.rs), one that offers more assurances about the blessed packages. The idea is to get programs and libraries to use the same set of dependencies and take more steps to ensure that the blessed packages are well-maintained. We could also focus on reducing indirect dependencies for the blessed packages.
2.  Building a set of libraries outside of the official Rust project, to be maintained by the community that builds it. This would offer the same guarantees and benefits that a standard library would: security update guarantees, trustworthy ownership, consistent and thorough testing, consistent naming and searchability, etc.

Of these options #1 would probably be an easier but less complete solution. We have already heard from multiple parties interested in option #2 that could bring significant resources to bear.

We'd like to thank Florian Gilcher and Dirkjan Ochtman for leading this track.

## Conclusion

This was the first event that ISRG has ever produced. We learned a lot, and we're pleased with the outcomes, including stronger relationships between various people and organizations. We may do it again if we feel the timing is right at some point in the future.

As we shared in the opening, this group of about 50 people at the center of the memory safety movement made Tectonics the success that it was. We're grateful for everyone listed below for their time and contributions:

<div class="tectonics-readout-name-container">
    <div class="tectonics-readout-name">ALEX GAYNOR</div>
    <div class="tectonics-readout-name">ALEX REBERT</div>
    <div class="tectonics-readout-name">AMIT LEVY</div>
    <div class="tectonics-readout-name">ANDREW WHALLEY</div>
    <div class="tectonics-readout-name">ARLIE DAVIS</div>
    <div class="tectonics-readout-name">BOB LORD</div>
    <div class="tectonics-readout-name">CHRIS PALMER</div>
    <div class="tectonics-readout-name">CRAIG NEWMARK</div>
    <div class="tectonics-readout-name">DAVID WESTON</div>
    <div class="tectonics-readout-name">DAN FERNELIUS</div>
    <div class="tectonics-readout-name">DIRKJAN OCHTMAN</div>
    <div class="tectonics-readout-name">DOUG GREGOR</div>
    <div class="tectonics-readout-name">EDWARD WANG</div>
    <div class="tectonics-readout-name">FIONA KRAKENBUERGER</div>
    <div class="tectonics-readout-name">FOLKERT DE VRIES</div>
    <div class="tectonics-readout-name">GAIL FREDERICK</div>
    <div class="tectonics-readout-name">HUGO VAN DE POL</div>
    <div class="tectonics-readout-name">JEFF HODGES</div>
    <div class="tectonics-readout-name">JOEL MARCEY</div>
    <div class="tectonics-readout-name">JOSH AAS</div>
    <div class="tectonics-readout-name">KEES COOK</div>
    <div class="tectonics-readout-name">KEVIN RIGGLE</div>
    <div class="tectonics-readout-name">LUIS VILLA</div>
    <div class="tectonics-readout-name">MATTHEW RILEY</div>
    <div class="tectonics-readout-name">MICHAEL BRENNAN</div>
    <div class="tectonics-readout-name">PAUL KEHRER</div>
    <div class="tectonics-readout-name">PER LARSEN</div>
    <div class="tectonics-readout-name">POWEN SHIAH</div>
    <div class="tectonics-readout-name">RAMON DE C VALLE</div>
    <div class="tectonics-readout-name">SARAH GRAN</div>
    <div class="tectonics-readout-name">SHAI CASPIN</div>
    <div class="tectonics-readout-name">STEPHEN CRANE</div>
    <div class="tectonics-readout-name">STEPHEN LUDIN</div>
    <div class="tectonics-readout-name">STEW SCOTT</div>
    <div class="tectonics-readout-name">TYLER MCMULLEN</div>
    <div class="tectonics-readout-name">WALTER PEARCE</div>
    <div class="tectonics-readout-name">WINDOW SNYDER</div>
    <div class="tectonics-readout-name">YAEL GRAUER</div>
    <div class="tectonics-readout-name">YUCHEN WU</div>
</div>