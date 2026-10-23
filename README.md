# welcome to blockify!

![image](https://github.com/jcstein/blockify/assets/46639943/29ea72e0-509a-43ff-9388-0f0029530a1a)

we're building eCommerce solutions on the Blockchain

- [visit our site](https://blockify.shop)
- [React Router docs](https://reactrouter.com/)

The site is a React Router v8 framework-mode app (the current Remix) rendered on Cloudflare Workers. The home page loader still returns the same community links, including the minting demo and Telegram chat. There is no in-repo wallet or chain client; those links are the blockchain features this app has today.

## Cloudflare setup

Deploy with Cloudflare Workers Builds (native Git integration). Do not add a GitHub Actions workflow.

Create a Worker on the personal Cloudflare account and connect this GitHub repository.

| Setting | Value |
| --- | --- |
| Type | Worker (Workers Builds). Not a Pages project. |
| Worker name | `blockify` (matches `name` in `wrangler.jsonc`) |
| Production branch | `main` |
| Root directory | `/` (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` (the Workers Builds default) |
| Build output | Not set in the dashboard. `react-router build` writes the Worker and a generated Wrangler config; `wrangler deploy` follows `.wrangler/deploy/config.json` to `build/server/wrangler.json`. Static assets are `build/client`. |
| Node.js | `22`. Commit `.node-version` with `22` so Workers Builds does not use its Node 24 default. React Router 8 requires Node `>=22.22.0`; the Workers Builds image's Node 22 is 22.23.2. Optionally set the build variable `NODE_VERSION=22` to the same value. |
| Build variables | None required beyond the Node pin above. |
| Build secrets | None. |
| Runtime variables | None. |
| Runtime secrets | None. |
| Bindings | None. `nodejs_compat` is enabled. Workers Logs and traces are enabled in `wrangler.jsonc`. |

### Custom domain

`wrangler.jsonc` attaches the Worker to `blockify.jcstein.dev` as a Custom Domain. Production deploy creates the DNS record and certificate.

Requirements:

- The zone `jcstein.dev` is on the same Cloudflare account as the Worker.
- `blockify.jcstein.dev` does not already have a CNAME. Custom Domains cannot be created on a hostname that already has one. Delete that record first if it exists.

After the first successful production deploy, `https://blockify.jcstein.dev` serves this app. The `workers.dev` hostname can stay enabled or be turned off in the dashboard; the custom domain does not depend on it.

Non-production branch builds use `npx wrangler preview` and do not replace the production custom domain.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:5173. `react-router dev` runs the app in the Workers runtime through the Cloudflare Vite plugin.

To preview the production build the way Workers will run it:

```sh
npm run build
npx wrangler dev
```

Wrangler serves that build at http://localhost:8787. `npm run preview` builds and opens Vite's production preview instead.

## Vercel

This app used to deploy to Vercel (`blockify.vercel.app`). That setup is removed:

- `vercel.json` set `ENABLE_FILE_SYSTEM_API=1` for the Vercel Remix build. Removed.
- `api/index.js` was the `@remix-run/vercel` request handler, and `remix.config.js` wrote the server build to `api/_build`. Removed, along with `@remix-run/vercel`.
- Committed `public/build` browser assets and the Remix `.cache` directory were Vercel/Remix build output. Removed.

Nothing Vercel-specific remains. There was no GitHub Actions workflow.
