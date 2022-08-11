---
title: NTP
slug: ntp-work-plan
background: dce0e9
image: /images/ntp.png
---

<h2>Work Plan</h2>

**Milestone 1: NTP Client**

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

**Milestone 2: NTP Server**

Implement server-side functionality.

* Complete client/server connection state management
* Extend configuration & status interface
* Additional testing and documentation

Estimated timeline: 2.5 months  
Cost: $48,000

**Milestone 3: Network Time Security (NTS) Support and Third Party Audit**

Add support for Network Time Security (NTS) to both the server and client and undergo thorough third party security audit.

* NTS client
  * NTS-KE client
  * NNTS Extension fields
  * NNTS Cookie management
* NTS Server
  * Master key management library
  * NTS-KE server
* Additional configuration
* Additional testing
* Additional documentation
* Third party audit

Estimated timeline: 4 months  
Cost: $137,000

**Milestone 4: Hardware Device Support**

Implement support for one representative hardware clock device.

Estimated timeline: 1 month  
Cost: $44,000

**Milestone 5: Communications and Adoption Work**

* Communicate about completed project
* Advocate for adoption by Linux distributions and others shipping NTP implementations

Estimated timeline: 3 months  
Cost: $50,000
