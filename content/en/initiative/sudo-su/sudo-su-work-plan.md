---
title: sudo and su
slug: sudo-su-work-plan
background: dce0e9
image: /images/sudo-su.png
---

**Work Plan**

***Upcoming Milestones***

**Milestone 3: Deployability (First Release)**

* Improve usability by implementing commonly used feature flags and configuration options (such as sudo -l, and various reasonable configuration options)
* Support reading the doas configuration file
* Implement visudo
* More complete user facing documentation, including a migration guide
* First public release of sudo and su aimed at single-user systems

**Milestone 4: Enterprise features (Second Release)**

* Security features for multi-user systems (e.g. NOEXEC)
* Audit trail logging
* Hostname matching for sudoers
* Support for more than 16 user groups (group_file plugin)

**Milestone 5 - Hardening (Third Release)**

* Support for other Linux distributions than Debian/Ubuntu (i.e. Fedora-based ones)
* SELinux and AppArmor support
* sudoedit implementation

***Completed Milestones***

**Milestone 0: Preparation**

* System architecture and requirements
* Project setup
* Sudoers file parsing

**Milestone 1: Drop-in replacement with a default config**

* Core sudo pipeline from policy verification to minimal command execution without
security features
* Sudoers based policy, with limited feature support
* Authentication based on PAM
* Command execution using exec with basic signal and fd passing
* Test for Ubuntu 22.04 with a default sudoers config
* Setup testing framework

**Milestone 2: Security parity**

* Core sudo pipeline with full sanitation of signals, file descriptors, limits, ptrace, pty management, etc. and
more efficient command execution
* Add su implementation
* Testing for full security compliance
* Wider configuration feature flag support
* User facing documentation
* Credential caching
