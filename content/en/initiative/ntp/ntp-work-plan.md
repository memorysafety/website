---
title: NTP
slug: ntp-work-plan
background: dce0e9
image: /images/ntp.png
---

<h2>Work Plan</h2>

**Milestone 1: Basic NTP client for Linux**

Implement an NTP client for Linux aiming for \~1ms precision.

* Direct network interface
* Measurement analysis and processing
* Clock adjustment (POSIX)
* Initial client/server connection state management
* Initial configuration & status interface
* Extended testing & test infrastructure
* Support Let’s Encrypt in transition to the new NTP implementation

Estimated timeline: 3 months  
Cost: $135,000

**Milestone 2: NTP server + NTS for Linux**

Implement server-side functionality and add support for the NTS protocol.

* NTS protocol support
* Complete client/server connection state management
* Extend configuration & status interface

Estimated timeline: 3 months  
Cost: $161,000

**Milestone 3: Additional OS support, peer connections, security audit**

Extend support to other operating systems and larger deployments.

* Support for macOS and FreeBSD
* Peer connection management
* Detailed clock control for Linux
* Security audit

Estimated timeline: 3 months  
Cost: $124,000

**Milestone 4: Hardware device support**

Implement support for one representative hardware clock device.

Estimated timeline: 1 month  
Cost: $44,000

**Milestone 5: Communications and Adoption Work**

* Communicate about completed project
* Advocate for adoption by Linux distributions and others shipping NTP implementations

Estimated timeline: 3 months  
Cost: $50,000
