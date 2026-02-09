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

Status: Complete
Cost: $138,000

**Milestone 2: NTP Server**

Implement server-side functionality.

* Complete client/server connection state management
* Extend configuration & status interface
* Additional testing and documentation

Status: Complete
Cost: $48,000

**Milestone 3: Network Time Security (NTS) Support**

Add support for Network Time Security (NTS) to both the server and client.

* NTS client
  * NTS-KE client
  * NTS Extension fields
  * NTS Cookie management
* NTS Server
  * Master key management library
  * NTS-KE server
* Additional configuration
* Additional testing
* Additional documentation

Status: Complete
Cost: $93,600

**Milestone 4: Third Party Audit**

A third party security audit will be performed by [Radically Open Security](https://www.radicallyopensecurity.com/).

Status: Complete
Cost: Funded by [NLNet Foundation](https://nlnet.nl/)
