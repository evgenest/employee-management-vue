# SSR and HTTPS Backend: Problem and Solutions

## The Problem

When using Nuxt with SSR (server-side rendering), `useAsyncData` runs **twice**:

- **On the server** (Node.js) — on the initial page load or F5 reload
- **On the client** (browser) — when navigating via `<NuxtLink>`

If the backend runs on `https://localhost` with a dev certificate (e.g. ASP.NET Core dev-cert), Node.js **does not trust it** by default and the request fails. The browser works fine because the user has already accepted the localhost certificate exception.

---

## Solutions

### 1. `server: false` in `useAsyncData` ✅ implemented

Data is always fetched on the client; the SSR request to the backend is never made.

```ts
// pages/index.vue
const { data, refresh } = await useAsyncData('employees', () => api.getAll(), { server: false })
```

**Pros:** simple, predictable, no certificate configuration needed.  
**Cons:** no data in the initial HTML response (table renders after JS loads).  
**When to use:** internal tools with no SEO requirements.

---

### 2. `NODE_EXTRA_CA_CERTS` — add the backend certificate

Node.js will trust the specified CA certificate alongside the built-in ones.

In `.env`:
```env
NODE_EXTRA_CA_CERTS=./certs/backend-ca.pem
```

Export the certificate from ASP.NET Core:
```bash
dotnet dev-certs https --export-path ./certs/backend-ca.pem --format Pem --no-password
```

**Pros:** the proper approach; SSR works fully.  
**Cons:** requires managing the certificate file and adding `certs/` to `.gitignore`.  
**When to use:** when SSR matters and you have access to the backend certificate.

---

### 3. `NODE_TLS_REJECT_UNAUTHORIZED=0` — disable SSL verification

Completely disables SSL validation in Node.js.

In `.env`:
```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**Pros:** one line, works instantly.  
**Cons:** insecure — Node.js accepts any certificate, including forged ones.  
**When to use:** local development only, never in production.

---

### 4. Custom agent via Nuxt plugin

Allows fine-grained control over `$fetch` behavior on the server only.

```ts
// plugins/fetch.server.ts
import { Agent } from 'node:https'
import { readFileSync } from 'node:fs'

export default defineNuxtPlugin(() => {
  const ca = readFileSync('./certs/backend-ca.pem')

  globalThis.$fetch = $fetch.create({
    fetchOptions: {
      dispatcher: new Agent({ ca })
    }
  })
})
```

Or with verification disabled (dev-only):
```ts
dispatcher: new Agent({ rejectUnauthorized: false })
```

**Pros:** isolated in a single file, does not affect the global Node.js process.  
**Cons:** more complex than an env variable.  
**When to use:** when fine-grained control is needed or multiple agents are required.

---

## Comparison Table

| Approach                      | SSR works | Secure | Complexity |
|-------------------------------|:---:|:---:|:---:|
| `server: false`               | —   | ✅  | low    |
| `NODE_EXTRA_CA_CERTS`         | ✅  | ✅  | medium |
| `NODE_TLS_REJECT_UNAUTHORIZED`| ✅  | ❌  | low    |
| Custom plugin                 | ✅  | ✅  | high   |

## In Production

In production a CA-signed certificate is used, which Node.js trusts by default. There `server: false` can be removed and SSR will work without any additional configuration.
