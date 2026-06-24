@AGENTS.md

# Project: Satellite Pass Tracker

## Tech Stack

- Next.js (App Router only)
- TypeScript
- Tailwind CSS
- Supabase (Auth & Database via @supabase/ssr)

## Core Coding Rules

1. **App Router Only:** Never use the old `pages` directory. Always use standard App Router conventions (`page.tsx`, `layout.tsx`).
2. **Server First:** Default to React Server Components. Only use `'use client'` at the top of a file when hooks (useState, useEffect) or browser interactivity are strictly required.
3. **Data Mutations:** Use Next.js Server Actions (`'use server'`) for all form submissions, logins, and database writes.
4. **Styling:** Use Tailwind CSS. Keep the design clean, modern, and dark-themed (using slate/zinc/emerald colors to match our test page).
5. **Authentication:** We use Supabase SSR with cookies. The server client is already built and located at `@/utils/supabase/server`. Do not recreate it.
6. **Simplicity:** Write clean, plain-English comments. Do not over-complicate the code with unnecessary abstractions.
