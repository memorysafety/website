---
build:
  list: never
  publishResources: false
  render: never
title: rav1d AV1 Decoder $20,000 Performance Bounty Contest Official Rules
slug: rav1d-bounty-official-rules
draft: true
background: dce0e9
---

# rav1d AV1 Decoder $20,000 Performance Bounty Contest (Official Rules)

NO PURCHASE OR PAYMENT OF ANY KIND IS NECESSARY TO ENTER OR WIN. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING. THE CONTEST IS VOID WHERE PROHIBITED OR RESTRICTED BY LAW. THESE RULES AND APPLICABLE LAW GOVERN ALL ASPECTS OF CONTEST PARTICIPATION AND PRIZE AWARDS. DO NOT ENTER IF YOU ARE NOT ELIGIBLE UNDER THESE RULES OR YOU ARE LOCATED IN A JURISDICTION IN WHICH THIS CONTEST IS PROHIBITED.

## 1. THE CONTEST

Welcome to the rav1d AV1 Decoder $20,000 Performance Bounty Contest (the “Contest”). No purchase is necessary to enter or win, and no deposit, entry fee, payment, or proof of purchase is necessary to participate in this Contest.

ISRG’s [Prossimo](https://www.memorysafety.org/) project (which promotes the development of memory-safe code for the Internet’s security-sensitive software infrastructure) and partners built an AV1 decoder in Rust called [rav1d](https://github.com/memorysafety/rav1d). It’s based on the [dav1d](https://code.videolan.org/videolan/dav1d) decoder, which is written in C. The problem: rav1d is about 5% slower than dav1d. To increase rav1d’s adoption, rav1d’s speed and performance must be at least equal to that of the latest release of dav1d.

We wrote a [blog post](https://www.memorysafety.org/blog/rav1d-performance-optimization/) that describes our experience optimizing rav1d up to this point. We made all of the optimizations we could find and now we’re not sure what to do next. That’s why ISRG is offering a prize pool of US$20,000 to the first person or team that can close the performance gap and get the solution merged into rav1d, the Rust compiler, or the Rust standard library per existing standards and processes (i.e. the solution is acceptable to the maintainers of the relevant code bases).

## 2. SPONSOR

The sponsor of this Contest is Internet Security Research Group (“ISRG”, “Sponsor,” “we,” or “us”). ISRG may be contacted at hello@memorysafety.org or 548 Market St, PMB 77519, San Francisco, California 94104-5401 USA.

## 3. CONTEST PERIOD

The Contest begins on Monday May 12, 2025, at 12:00:01 a.m. Pacific Time (“PT”) (the “Start Date”) and ends on 31 December 2025, at 11:59:59 p.m. PT (the “End Date”) or as soon as the Sponsor determines, in its sole discretion, that the Contest’s objective has been achieved. The Contest Start Time and End Time will be determined solely by the Sponsor’s internal clock, which shall be the official timekeeping device for the Contest. Sponsor is not responsible for any discrepancies between the official timekeeping device and any other clocks or timekeeping systems, including those of individuals or teams of individuals who participate in the Contest (each an “Entrant”). The period from the Start Date to the End Date is the “Contest Period.” 

Sponsor reserves the right to terminate or extend the Contest at its discretion, by posting such termination or extension on the website [memorysafety.org](http://memorysafety.org).

## 4. ELIGIBILITY

The Contest is open to individuals or teams of individuals who are: (1) legal residents or citizens of the United States, United Kingdom, European Union, Canada, New Zealand, or Australia; (2) at least the legal age of majority in their jurisdiction of residence or older at the time of entry; (3) not listed as a Specially Designated National (“SDN”) by the United States Treasury Department’s Office of Foreign Assets Control; and (4) not located in the following jurisdictions: Cuba, Iran, North Korea, Russia, Syria, and the following areas of Ukraine: Donetsk, Luhansk, and Crimea. 

Employees, officers, directors, agents, and representatives of Sponsor and its parent companies, subsidiaries, affiliates, advertising/promotion/fulfillment agencies, anyone else connected with the production and distribution of this Contest and their immediate families (spouse, parent, child, sibling, and their respective spouses, regardless of where they reside) and those living in their same household, whether or not related, are not eligible to enter or win the Contest.

Sponsor reserves the right to verify eligibility and to adjudicate any dispute regarding an Entrant’s eligibility at any time. If in participating in the Contest an Entrant provides any false information including with respect to the Entrant’s identity, residency, mailing address, telephone number, email address, or other information required for entering the Contest, the Entrant may be immediately disqualified from the Contest in Sponsor’s sole discretion. 

## 5. CONDITION OF PARTICIPATION

Each Entrant agrees that they have reviewed and accept ISRG’s [Privacy Policy](https://www.abetterinternet.org/privacy-policy/). In addition, each Entrant agrees they have reviewed and unconditionally agree to abide by these rav1d AV1 Decoder $20,000 Performance Bounty Contest Official Rules (the “Official Rules”) and the decisions of the Sponsor, which are final and binding in all respects with respect to the Contest.

The Official Rules govern the Contest, but they do not govern Sponsor’s websites or services, which are governed by their own terms. 

In the event of a conflict between these Official Rules and any instructions or interpretations of these Official Rules given by an employee or agent of Sponsor regarding the Contest, the Official Rules shall prevail, govern, and control. In the event of any discrepancy or inconsistency between these Official Rules and disclosures or other statements contained in any Contest-related materials, the Official Rules shall prevail, govern, and control.

## 6. HOW TO ENTER

Entrants must submit their solutions by filing a GitHub issue or pull request on the [rav1d repository](https://github.com/memorysafety/rav1d), or by emailing [hello@memorysafety.org](mailto:hello@memorysafety.org) (each, an “Entry”). All Entry materials must be in English, and each Entry must include the following documentation:

  * A subject prefix of “Perf Bounty Entry:” for GitHub issues, pull requests, and emails
  * A detailed explanation of the solution;
  * A link to a GitHub pull request, or links to multiple GitHub pull requests, containing the source code changes against the relevant code repositories. The pull requests may be in private repositories. If the pull requests are in private repositories, access must be granted to Contest organizers and judges upon request.
  * Information about your test environment: CPU model (e.g. Ryzen 7700X, M2 Pro), memory configuration, Rust version (plus patches if relevant), and operating system.
  * Benchmark results demonstrating performance improvements.

Please contact us as early as possible by filing an issue on the rav1d repository or emailing [hello@memorysafety.org](mailto:hello@memorysafety.org) if you are working on a promising solution. We want to ensure your approach aligns with the contest requirements so you do not invest significant time in an Entry that may not be eligible for consideration.

Entrants may submit multiple Entries. However, if an Entrant repeatedly submits low-effort or spam entries, Sponsor may, in its sole discretion, disqualify Entrant and disregard any future Entries by that Entrant.

All Entry materials must contain only content that the Entrant owns or has permission to use from the copyright/trademark owner. Entries including copyrighted materials without appropriate licensing or permissions will be disqualified. If permissible copyrighted materials are used, the Entrant must provide attribution and license information. Entries that fail to include required permissions information as specified in these Official Rules will be disqualified.

Sponsor shall not be liable for any problems that occur during the Entry process, including without limitation, late, incomplete, delayed, undelivered, or misdirected Entries, and shall not have any obligation to advise any Entrant of an incomplete, invalid, or undeliverable Entry. Sponsor shall likewise not be required to acknowledge an Entry once submitted. No illegible, incomplete, or non-compliant Entries will be accepted. Entries that are incomplete or do not adhere to these Official Rules and the specifications stated herein may be disqualified in Sponsor’s sole discretion. Entries received after the Contest End Date will not be eligible to enter or win. 

## 7. SELECTION OF PRIZE WINNER

A panel of engineers and advisors, selected by Sponsor in Sponsor’s sole discretion (the “Panel”), will review all eligible Entries within sixty (60) days of receipt. If the Panel deems an Entry to be a potential winning Entry, the Panel will notify Entrant that they will consider that Entry for award of the Prize if the Entrant can get the Entry merged into the relevant projects such that, upon merge, the Entry still meets the Winning Criteria (defined in Section 8 below) in a fashion superior to other Entries.

If multiple viable but incompatible solutions exist—where each independently meets the performance objective but cannot be integrated—Sponsor reserves the right to award the Prize to the Entrant whose Entry is deemed superior, considering factors such as performance, maintainability, and fitness for purpose.

If multiple Entries contribute to achieving the performance goal, Sponsor may, in its sole discretion, allocate the Prize proportionally to the submitting Entrants based on the significance of each contribution.

## 8. WINNING CRITERIA

The prize winner(s) (“Winner(s)”), if any, will be selected based on the following criteria regarding correctness, performance improvements, maintainability, and adherence to the Contest’s requirements (the “Winning Criteria”):

### Performance Criteria

The solution must bring rav1d main branch performance at least to parity with dav1d v1.5.1 per the below benchmarking methodology, for both single and multithreaded operation, on Ubuntu Linux 24.04 (x86_64 and aarch64), macOS 15 or higher (Apple Silicon), and Windows 11 24H2 or higher (x86_64). We do not care about performance improvements for other architectures, but other architectures should not regress significantly. You must compile dav1d with the same version of clang/LLVM used by the Rust toolchain (available via rustc --version --verbose) used to compile rav1d. An Entry’s performance impact will be measured on ISRG and Immunant hardware, including but not limited to Apple M2 and AMD Ryzen 9xxx CPUs.
  
Test on an idle, non-virtualized machine using the [hyperfine](https://github.com/sharkdp/hyperfine) command line tool. On Linux hosts, you can also use [perf](https://perfwiki.github.io/main/) to obtain measurements from your CPU’s performance counters. You can see how we do so as part of our continuous integration setup for rav1d [here](https://github.com/memorysafety/rav1d/blob/main/.github/workflows/build-and-benchmark-x86.yml). In any case, you must test on the following input files:

  * http://download.opencontent.netflix.com.s3.amazonaws.com/AV1/Chimera/Old/Chimera-AV1-8bit-1920x1080-6736kbps.ivf 
  * http://download.opencontent.netflix.com.s3.amazonaws.com/AV1/Chimera/Old/Chimera-AV1-10bit-1920x1080-6191kbps.ivf
  * summer_nature_1080p.ivf
    * `curl -O http://www.phoronix-test-suite.com/benchmark-files/Stream2_AV1_HD_6.8mbps.webm`
    * `ffmpeg -i Stream2_AV1_HD_6.8mbps.webm -vcodec copy -an -f ivf summer_nature_1080p.ivf`
  * summer_nature_4k.ivf
    * `curl -O http://www.phoronix-test-suite.com/benchmark-files/Stream2_AV1_4K_22.7mbps.webm`
    * `ffmpeg -i Stream2_AV1_4K_22.7mbps.webm -vcodec copy -an -f ivf summer_nature_4k.ivf`

Benchmarking example using all available threads:

  * Linux
    * hyperfine "target/release/dav1d -q -i /tmp/Chimera-AV1-8bit-1920x1080-6736kbps.ivf -o /dev/null"
  * Windows
    * hyperfine ".\target\release\dav1d -q -i $env:TEMP\Chimera-AV1-8bit-1920x1080-6736kbps.ivf -o /dev/null"

Benchmarking example using single thread:
  * hyperfine "target/release/dav1d -q -i /tmp/Chimera-AV1-8bit-1920x1080-6736kbps.ivf -o /dev/null --threads 1"

### Code Criteria

The dav1d and rav1d decoders share some low-level assembly. The solution must not involve modifying the assembly code that rav1d imports from dav1d. We need to reach parity between dav1d’s C code and rav1d’s Rust code while continuing to use the same exact assembly optimizations as dav1d.

The solution must not add unacceptable usage of Rust’s unsafe keyword, in which acceptability is judged by us (you are welcome to ask at any time by sending an email to [hello@memorysafety.org](mailto:hello@memorysafety.org)) and/or the maintainers of the relevant project which may eventually need to merge the code. Fewer instances of the “unsafe” keyword are generally better, provided that it does not come at an unacceptable cost in terms of architecture and maintainability.

The solution must be in either rav1d itself, the Rust compiler, or the Rust standard library. You must not introduce code into rav1d in a language other than Rust. Binary rewriting (e.g. post-link time optimization) and changes to build processes are not in-scope as a potential solution.

The solution cannot include backporting changes from newer versions of dav1d.

### Merge criteria:

Entrants must work with relevant project maintainers to merge their entry into the relevant projects. Entrants may ask for assistance with this process from the rav1d project, though assistance cannot be guaranteed. An Entry must be merged into the rav1d project, the Rust standard library, and/or the Rust compiler, per those projects’ existing standards and processes.

## 9. CONSENT TO COMMUNICATIONS

Each Entrant who submits an Entry thereby consents to receive communications from the Sponsor for the purpose of administering this Contest.

## 10. PRIZE POOL

The total available prize pool is US$20,000, which Sponsor will distribute to the Winner(s) via electronic transfer.

Prize is non-transferable. Entrants may not designate another individual or entity as the recipient of the Prize. If a Winner is unable or unwilling to accept the Prize, the Sponsor may, in its sole discretion, award it to another Entrant or choose not to award it at all.

## 11. NOTIFICATION TO PRIZE WINNER

At the conclusion of the Contest, Sponsor will publish the identity of the Winner(s) in a blog post on [memorysafety.org](memorysafety.org). Sponsor will make at least one attempt to contact a Winner via email (the “Notification”). If the Notification is returned as undeliverable, rejected, or no response is received within three (3) days, the Winner may be disqualified, and Sponsor may—but is not obligated to—select a runner-up Winner based on the criteria stated in the “Selection of Prize Winners” section. 

Winner may be required to sign and return an affidavit of eligibility (which affirms that they have complied with these Official Rules), a signed copy of these Official Rules, a liability release, and, where legal, a publicity release, each of which, if issued, must be completed, signed, and returned within fourteen (14) days from date of issuance, or a Prize may be forfeited. 

Sponsor is not responsible for any change of email address, mailing address, and/or telephone number of any Entrant, nor is Sponsor responsible for any inability of a potential Winner to accept or use any portion of the Prize for any reason. 

## 12. OTHER CONDITIONS

By participating in the Contest, Entrant agrees that (1) these Official Rules and the decisions of Sponsor are final and binding on all matters pertaining to the Contest; and (2) all federal, state, provincial and local laws and regulations apply to this Contest.

### CAUTION AND WARNING

ANY ATTEMPT TO DELIBERATELY DAMAGE THE WEBSITE OR TO UNDERMINE THE LEGITIMATE OPERATION OF THE CONTEST IS A VIOLATION OF CRIMINAL AND CIVIL LAWS. SHOULD SUCH AN ATTEMPT BE MADE, SPONSOR RESERVES THE RIGHT TO SEEK DAMAGES OR OTHER REMEDIES FROM ANY SUCH PERSON(S) RESPONSIBLE FOR THE ATTEMPT TO THE FULLEST EXTENT PERMITTED BY LAW.

### Right to Modify or Suspend Contest

Sponsor reserves the right, in its sole discretion, to modify or suspend this Contest or any portion hereof, at any point during the Contest Period for any reason at its sole discretion.

In the event of modification or suspension, Sponsor may, in its sole discretion, select Winners, if any, from among the remaining eligible Entries. If the Contest is terminated, cancelled, or postponed for any reason whatsoever, Sponsor will award the actual/appraised value of the Prize only to the extent required by law.

### Right to Disqualify Contest Entrants 

Sponsor reserves the right, in its sole discretion, to disqualify any Entrants implicated in any of the actions identified below during the Contest Period: 

  * An Entrant acts in violation of these Official Rules;
  * An Entrant attempts to undermine the legitimate operation of the Contest by cheating, deceiving, or engaging in unfair practices;
  * An Entrant takes actions that annoy, threaten, or harass any other Entrants, Sponsor, or associated agencies;
  * An Entrant uses automated entry systems to participate in the Contest;
  * As a result of any information arising from any background check(s) as set out below.

Because a Winner will be affiliated with Sponsor, Sponsor reserves the right to conduct background check(s) of all records of Entrants and/or Winners, including without limitation, civil and criminal court records, and police reports. To the extent necessary under law, such individuals shall authorize this background check. In that regard, such individuals will be obligated to provide necessary releases, contacts, and information so that Sponsor may conduct such investigation. Sponsor reserves the right, in its sole discretion, to disqualify any Entrant and/or Winner, based on the background check. 

Additional restrictions may apply.

## 13. USE OF DATA

By participating in the Contest, Entrant agrees to Sponsor’s use of Entrant’s name and email address in connection with the Contest. This information and any other personal information you provide us will be used to administer the Contest and to send you information about Sponsor and our services, and will not be shared with third parties without consent, in compliance with Sponsor’s [Privacy Policy](https://www.abetterinternet.org/privacy-policy/).

## 14. INTELLECTUAL PROPERTY RIGHTS

### Representations and warranties

By submitting an Entry, each Entrant represents and warrants that: (i) Entrant has all rights necessary to submit their Entry and grant Sponsor the license described in these Official Rules; (ii) Entrant will make any intellectual property assignment necessary to contribute their Entry to the relevant open-source repository or repositories; and (3) their Entry does not infringe upon any third party's intellectual property rights.

### Ownership and license

Sponsor does not claim ownership rights to your Entry. All intellectual property rights for the Entries remain with their respective owners. However, by submitting your Entry, you grant Sponsor an irrevocable, royalty-free, unconditional, perpetual worldwide right and license to use, edit, reproduce, print, publish, display, transmit, distribute, sell, perform, adapt, enhance, review, assess, test, or create derivative works from your Entry and all its content in connection with this Contest and to use your Entry in any media whatsoever now known or later invented for any non-commercial or commercial purpose, including, but not limited to, the marketing, sale, or promotion of this Contest without further permission from you. You will not receive any compensation or credit for use of your Entry, other than what is described in these Official Rules. Sponsor shall not incur any liability whatsoever to the extent Sponsor chooses to refrain from any exploitation of its rights hereunder. By entering, you acknowledge that Sponsor may have developed or commissioned materials similar or identical to your Entry and you waive any claims resulting from any similarities to your Entry. Further you understand that we will not restrict work assignments of representatives who have had access to your Entry, and you agree that use of information in our representatives’ unaided memories in the development or deployment of our products or services does not create liability for us under this agreement or copyright or trade secret law. During and after this Contest, your Entry may be posted on a public website. We are not responsible for any unauthorized use of your Entry by visitors to this website. We are not obligated to use your Entry for any purpose, even if it has been selected as a winning Entry. Personal data you provide while participating in this Contest will be used by Sponsor and/or its agents and award fulfillers acting on its behalf only for the administration and operation of this Contest and in accordance with Sponsor’s [Privacy Policy](https://www.abetterinternet.org/privacy-policy/). If you do not want to grant us these rights to your Entry, please do not submit anything to this Contest.

## 5. PUBLICITY

Winners agree that Sponsor may use their name, affiliation, hometown, and/or likeness for advertising and promotion in any media now known or hereafter devised, without further notice, compensation, consideration, review, or consent, and without regard to moral rights, unless prohibited by law. Winners also acknowledge and agree that Sponsor may promote their name and likeness as a Winner on Sponsor’s websites. 

## 16. TAXES

Any valuation of the Prize stated herein is based on available information provided to the Sponsor. The value of the Prize may be taxable to the Winner as income. All federal, state, and local taxes and any other costs and expenses associated with the acceptance and/or use of the Prize not specifically provided for in these Official Rules are solely each winning Winner’s responsibility. Winner is solely responsible for reporting and paying any and all applicable taxes. 

If a Prize exceeds $600 USD in ARV, Winner may be required to complete additional paperwork and to provide Sponsor with their social security number and may be issued a tax form. Winner is advised to seek independent tax counsel regarding the implications of accepting the Prize.

## 17. RELEASE OF LIABILITY AND INDEMNIFICATION, AND LIMITATION ON LIABILITY

By entering the Contest, each Entrant represents and agrees (and agrees to confirm in writing) to release and hold harmless Sponsor and their parents, subsidiaries, affiliates, divisions, advertising and promotional agencies, wholesalers and retailers, suppliers and each of the foregoing entities’ employees, officers, directors, and agents (collectively the “Released Parties”), from and against any and all claims, actions and/or liability for any injuries or death, loss, or damage of any kind arising from or in connection with participation in and/or entry into the Contest or acceptance or use of any Prize or participation in any Contest-related travel or other activity and for any claims based on publicity rights, defamation, invasion of privacy, and merchandise delivery. However, only if required by law in Entrant’s jurisdiction, this release, hold harmless and indemnification commitment does not apply to cases of bodily injury or loss of life or to the extent that any death or personal injury is caused by the negligence of Sponsor or other third party, where liability to the injured party cannot be excluded by law.

Each Entrant represents and agrees (and agrees to confirm in writing) to indemnify, release, and hold harmless the Released Parties from and against any and all liability, claims, loss, damage, injury or expense, including reasonable attorney’s fees, arising in connection with any third party action arising out of a breach or allegation which if true would constitute a breach of any of Entrant’s representations, warranties, or obligations herein. 

## 18. LIMITATION OF LIABILITY

NOTHING IN THESE OFFICIAL RULES LIMITS, EXCLUDES, OR MODIFIES OR PURPORTS TO LIMIT, EXCLUDE, OR MODIFY ANY STATUTORY CONSUMER GUARANTEES OR ANY IMPLIED CONDITION OR WARRANTY, THE EXCLUSION OF WHICH FROM THESE OFFICIAL RULES WOULD CONTRAVENE ANY STATUTE OR CAUSE ANY PART OF THESE OFFICIAL RULES TO BE VOID (“NON-EXCLUDABLE GUARANTEES”). SUBJECT TO THE LIMITATIONS IN THE PRECEDING SENTENCE, SPONSOR EXCLUDES FROM THESE OFFICIAL RULES ALL CONDITIONS, WARRANTIES, AND TERMS IMPLIED BY STATUTE, GENERAL LAW, OR CUSTOM, EXCEPT FOR LIABILITY IN RELATION TO A NON-EXCLUDABLE GUARANTEE. 

Each Entrant hereby acknowledges that the Released Parties have neither made nor are in any manner responsible or liable for any warranty, representation, or guarantee, express or implied, in fact or in law, relative to any of the Prizes (or any components thereof). Any and all warranties and/or guarantees on a Prize (if any) are subject to the respective manufacturers’ terms therefore, and Entrant and/or Winner agree to look solely to such manufacturers for any such warranty and/or guarantee.

The Released Parties are not responsible or liable for any incorrect or inaccurate Entry information, and assume no responsibility for (i) any error, omission, interruption, defect, or delay in operation, connectivity, or transmission at any website, network, or server; (ii) failure of any Entry to be received by Sponsor due to technical/mechanical/electronic errors or problems, human error, or traffic congestion on the Internet or at any website, network or server; (iii) communications line, hardware and/or software failures; (iv) damage to any computer (software or hardware) resulting from or related to participation in the Contest; (v) theft or destruction of, tampering with, unauthorized access to, or alteration of Entry information; (vi) Entries, email messages, or other communications related to the Contest that are late, lost, stolen, damaged, delayed, garbled, illegible, unintelligible, misdirected, mutilated, and/or incomplete (or any combination thereof); (vii) printing, typographical or other errors appearing within these Official Rules or in any Contest-related advertisements or other materials; (vii) the administration of the Contest or the processing or judging of Entries or the tabulation of votes; or (ix) other errors or problems of any kind.

## 19. GOVERNING LAW AND DISPUTE RESOLUTION

The Contest and these Official Rules are governed by and shall be interpreted by the laws of the State of California, without regard to its conflict of law provisions. Any dispute, claim, or controversy arising out of or relating to these Official Rules and/or the Contest shall be determined by binding arbitration in San Francisco, California before one arbitrator. The arbitration shall be administered by JAMS pursuant to its Comprehensive Arbitration Rules and Procedures. Judgment on the award may be entered in any court having jurisdiction. This clause shall not preclude parties from seeking provisional remedies in aid of arbitration from a court of appropriate jurisdiction. If either party is required to engage in arbitration or any proceedings to enforce its rights under these Official Rules, the prevailing party shall be entitled to recover from the other, in addition to any other sums due, the reasonable attorney's fees, costs, and necessary disbursements involved in said proceedings. Until such proceedings conclude, each party shall bear its own costs. By entering the Contest, you expressly waive any right to bring or participate in a class action or multi-plaintiff action and agree that all claims must be resolved individually through arbitration.

## 20. CALIFORNIA RESIDENTS – NOTICE OF FINANCIAL INCENTIVE

When you follow the instructions to participate in the Contest, you will be providing Sponsor with personal information in return for a chance to win Prizes. Your participation in the Contest is completely voluntary, and you have a right to withdraw from these incentives at any time. If you decide you do not want to participate in these financial incentives, you can refrain from participating in the Contest.

The monetary value of the Prizes is a reasonable approximation of the monetary value of the information you provide us. We have arrived at this estimate based on consideration of multiple factors, including expenses we incur in operating the Contest. 

## 21. GENERAL

These Official Rules are the final, complete, and exclusive understanding between Sponsor, Entrants, Winner(s), and any other participant in the Contest and supersede any and all prior or contemporaneous representations, rules, or agreements, whether oral or written or otherwise presented. If any provision of these Official Rules is held to be contrary to law, such provisions shall be changed and interpreted to as to best accomplish the objectives of the original provision to the fullest extent allowed by law, provided that if no such interpretation is possible, the provision shall be stricken, and the remaining provisions of these Official Rules shall remain in effect to the fullest extent allowable under applicable law. 

## 22. NO THIRD-PARTY SPONSOR

This Contest is in no way sponsored, endorsed, administered by, or associated with, any brand, supplier, manufacturer, retailer, or other entity associated with the Prizes.

Meta d/b/a Facebook, Instagram from Meta, BlueSky, and LinkedIn (collectively “Social Media Sites”) are not sponsors, endorsers, or affiliated in any way with the Contest. All questions regarding the Contest must be directed to Sponsor, not any Social Media Site. Entrant agrees as a condition of participating in the Contest that they shall release Social Media Sites from any and all liability arising out of or relating to Entrant’s Entry, creation of an Entry, submission of an Entry, participation in the Contest, acceptance, use, or misuse of any Prize, or the broadcast, exploitation, or use of an Entry.

## 23. MODIFICATION OF OFFICIAL RULES

Sponsor reserves the right to modify these Official Rules at any time at its discretion by notice posted at [memorysafety.org](memorysafety.org).
