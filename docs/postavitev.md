# Setup: domain and hosting

State as of 2026-09-26 evening: **ej-aj.si is live** (the .si registry published the
Cloudflare nameservers around 21:30). Worker `ej-aj` also answers on
https://ej-aj.anze999.workers.dev; each branch and PR gets its own preview URL.

- `www.ej-aj.si` redirects 301 to `ej-aj.si` (Cloudflare Redirect Rule, keeps the query string).
- Cloudflare Web Analytics: site `ej-aj.si`, beacon in `src/layouts/Base.astro`
  (token in `src/site.ts`, public).
- Google Search Console: domain property `ej-aj.si` added on anze999@gmail.com; TXT record
  `google-site-verification=...` is in Cloudflare DNS. Verification still has to be confirmed
  in Search Console, then submit `https://ej-aj.si/sitemap-index.xml`.
- Email: `pozdrav@ej-aj.si` via Cloudflare Email Routing to anze999@gmail.com is planned, not
  yet set up.

- Domain `ej-aj.si` registered at **Domenca** (domenca.com).
- Hosting: **Cloudflare Workers** (static assets only, config in `wrangler.jsonc`), connected
  to `AnzeNocAI/ej-aj` through Workers Builds. Cloudflare now labels Pages as legacy.
  - Build command: `npm run build`
  - Deploy command: `npx wrangler deploy`
  - Production branch: `main`; other branches get preview URLs.
- Cloudflare account: anze999@gmail.com. Domenca account: anze999@gmail.com.
- DNS: Cloudflare nameservers set at Domenca (Domenca only keeps the registration).
- Analytics: Cloudflare Web Analytics (no cookies, so no cookie banner).

## Steps (one-time, done by Anže)

1. Cloudflare account: add site `ej-aj.si` (Free plan). Cloudflare shows two nameservers.
2. Domenca: My domains, `ej-aj.si`, nameservers: replace Domenca's with the two from
   Cloudflare. .si changes usually apply within a few hours.
3. Cloudflare: Workers & Pages, create an application, connect GitHub, connect GitHub (grant access only to
   `AnzeNocAI/ej-aj`), settings as above.
4. Worker settings, Domains & Routes: add `ej-aj.si` and `www.ej-aj.si`.
5. Optional: Email Routing for `pozdrav@ej-aj.si` forwarding to a personal inbox.
