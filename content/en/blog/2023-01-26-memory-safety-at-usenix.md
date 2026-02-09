---
author: Josh Aas
date: 2023-01-26T12:00:00Z
slug: memory-safety-at-USENIX
title: "Assessing Progress on Memory Safety at USENIX Enigma Conference"
excerpt: "A reflection on the lively conversation about challenges and opportunities to improve memory safety."
display_default_footer: true
---

I had the pleasure of discussing the state of memory safety at this year's USENIX Enigma conference, one of our industry's leading fora for important security and privacy issues. There were several salient points made about how to eliminate code that lacks memory safety, and I want to highlight a few that I see as most actionable.

-   Start by insisting that new modules and programs be written in memory safe languages. It's going to take a while to replace unsafe code that has already been written, but we can stop creating more unsafe code now.

-   We don't need to rewrite everything at once. Pick the most security-critical modules and start there. It can be relatively easy to replace an unsafe module with a safe one.

-   Maintainers don't necessarily need to learn another language. For example: many Rust-based modules, for example, come with C APIs so you can integrate them easily without needing to know Rust.

-   Help stakeholders understand that we don't have to live with the constant stream of memory safety vulnerabilities that come out of code that is not memory safe. It will take some work, but we have the knowledge and tools to make memory safety vulnerabilities a rarity.

In 2023, Prossimo will continue to make headway on improving memory safety in critical infrastructure. I'm particularly excited about new work on the memory safe TLS library called [Rustls](/initiative/rustls/).

I'd like to thank Yael Grauer for organizing this panel, and my fellow panelists, Amira Dhalla and Alex Gaynor for the energizing conversation. Thank you to the USENIX Enigma conference and its organizers for giving us the opportunity to discuss and get the word out about this important topic. Finally, thanks to our funders who have supported our memory safety efforts: Acton Family Giving, AWS, Cisco, Futurewei, Fly.io, and Google.

If you're interested in learning more about memory safety, check out this [new report](https://advocacy.consumerreports.org/research/report-future-of-memory-safety/) from Consumer Reports.
