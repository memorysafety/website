---
author: Josh Aas
date: 2024-12-01T00:00:00Z
slug: Rustls-adoption-grows
title: "Security-Sensitive Industries Move to Memory Safety"
excerpt: "Growing adoption of memory safe and high performance TLS."
display_default_footer: true
---

Prossimo has been investing in the memory safe, high performance TLS library called [Rustls](https://www.memorysafety.org/initiative/rustls/) for nearly four years. During that time, we've seen Rustls improve and we've seen growing adoption. Organizations like [1Password](https://releases.1password.com/linux/0.9/), [Google Fuschia](https://fuchsia.googlesource.com/third_party/curl/+/main/docs/RUSTLS.md'), and [Fly.io](https://fly.io/security) have been using Rustls for a while, and we're pleased that FIS is joining that list. [FIS](https://www.fisglobal.com/), a global fintech firm whose services underpin a huge portion of the financial world, has adopted [Rustls](https://en.wikipedia.org/wiki/Rustls) in order to bring memory safety to TLS for critical aspects of its internal infrastructure.

The FIS team was able to make the switch with just a few hours of engineering time thanks to the [Rustls OpenSSL compatibility layer for Nginx](https://www.memorysafety.org/blog/rustls-nginx-compatibility-layer/). This recently added feature made it possible to swap in Rustls without needing to modify or recompile Nginx.

Moving to Rustls is an excellent response to the recent [cross-industry call](https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/press-release-technical-report/) from the White House's Office of the National Cyber Director (ONCD) for companies to add memory safety to their roadmaps. National Cyber Director Harry Coker stated, "we, as a nation, have the ability -- and the responsibility -- to reduce the attack surface in cyberspace and prevent entire classes of security bugs from entering the digital ecosystem but that means we need to tackle the hard problem of moving to memory safe programming languages."

We see the Nginx OpenSSL compatibility layer as an important tool to accelerate the move to memory safety and encourage any organization running Nginx to try it out. If your organization is able to dedicate a few hours of engineering time like FIS did, your memory safety roadmap will have one item marked as 'complete' in 2024. "This may be a multi-decade endeavor that will require all of us, those in government, the private sector, and across the technical community to play our part and that's why we must begin this work today," Anjana Rajan, Assistant National Cyber Director at the White House, stated previously.  Recently, Rajan commented: "the urgency of addressing the memory safety problem cannot be overstated and it's time to start the next chapter of back to the building blocks and show how we are executing against this vision."

If you're interested in exploring how Rustls could work for your organization, check out the project on [GitHub](https://github.com/rustls/rustls) or contact us at <press@abetterinternet.org>.