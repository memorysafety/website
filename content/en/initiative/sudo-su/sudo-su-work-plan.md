---
title: sudo and su
slug: sudo-su-work-plan
background: dce0e9
image: /images/sudo-su.png
---

**Work Plan**

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

* Core sudo pipeline with full sanitation of signals, file descriptors, limits, ptrace, etc. and
more efficient command execution
* Add su implementation
* Testing for full security compliance
* SELinux support
* AppArmor support
* Wider configuration feature flag support
* User facing documentation

**Milestone 3: Subcommand auditing**

* Support for subcommand interception

**Milestone 4: Enterprise features**

* LDAP support
* Hostname matching for sudoers
* Full audit and IO logging
* Mail events
* Authentication for passwd and Kerberos (without PAM)
* Support for more than 16 user groups (group_file plugin)
