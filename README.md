# Satellite Pass Tracker

A web application to track upcoming satellite passes based on user location.

## Live URL

https://satelite-pass-tracker.vercel.app/

## Test Account

- **Email:** test@example.com
- **Password:** Password123!

## APIs Used

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [N2YO API](https://www.n2yo.com/api/)

## Running Locally

```bash
npm install
npm run dev
```

## Assumptions

Repository & Documentation: Established the repository structure before writing any code.

Next.js Defaults: Used the standard Next.js App Router configuration to keep the project clean and aligned with current standard practices.

Database Security Rules: I put the security rules directly into the database (Row Level Security) instead of just the website code. This guarantees nobody can ever see another person's saved data, even if they bypass the website.

Test Account Setup: I turned off email confirmation for new accounts in Supabase. This ensures I can log in instantly with the test account without needing to check a real email inbox.

Saved Locations Storage: The brief mentioned the test account should have "saved locations". I assumed this meant creating a separate, secure database table just for locations, so users do not have to search for their city every time they log in.

Secure Logins: I chose to use secure server cookies to manage user sessions instead of local browser storage.
