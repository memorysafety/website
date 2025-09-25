---
author: "Dirkjan Ochtman"
date: 2025-10-01T00:00:00Z
slug: "rustls-error-handling"
title: "Improving Error Handling in Rustls"
excerpt: "Creating error messages that are clear and detailed."
display_default_footer: true
display_inline_newsletter_embed: false
---

<div>
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">Dirkjan Ochtman is a maintainer of the Rustls TLS library that we've invested in since 2021. While he and the other maintainers have made many improvements and landed important features, we've asked Dirkjan to talk about another important part of increasing adoptability of Rustls: reducing friction in how it handles errors.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div>

The Rustls team has been improving error handling in Rustls over the past couple of years, and today I'd like to talk about why and how we've done it.

Last year, I kept getting a `NotValidForName` error from a Rustls client connecting to a HTTPS API service I was trying to debug:

```
invalid peer certificate: NotValidForName
```

I thought it was frustrating that the error didn't provide more context to help me understand how to fix the problem. As a Rustls maintainer, I shared my frustration in our [Discord channel](https://discord.gg/MCSB76RU96), and we agreed that this is something we could improve on. Two days later, I submitted an initial [PR for gathering up the required context](https://github.com/rustls/webpki/pull/301). I spent some time preparing our collection of libraries to make this work out, but a few months later rustls [0.23.24](https://github.com/rustls/rustls/releases/tag/v%2F0.23.24) included "more detailed and helpful error reporting for common certificate errors":

```
invalid peer certificate: certificate not valid for name "example.com";
certificate is only valid for DnsName("www.example.com")
```

Three months ago, an issue came in from a reporter that saw Rustls clients failing with:

```
invalid peer certificate: BadSignature
```

One of our maintainers diagnosed this within an hour after it was reported, concluding that the configured crypto provider did not support the signature scheme the server was offering. We merged a PR one day later that [changed this error](https://github.com/rustls/rustls/pull/2479) to UnsupportedSignatureAlgorithm instead, making it more obvious why the signature was bad -- and that this might be remediated by client-side configuration:

```
invalid peer certificate: UnsupportedSignatureAlgorithm
```

This fix was released two weeks later in [0.23.28](https://github.com/rustls/rustls/releases/tag/v%2F0.23.28). I then wanted to add more context to this error as well, and once [0.23.29](https://github.com/rustls/rustls/releases/tag/v%2F0.23.29) was released a few weeks later, the error looked like this:

```
invalid peer certificate: UnsupportedSignatureAlgorithmForPublicKeyContext {
    signature_algorithm_id: [6, 8, 42, 134, 72, 206, 61, 4, 3, 4],
    public_key_algorithm_id: [6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7]
}
```

(Two months later, our maintainer additionally submitted a PR to aws-lc-rs to [add support for the missing signature scheme](https://github.com/aws/aws-lc-rs/pull/857), and Rustls [0.23.32](https://github.com/rustls/rustls/releases/tag/v%2F0.23.32) comes with support for these built-in.)

Although we have so far [blogged](https://www.memorysafety.org/blog/rustls-server-perf/) more about [our performance results](https://rustls.dev/perf/), as the two examples above show we also invest quite a bit of effort into making sure Rustls is easy to use -- even when something fails. Partly this is for selfish reasons: if the error is clear, that means people are less prone to filing an issue, so that we can spend more time on improving the code rather than helping folks diagnose issues. We're not just maintainers, we're users too, and when we break something during development or in our own Rust projects that rely on Rustls, errors will ideally be of high enough quality that we can minimize time spent troubleshooting. Of course we have to be careful to avoid leaking sensitive data in error values.

As a result, in [0.23.31](https://github.com/rustls/rustls/releases/tag/v%2F0.23.31)  [our Error type](https://docs.rs/rustls/0.23.31/rustls/enum.Error.html) distinguishes more than 200 distinct machine-readable error variants; machine-readable variants help downstream libraries deal with specific errors. This is spread out over 8 subcategories of errors, including things like the [IANA-specified TLS alerts](https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#tls-parameters-6) but also categories like PeerIncompatible and PeerMisbehaved. Some of these values have precise names like "PeerMisbehaved::AttemptedDowngradeToTls12WhenTls13IsSupported", while others offer some documentation explaining how or why they might occur. In our Rust code, all of these are specified as enums which are defined to be non-exhaustive, which helps us evolve our error types without affecting API stability. Our last API-incompatible release happened 18 months ago, and we have since shipped 31 releases that improved Rustls without making API-incompatible changes. As such, the ability to improve our error handling without incompatible API changes is very important to our usability goals.

The Rust compiler is known for emitting pretty friendly error messages. That was thanks to an [explicit effort](https://blog.rust-lang.org/2016/08/10/Shape-of-errors-to-come/) from the Rust project, continuing to this day. I think this has increased ambition across the Rust ecosystem to make libraries and applications whose error messages are friendlier: easier to digest and ideally precise enough to help you quickly pinpoint the problem. In Rustls, I feel like we've done pretty well, although there's always opportunities for further improvement. If you run into Rustls errors that are hard to understand, please file an issue so we can see if there's something to be improved!