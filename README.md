## Notes

### Auth0

Using the Quickstart for Auth0 here
https://auth0.com/docs/quickstart/webapp/nextjs/01-login

ran `npm install @auth0/nextjs-auth0`

created a `.env` file and a `.env.example`.

ran `openssl rand -hex 32` in CLI to create a valu for the `AUTH0_SECRET` environment variable.

created route handler
```
cd src
mkdir -p 'app/api/auth/[auth0]' && touch 'app/api/auth/[auth0]/route.js'
```

didn't create `app/layout.jsx` because this is Typescript, instead updated the `app/layout.tsx` file.

Added `<a href="/api/auth/login">Login</a>` to the `page.tsx`

Added `http://localhost:3000/api/auth/callback` to the Allowed Callback URLs and login works.

### Neon

Created a Neon account (for free) and grabbed the `postgresql://` connection string from there.

Using the guide but for Drizzle
https://neon.tech/docs/get-started-with-neon/connect-neon
As well as some of this example
https://github.com/neondatabase/guide-neon-next-clerk/tree/main/app/db

you get a bunch of errors if you don't do it this way. `drizzle-orm` doesn't like the nextjs stuff.
Run:
```shell
npm i dotenv @neondatabase/serverless
npm i drizzle-orm --legacy-peer-deps
npm i -D drizzle-kit
```

```typescript
import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL not found in environment");

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  strict: true,
} satisfies Config;
```

Added `DATABASE_URL='postgresql://...` with my Neon connection string to the `.env` file.

Ran `npx drizzle-kit push` successfully

Running `npx drizzle-kit push` I'm seeing warnings
> [!WARNING]
> Warning '@neondatabase/serverless' can only connect to remote Neon/Vercel Postgres/Supabase instances through a websocket

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
