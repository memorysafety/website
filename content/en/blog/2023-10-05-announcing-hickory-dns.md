---
author: Benjamin Fry
date: 2023-10-05T00:00:00Z
slug: announcing-hickory-dns
title: "Announcing Hickory DNS"
excerpt: "We are proud to announce that Trust-DNS has a new name!"
---

<div class="">
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="font-italic lh-170">Benjamin Fry is the founder and maintainer of DNS software that has attracted growing industry interest due to its progress toward being one of the only open source, high performance, memory safe and DNS resolvers. We've invited Benjamin to provide his thoughts on the growth of this project and make an exciting announcement.</p>
      <footer class="blockquote-footer"><cite title="Source Title">Josh Aas, Head of ISRG's Prossimo project</cite></footer>
    </div>
  </blockquote>
</div>

<br  />
<br  />

![](/images/blog/Hickory-DNS.png)

<br  />
<br  />

Trust-DNS, a project I started on August 7, 2015, will now be known as Hickory DNS. Since its inception, the project has been an exciting experiment to build a systems level component in the memory safe, low overhead language, Rust. Over the years it's gone from a standard implementation of classic DNS to a toolbox capable of serving many needs. The Hickory DNS project supports DNSSEC, DoT, DoH, and DoQ. It has been used to build stub-resolvers, DNS authorities, experimental recursive resolvers, and low level protocol implementations.  I had a lot of personal goals for this project and with this name change I hope that it will help attract more interest to achieve them all.

Why make this change?
---------------------

I chose the Trust-DNS for good reasons, Rust was in the name, and I had the desire to make something trust-worthy. This has always been a project supported out of passion and as it's attracted more interest from others we want to ensure that it has a future with a more widely appealing identity for consumers, developers, and funders. On top of that, we wanted to select a defensible trademark. The Trust-DNS brand name was deemed to be less defensible since it is a combination of generic words, especially in an industry where any DNS provider will want to talk about the trust their service provides. Hickory in this context is far less likely to occur unintentionally without directly referring to this project.. Over the past year there's been a conversation going on with [ISRG](https://www.abetterinternet.org/about/) to receive some support by way of their [Prossimo](https://www.memorysafety.org/about/) project to add features and robustness to this software. They also intend to eventually use it in [Let's Encrypt](https://letsencrypt.org/about/). Since we are in the midst of a major push to advance functionality, it seemed like a good time to make the necessary changes to the name as well.

Where did the name Hickory DNS come from? While considering the goals of this project, trust, security, reliability, safety arose as top priorities; the Hickory tree seemed like a good representation of those goals. A tree has some obvious relationships to the graph in DNS. The Hickory tree itself is a strong hardwood tree that tends to grow straight and look quite elegant. It's known for being hardy, growing all over North America. It's tough and shock-resistant. These properties are all things that we've grown to appreciate in regards to having developed the project with the Rust language. By choosing something from nature to represent this, we're calling out the organic way in which this project has attracted interest and development from all over the world. As the project's founder, I hope that with this name we can all feel proud of what's been built so far and recognize how much further the project can grow. Our contribution policies will remain unchanged and we will always welcome new contributions assuming they fit with our goals. We want the trust we've gained over the years to be something which people will continue to rely on.

How will this impact existing users and contributors?
-----------------------------------------------------

We will be moving the project into the [Hickory DNS](https://github.com/hickorydns) organization on GitHub. During this move we will also be changing the project name to [Hickory DNS](https://github.com/hickorydns/hickorydns). This transition to an organization and away from my personal github account will allow for a greater set of administrative options for other collaborators, like [Dirkjan Ochtman](https://github.com/djc) who's been helping maintain the project for a couple of years now. All of the crates will start being published under the hickory-* name, for example the popular crates trust-dns-resolver and trust-dns-proto will become hickory-resolver and hickory-proto, while the server will be hickory-dns. There may be other changes that need to occur, if others have gone through similar moves, we'd be open to feedback about how to make it most effective. Things that we will not change: licensing (MIT or Apache 2.0), Code of Conduct, and seeking to make the best DNS software available.

I want to thank the many users of and contributors to the Trust-DNS project and I hope you will join us by continuing to collaborate on the same project under the new name, Hickory DNS. This project would not be where it is without your support of 2,560 commits and 71,318 lines of code written by 170 collaborators. All of that has led to, according to GitHub, 1,136 dependent projects that use the software. Crates.io shows 20,310,799 downloads of the [proto](https://crates.io/crates/trust-dns-proto) crate and 19,003,768 of the [resolver](https://crates.io/crates/trust-dns-resolver) crate. With these new investments in the project, we hope to grow the usage of the [server](https://crates.io/crates/trust-dns) and make it something people are comfortable deploying in their production systems. Thank you everyone for your confidence, I am excited for the future of this project, and I hope you are too. If you have any questions or concerns related to this change, feel free to reach out to me. Here's a Hickory tree in the woods near my parents' house in New York, it's probably 20 or 30 years old. I hope that together we can build something as beautiful.

![](/images/blog/Hickory-trees.jpg)

Again, thank you!