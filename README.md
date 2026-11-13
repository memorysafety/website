# memsafety-website

Website for ISRG's memory safety project, Prossimo.

```
hugo server -F
```

And open <a href="http://localhost:1313/">http://localhost:1313/</a> in your
browser. Note that the -F flag will show items to be published in the future
(like blog posts with dates in the future).

To view the 404 page when running locally, use <a href="http://localhost:1313/404.html">/404.html</a>.

## Site banner

`layouts/partials/site-banner.html` shows a dismissible banner below the navigation on English pages. All of its settings go in the site config under `[params]`:

```toml
site_banner_enabled = true
site_banner_text = "Message"
site_banner_href = "https://example.org/"  # optional link
site_banner_label = "Button text"          # optional; without it the message is the link
```

For messages with dates, add `[[params.site_banner_schedule]]` entries with `start`, `end` and `text`, plus optional `href`, `label` and `id`. Times are ISO 8601 with an offset; an entry without `href` or `label` uses the ones above. While a scheduled message is active, it replaces the simple banner. Colors are in `static/site-banner/theme.css`. Closing the banner is remembered in the browser's `localStorage` (no cookies).

On Netlify previews and local builds, `?banner-time=<ISO 8601 time>` (for example `?banner-time=2026-12-01T18:00:00Z`) or `?banner=<id>` previews the schedule. The live site ignores both.
