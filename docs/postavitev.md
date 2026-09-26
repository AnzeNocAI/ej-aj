# Setup: domain and hosting

State as of 2026-09-26: Worker `ej-aj` deployed, live at https://ej-aj.anze999.workers.dev.
Custom domains `ej-aj.si` and `www.ej-aj.si` attached to the Worker. Nameservers changed at
Domenca to `amit.ns.cloudflare.com` and `sandy.ns.cloudflare.com` (whois confirms); waiting for
the .si registry to publish the new domain, after which Cloudflare activates the zone.

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
