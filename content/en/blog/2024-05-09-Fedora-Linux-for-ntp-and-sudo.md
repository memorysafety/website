---
author: Fabio Valentini
date: 2024-05-08T00:00:00Z
slug: Fedora-Linux-for-ntp-and-sudo
title: "Providing official Fedora Linux RPM packages for ntpd-rs and sudo-rs"
excerpt: "Memory safe NTP and sudo are now in Fedora Linux."
blog_posts: ["2024-03-07-reducing-dependencies-in-sudo.md", "2023-04-26-sudo-and-su.md"]
---

<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">Fabio Valentini is a longtime maintainer of many RPM packages for Fedora Linux. He recently helped us get sudo-rs and ntpd-rs packaged in Fedora Linux so we asked him to share his thoughts on the process.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div>

Fedora Linux aims to provide high-quality RPM packages for Rust applications, which makes it a great fit for security critical applications like ntpd-rs and sudo-rs.

## The Fedora approach to Rust packaging

[Our approach](https://docs.fedoraproject.org/en-US/packaging-guidelines/Rust/) towards building and distributing Rust applications differs from most other distribution mechanisms in some key aspects. Most importantly, we try to avoid building packages for Rust applications with vendored dependencies, and instead attempt to provide packages for individual crates whenever possible. These packages for crates are then used for building application packages, and are shared between all applications that depend on them.

Since everything that is redistributed by Fedora Linux (either as source code or as compiled packages) needs to comply with both technical and legal requirements, sharing dependencies this way makes it easier to review and audit dependencies (i.e. thorough peer review when adding a package for a new crate, and some quick checks when pushing updates for existing crates). By comparison, auditing all vendored dependencies whenever an update for an application package is pending is usually not possible due to the time that would be required, and is often neglected as a result.

Additionally, this approach allows us to ship updates for security vulnerabilities in Rust crates quickly. Only the package for the affected library needs to be updated, and packages for applications that use this library can just be rebuilt against the "fixed" version without requiring any code changes. This allows us to push security updates for Rust applications to users reliably, whereas other distribution mechanisms either don't support pushing updates to users at all (like `cargo install`), or would require updating vendored dependencies and/or code changes individually for each affected application.

## Packaging ntpd-rs and sudo-rs

I was initially approached by Josh Aas from Prossimo in January 2023 because there was interest in providing official Fedora Linux RPM packages for [ntpd-rs](https://www.memorysafety.org/initiative/sudo-su/). At this point, our tools did not yet support building projects like ntpd-rs (i.e. projects that were organized as multiple crates within a "cargo workspace"). Over the following months, I worked on both updating our tools to support this use case and on packaging and getting packages for crate dependencies through peer review.

While I was able to finish the tooling support relatively quickly (I [released](https://pagure.io/fedora-rust/rust2rpm/raw/8ca9320/f/NEWS) official support for building "workspace" projects in February 2023), getting packages for crate dependencies reviewed and/or updated to the versions that were needed by ntpd-rs took longer than expected. One of the final blockers was resolved with the 0.17.0 release of `ring` in October 2023 (and the accompanying release of `rustls`), as this version finally included support for all CPU architectures that are supported by Fedora Linux.

Additionally, the effort to reduce the number of dependencies of ntpd-rs in the versions approaching the 1.0.0 release helped as well - even though it rendered some work that had already been done to package the dropped dependencies (i.e. the `axum` web framework) for Fedora obsolete (one of the dangers of working towards a moving target, I suppose).

My package [review request for ntpd-rs](https://bugzilla.redhat.com/show_bug.cgi?id=2246730) from October 2023 was finally approved at the end of the year, and I was able to push packages for ntpd-rs to the [official Fedora repositories](https://bodhi.fedoraproject.org/updates/?packages=ntpd-rs) at the start of 2024. All current branches of Fedora Linux now provide up-to-date packages for ntpd-rs.

Finally, last month, Josh Aas reached out to me again, asking me about providing packages for sudo-rs for Fedora Linux as well. Since this project is much smaller and has very few dependencies (which were all already available), I was able to get the package [through review](https://bugzilla.redhat.com/show_bug.cgi?id=2264457) and publish [official Fedora packages](https://bodhi.fedoraproject.org/updates/?packages=sudo-rs) for sudo-rs within 10 days.

Due to the status of `sudo` as a non-removable package on Fedora Linux, sudo-rs currently cannot provide the `sudo` executable, but it should be possible to make the necessary changes to allow the packages to be truly interchangeable in the future.

## Conclusion

While our approach to packaging Rust applications for Fedora is sometimes difficult and time consuming compared to other distribution mechanisms, I think the unique benefits (especially the possibility of reliably pushing security updates to users and technical / legal review of crate dependencies) currently still outweigh the cost. I'm confident that we can continue providing high-quality, up-to-date packages for ntpd-rs and sudo-rs -- and Rust applications in general -- for our users.

*(1) Prossimo is able to take on the challenging work of rewriting critical components of the Internet thanks to our community of funders from around the world. We'd like to thank the NLnet Foundation for their funding of the audit of sudo-rs. We'd also like to thank Cisco and Amazon Web Services for supporting this work and supporting the transition to memory safe software.*  **- Josh Aas**


<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">(2) Prossimo is able to take on the challenging work of rewriting critical components of the Internet thanks to our community of funders from around the world. We'd like to thank the NLnet Foundation for their funding of the audit of sudo-rs. We'd also like to thank Cisco and Amazon Web Services for supporting this work and supporting the transition to memory safe software.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div>

(3) Via Josh Aas: "Prossimo is able to take on the challenging work of rewriting critical components of the Internet thanks to our community of funders from around the world. We'd like to thank the NLnet Foundation for their funding of the audit of sudo-rs. We'd also like to thank Cisco and Amazon Web Services for supporting this work and supporting the transition to memory safe software."

ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/).