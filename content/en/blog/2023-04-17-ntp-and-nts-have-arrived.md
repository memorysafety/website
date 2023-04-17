---
author: Josh Aas
date: 2023-04-17T00:00:00Z
slug: NTP-and-NTS-have-arrived
title: "Memory Safe Network Time (NTP) Has New Home, Seeks Early Adopters"
excerpt: "Bringing more safety to a critical network-based service."
---

Today we're pleased to announce that an open source [memory safe implementation of NTP](/initiative/ntp/) - [ntpd-rs](https://github.com/pendulum-project/ntpd-rs) - has a new long-term home and is looking for early adopters.

The implementation includes a server and client, as well as full support for Network Time Security (NTS), which brings encryption and greater integrity to time synchronization. Timing is precise and stable, as reflected by excellent performance in the NTP pool.

ISRG's Prossimo project set out to develop a strategy, raise funds, and select a contractor for a memory safe NTP implementation in early 2022. We did this because NTP is a critical network-based service and the most widely used implementations are written in C. This is a recipe for exploitable [memory safety vulnerabilities](/docs/memory-safety/), a class of issues that critical system software should not suffer from.

During Q1 2022 we made a plan and selected [Tweede golf](https://tweedegolf.nl/) as the contractor. Funding was generously provided by [Cisco](https://www.cisco.com/) and [Amazon Web Services](https://aws.amazon.com/). Work started on April 1, 2022. A security audit of the initial production-ready code, performed by [Radically Open Security](https://www.radicallyopensecurity.com/) and funded by [NLNet Foundation](https://nlnet.nl/), was completed in March of 2023.

During the [course of the work](/blog/memory-safe-ntp/) it was decided that Tweede golf would become the long-term maintainer of ntpd-rs as part of their [Pendulum Project](https://github.com/pendulum-project). Since their team wrote ntpd-rs and we're big fans of their approach to open source, it was an easy decision to make on our end. Their work will be supported by soliciting contracts and sponsorship for features and maintenance.

If you're running NTP services you can help make your systems and the Internet as a whole safer by becoming an early adopter of ntpd-rs and providing feedback to Tweede golf. Contact Tweede golf via pendulum@tweedegolf.com if you are interested!

About Us
--------
ISRG is a 501(c)(3) nonprofit organization that is 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider [getting involved](https://abetterinternet.org/getinvolved/), [donating](https://abetterinternet.org/donate/), or encouraging your company to [become a funder](/become-a-funder/).