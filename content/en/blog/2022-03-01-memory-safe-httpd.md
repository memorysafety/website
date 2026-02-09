---
author: Stefan Eissing
slug: memory-safe-httpd
date: 2022-03-01T00:00:00Z
title: "Bringing Memory Safe TLS to Apache httpd"
excerpt: "Guest author Stefan Eissing discusses the process of developing a memory safe TLS backend for Apache httpd. "
---




<div class="card border-0 pic-quote-right">
    <div class="pt-4">
        <blockquote class="blockquote">
            <span class="quote"></span>
            <div class="quote-text">
                <p class="font-italic lh-170">Stefan Eissing helped us complete one of our first Prossimo initiatives so we asked him to provide his perspective on the work in this blog post. Thank you for your partnership and contributions, Stefan! </p>
                <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG’s Prossimo project</cite></footer>
            </div>
        </blockquote>
    </div>
</div>



Motivation
----------

One goal of ISRG's [Prossimo memory safety initiative](https://www.memorysafety.org) is to show how software infrastructure on the Internet can be improved by enhancing existing software with solutions that provide better security via memory safety.

What better target could there be than the ancient (nearly Internet age!) juggernaut of HTTP, the [Apache httpd server](https://httpd.apache.org). It has been around since 1995 and is written in the security fragile C language. As a longtime member of the Apache community, I was eager to explore how memory safe code could play nicely within the great tool this group has built.

The Project
-----------

The goal of this effort is to develop a memory safe TLS backend for Apache httpd. TLS is a critical function within httpd so creating a backend with improved memory safety should be a meaningful security improvement for people who choose to use it.

Several components made this work possible. [Rustls](https://github.com/rustls/rustls) is a complete implementation of the TLS protocol written in Rust. In order to make it possible to use Rustls from a C program, [Jacob Hoffman-Andrews](https://github.com/jsha) and [Kevin Burke](https://kevin.burke.dev) created a C API for Rustls called [rustls-ffi](https://github.com/rustls/rustls-ffi). The new mod_tls module uses Rustls via rustls-ffi.

Rustls-ffi has nothing specific to Apache in it, but it was developed in coordination with the Apache work, as well as [similar work being done on curl](https://www.memorysafety.org/initiative/curl/), in order to ensure that it works well for real consumers. If you want to make TLS in your own C application safer, rustls-ffi is an option for you now.

On the Apache side, I did two things:

1.  I developed [mod_tls](https://github.com/abetterinternet/mod_tls) around Rustls, via rustls-ffi, as a memory safe alternative to the existing TLS module [mod_ssl](https://httpd.apache.org/docs/2.4/mod/mod_ssl.html), which uses OpenSSL and compatible libraries. Apache modules are dynamically loadable extensions, so people can choose what they need.

2.  I enhanced Apache's internal infrastructure to allow not just one, but several, TLS modules to be loaded in the same server instance.

The second point means you can phase in mod_tls alongside mod_ssl in your installations. Rustls only supports TLS 1.2 and higher because earlier TLS versions are not considered to be secure. However, some people still need to support older versions of TLS for legacy systems. If you want to use mod_tls for TLS 1.2 and higher while still supporting older versions of the protocol with mod_ssl, you can do that today.

The mod_tls documentation offers a [feature table](https://github.com/abetterinternet/mod_tls#comparison-with-mod_ssl) comparing it to mod_ssl, letting people determine if they can make the complete switch or which parts of the server they may migrate to the memory safe implementation. [Possible scenarios](https://github.com/abetterinternet/mod_tls#peace-and-harmony) are described in the documentation. Client certificate support is not available yet, but we are hoping to add it in the future.

The Cost
--------

I spent approximately six months building mod_tls and making it possible to load multiple TLS modules at the same time in httpd. This was made possible through Google's generous support of Prossimo and its mission to improve memory safety (thank you!).

Compared to the impact this work can have, it was not a big investment. Making it possible to swap memory safe modules into existing C programs for critical functionality is a strategy that ISRG's Prossimo project is particularly interested in. It means they can invest in a small set of important libraries and then use them in critical software infrastructure with minimal effort. As much as I would like to learn Rust in the future, I was able to bring a Rust-based TLS module into httpd without having to know any Rust at all!

As mentioned before, the Prossimo project did something very similar with curl, but they didn't stop at TLS - they were also able to do the same thing for HTTP, making it possible to build curl with a memory-safe [Hyper](https://github.com/hyperium/hyper) HTTP implementation.

The Result
----------

In December 2021, mod_tls was released as part of Apache httpd v2.4.52. It has experimental status, which is commonly done when new functionality is phased in because the project wants feedback from the field and reserves the possibility to make non-backward compatible changes.

Load tests on developer machines are very promising. Performance of Rustls is on the level of OpenSSL (release line v1.1.x was used in the test). Memory use appears to be reduced. Note that Rust produces 'direct' code and has no garbage collection or other runtime overhead. It remains solid under load.

![](/images/blog/Blog-2022-03-01-Image1.png)

Availability
------------

Right now you need to build rustls-ffi separately, preferably from the github repositories. Once you have rustls-ffi installed you can build mod_tls as part of the Apache httpd release, just like other modules.

We will be working to get various Linux and BSD distributions that already ship the Rust toolchain to make a package for mod_tls (as they do for other Apache modules already). That will be the preferred way for you to use it and also receive updates.

About Prossimo
--------------

ISRG is the 501(c)(3) nonprofit organization behind Prossimo and [Let's Encrypt](https://letsencrypt.org/). We are 100% supported through the generosity of those who share our vision for ubiquitous, open Internet security. If you'd like to support our work, please consider getting involved, [donating](https://www.abetterinternet.org/donate/), or encouraging your company to become a [funder](/become-a-funder/).