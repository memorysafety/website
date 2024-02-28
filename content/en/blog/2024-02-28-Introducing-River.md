---
author: Josh Aas
date: 2024-02-28T00:00:00Z
title: "Announcing River: A High Performance and Memory Safe Reverse Proxy Built on Pingora"
excerpt: "Improving security for a critical piece of Internet infrastructure."
slug: ntroducing-River
display_default_footer: true
---

Today we are announcing plans to build a new [high performance and memory safe reverse proxy](https://github.com/memorysafety/river) in partnership with Cloudflare, Shopify, and Chainguard. The new software will be built on top of Cloudflare's [Pingora](https://github.com/cloudflare/pingora), a Rust-based HTTP proxy, the open sourcing of which was [announced today](https://blog.cloudflare.com/pingora-open-source).

Just about every significant deployment on the Internet makes use of reverse proxy software, and the most commonly deployed reverse proxy software is not memory safe. This means that most deployments have millions of lines of C and C++ handling incoming traffic at the edges of their networks, a risk that [needs to be addressed](https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/press-release-technical-report/) if we are to have greater confidence in the security of the Internet. In order to change this, Prossimo is investing in new reverse proxy software called [River](https://www.memorysafety.org/initiative/reverse-proxy/), which will offer excellent performance while reducing the chance of memory safety vulnerabilities to near zero.

&ldquo;Cloudflare announced plans to open source Pingora, a high performance, memory-safe framework to build large scale networked systems a little over a year ago. After the announcement, it became clear that we were not the only ones striving to replace unsafe legacy Internet infrastructure,&rdquo; said Aki Shugaeva, Engineering Director, Cloudflare. &ldquo;Cloudflare's mission is to help build a better Internet and we look forward to partnering with the ISRG and others on the River project to continue to improve the Internet for everyone.&rdquo;

<div class="card border-0 pic-quote-right">
    <div class="pt-4 pb-4">
        <blockquote class="blockquote">
            <span class="quote"></span>
            <div class="quote-text">
                <p class="font-italic lh-170">&ldquo;<em>At Shopify, we support the efforts to improve the efficiency of crucial web traffic handling infrastructure for a safer and faster HTTP routing system. We appreciate Cloudflare's contribution on this front through the open-sourcing of Pingora, providing the project with a solid foundation to build upon.</em>&rdquo;</p>
                <footer class="blockquote-footer"><cite title="Source Title">Mike Shaver, Distinguished Engineer at Shopify</cite></footer>
            </div>
        </blockquote>
    </div>
</div>

ISRG contracted with [James Munns](https://onevariable.com/) over the past few months to lead an effort with our partners to create an architecture and engineering plan, which can be viewed [here](https://github.com/memorysafety/river).

Some of the most compelling features include:

-   Better connection reuse than proxies like Nginx due to a multithreading model, which greatly improves performance.

-   WASM-based scriptability means scripting will be performant and River will be scriptable in any language that can compile to WASM.

-   Simple configuration, as we've learned some lessons from configuring other software for the past couple of decades.

-   It's written in Rust so you can deploy without worrying about memory safety issues.

The engineering work to implement is expected to begin in Q2 2024.

Building a piece of software like this is no small task and we recognize the ambition it will take. We're grateful for the help we've gotten from our partners so far. If you or your organization are interested in contributing engineering hours or financial support to help us get there, please reach out to <sponsor@abetterinternet.org> to begin the conversation.