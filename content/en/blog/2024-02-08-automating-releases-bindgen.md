---
author: Tshepang Mbambo, Christian Poveda Ruiz
date: 2024-02-07T00:00:00Z
title: "Automating Releases for Bindgen"
excerpt: "An update about improving Bindgen from our partners at Ferrous Systems."
slug: automating-releases-bindgen
display_default_footer: true
---

<div class="card border-0">
    <div class="pt-4 pb-4">
        <blockquote class="blockquote">
            <span class="quote"></span>
            <div class="quote-text">
                <p class="font-italic lh-170"><code>Bindgen</code> is an important tool for helping to accelerate the transition from C and C++ to Rust because it generates FFI bindings. We knew that improving the robustness of <code>bindgen</code> would advance our efforts of bringing memory safety to critical infrastructure. We've been working with <a href="https://ferrous-systems.com/">Ferrous Systems</a> to make improvements to <code>bindgen</code>. This post summarizes their most recent work.</p>
                <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
            </div>
        </blockquote>
    </div>
</div>


Ferrous Systems  [maintained](https://ferrous-systems.com/blog/bindgen) `bindgen` through the end of 2023, and we're excited to share an update on our contributions to this project.

Our plan has always been to hand the project back to its original maintainer, so we decided to focus on easing the maintenance of the project instead of adding new features. We made several improvements to the documentation ([2607](https://github.com/rust-lang/rust-bindgen/pull/2607), [2613](https://github.com/rust-lang/rust-bindgen/pull/2613), [2615](https://github.com/rust-lang/rust-bindgen/pull/2615) and [2634](https://github.com/rust-lang/rust-bindgen/pull/2634)), and fixed small bugs that were introduced in some of the restructuring work we did in the past ([2614](https://github.com/rust-lang/rust-bindgen/pull/2614), [2621](https://github.com/rust-lang/rust-bindgen/pull/2621), [2625](https://github.com/rust-lang/rust-bindgen/pull/2625), [2629](https://github.com/rust-lang/rust-bindgen/pull/2629), [2633](https://github.com/rust-lang/rust-bindgen/pull/2633), [2637](https://github.com/rust-lang/rust-bindgen/pull/2637), [2648](https://github.com/rust-lang/rust-bindgen/pull/2648) and [2676](https://github.com/rust-lang/rust-bindgen/pull/2676)).

However, our most relevant contribution to the project is a complete overhaul of the release process of `bindgen`.

Automated releases
------------------

`Bindgen` does not stick to a periodic release schedule; instead, releases are done when users need a specific feature that has not been released yet. This motivated us to make the release process as easy and short as possible.

Creating a new release previously consisted of the following steps:

-   Ensure that all the changes done to the project's API since the last release are included in the unreleased section of the changelog

-   Move all the changes in the unreleased section of the changelog to the new version's section

-   Update the table of contents of the changelog using `doctoc`

-   Bump the version of the `bindgen` and `bindgen-cli` crates

-   Publish a new version of both crates in `crates.io`

-   Generate a new git tag with the same commit published in `crates.io`

-   Create a new Github release pointing to this tag

Although most of these steps were not difficult, they took more than a few minutes to complete and forced the maintainer to go back and forth between windows to remember the next step each time. However, the only step that requires human intervention is updating the changelog. The rest is something that [a machine with a long enough strip of tape and a good table of rules](https://en.wikipedia.org/wiki/Turing_machine) could do.

Luckily for us, there are already some excellent tools in the Rust ecosystem focused on releasing and distributing software.

First we have <code><a href="https://github.com/crate-ci/cargo-release">cargo-release</a></code>, which allows us to automatically bump the version of the crates, create the git tag and publish the crates to `crates.io`. It also has this neat feature of running hooks before the release is done, which we used to update the sections and table of contents of the changelog automatically.

Then we have <code><a href="https://github.com/axodotdev/cargo-dist">cargo-dist</a></code>, which is able to create binaries and installers, and also generate Github releases automatically.

This means that not only were we able to automate most of the release process, but we were also able to produce binary releases so users no longer have to compile `bindgen-cli` themselves every time a new version of `bindgen` is released.

We didn't get this process right initially. It required a couple of iterations and we even botched one release in the process.

As an aside, it was lovely to see the axodotdev team, who are behind `cargo-dist`, [celebrate](https://mastodon.social/@axodotdev/111862739310089765) the news that the (grand old) `bindgen` project is benefitting from the fruits of their labor.

What's next?
------------

With our [Prossimo](https://www.memorysafety.org/) contract ending in 2023, we handed back complete maintenance of `bindgen` to its original maintainer, [Emilio](https://github.com/emilio). We would like to thank Prossimo for the opportunity, as well as Emilio for trusting us to help maintain the project.