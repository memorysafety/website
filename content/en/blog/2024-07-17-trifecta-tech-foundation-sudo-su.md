---
author: Josh Aas, Megan Werner
date: 2024-07-15T00:00:00Z
slug: trifecta-tech-foundation-sudo-su
title: "A new home for memory safe sudo/su"
excerpt: "Sudo-rs, an open source memory safe implementation of sudo/su, has a new long-term home at the Trifecta Tech Foundation."
---

<div class="card border-0 mb-4 pic-quote-right">
    <img alt="Trifecta Tech Foundation Logo" class="mx-auto img-fluid" src="/images/blog/logo-trifecta.png" />
</div>

Today we're pleased to announce that an open source [memory safe implementation of sudo/su](https://www.memorysafety.org/initiative/sudo-su/) -- [sudo-rs](https://github.com/trifectatechfoundation/sudo-rs) -- has a new long-term home at the [Trifecta Tech Foundation](https://trifectatech.org/).

ISRG's Prossimo project set out to develop a strategy, raise funds, and select a contractor for a memory safe sudo/su implementation in early 2022. We did this because sudo and su are critical utilities managing control of the user privilege boundary on most Linux systems. The original utilities are written in C and have a history of [memory safety vulnerabilities](https://www.memorysafety.org/docs/memory-safety/), a class of issues that critical system software should not suffer from.

During 2022 we made a [plan](https://www.memorysafety.org/blog/sudo-and-su/) and selected a joint team from[  Tweede golf](https://tweedegolf.nl/) and [Ferrous Systems](https://ferrous-systems.com/) as the contractors. Funding was generously provided by[  ](https://www.cisco.com/)[Amazon Web Services](https://aws.amazon.com/). The first release was made in August 2023. A [third party security audit](https://github.com/trifectatechfoundation/sudo-rs/blob/main/docs/audit/audit-report-sudo-rs.pdf) was completed in September of 2023.

There are software packages for [Debian,](https://packages.debian.org/trixie/sudo-rs)  [Ubuntu](https://packages.ubuntu.com/noble/sudo-rs) and [Fedora](https://packages.fedoraproject.org/pkgs/sudo-rs/sudo-rs/). It's also available on [crates.io](https://crates.io/crates/sudo-rs).

We recently decided that Trifecta Tech Foundation would become the long-term maintainer of sudo-rs. It was founded by the team from Tweede golf, and since they worked on sudo-rs and we're big fans of their approach to open source, it was an easy decision to make on our end. 

Trifecta Tech Foundation aims to provide stability to the sudo-rs project and support its maintainers. Their work will be supported by soliciting contracts and sponsorship for features and maintenance.

If you're using sudo (who isn't?) you can help make your systems and the Internet as a whole safer by becoming an adopter of sudo-rs and providing feedback. [Contact](mailto:donate@trifectatech.org) Trifecta Tech Foundation if you're interested!

### Support Our Work

ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/).