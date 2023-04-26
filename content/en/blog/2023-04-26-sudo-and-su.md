---
author: Josh Aas
date: 2023-04-26T00:00:00Z
slug: sudo-and-su
title: "Bringing Memory Safety to sudo and su"
excerpt: "We are reimplementing sudo and su utilities in Rust."
---

Our Prossimo project has historically focused on creating safer software on network boundaries. Today however, we're announcing work on another critical boundary - permissions. We're pleased to announce that we're [reimplementing the ubiquitous sudo and su utilities in Rust](/initiative/sudo-su/).

Sudo was first developed in the 1980s. Over the decades, it has become an essential tool for performing changes while minimizing risk to an operating system. But because it's written in C, sudo has experienced many vulnerabilities related to memory safety issues.

When we're thinking about what software we want to invest in we think primarily about [four risk criteria](/about/#identifying-risk):

1.  Very widely used (nearly every server and/or client)

2.  On a critical boundary

3.  Performing a critical function

4.  Written in languages that are not memory safe (e.g. C, C++, asm)

Sudo fits this risk criteria squarely. It's important that we secure our most critical software, particularly from memory safety vulnerabilities. It's hard to imagine software that's much more critical than sudo and su.

This work is being done by a joint team from [Ferrous Systems](https://ferrous-systems.com/) and [Tweede Golf](https://tweedegolf.nl/) with generous support from Amazon Web Services. The work plan is viewable [here](/initiative/sudo-su/sudo-su-work-plan/). The GitHub repository is [here](https://github.com/memorysafety/sudo-rs).

If you'd like to support Prossimo's work to [improve](/about/)  [memory safety](/docs/memory-safety/), please consider [contributing](/sponsor/).

About Us
--------

ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://abetterinternet.org/getinvolved/), [donating](https://abetterinternet.org/donate/), or encouraging your company to [become a funder](/become-a-funder/).