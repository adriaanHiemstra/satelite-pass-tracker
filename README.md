# Satellite Pass Tracker

A web application that helps a signed-in user find out when satellites are
visible or contactable from their location. Built on Next.js (App Router),
Supabase, and Vercel.

## Live URL

https://satellite-pass-tracker.vercel.app/

## Test Account

- **Email:** test@example.com
- **Password:** Password123!

## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling (dark theme)
- **Supabase** for Auth & Database (via `@supabase/ssr`, cookie-based sessions)
- **Vercel** for hosting

## APIs Used

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — turns
  a city name into coordinates. **In use** (Core 3). No API key required.
- [N2YO API](https://www.n2yo.com/api/) — predicted satellite passes (rise, peak,
  set). **In use** (Core 5). A free API key is required; it is used server-side
  only and never exposed to the browser.

## Running Locally

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
N2YO_API_KEY=<your-n2yo-key>
```

> `NEXT_PUBLIC_SUPABASE_URL` must be the project root only (no `/rest/v1` or other
> path) — the Supabase client appends its own service paths. `N2YO_API_KEY` has no
> `NEXT_PUBLIC_` prefix on purpose: it is a server-side secret.

The database schema and Row Level Security policies live in
[`supabase/schema.sql`](supabase/schema.sql) — run it in the Supabase SQL Editor.

## Project Status

All five core tasks and both stretch tasks are complete:

- **Core 1 — Setup & deploy:** Next.js + Supabase, deployed to Vercel, secrets
  kept out of the repo.
- **Core 2 — Auth & accounts:** email/password sign up, sign in, sign out;
  protected routes (proxy + a per-page `getUser` guard).
- **Core 3 — Location search:** type a city, geocode with Open-Meteo, handle
  no-match and ambiguous results.
- **Core 4 — Save satellites:** browse/search a catalogue, save/unsave to a
  personal list, persisted per user with **Row Level Security**.
- **Core 5 — Passes view:** upcoming passes (rise, peak, set, duration) per saved
  satellite, in local time, with loading and empty states.
- **Stretch A — Visualise a pass:** a per-pass **timeline** (elevation over time).
- **Stretch B — Polish:** responsive layout, loading skeletons, sorted/dimmed
  empty states.

Manual test coverage is documented in [`TESTING.md`](TESTING.md).

## Assumptions

Decisions made where the brief was silent, and why.

<!-- Write your assumptions here. -->

