# Test Run Log

A record of a manual test execution against a known build. The reusable test
**plan** lives in `TESTING.md`; this file records the **results** of one run.

## Run details

- **Date:** 2026-06-25
- **Commit:** 9002412
- **Environment:** Production — https://satelite-pass-tracker.vercel.app/
- **Tester:** Adriaan Hiemstra
- **Preconditions:** Database cleared (all users deleted); `N2YO_API_KEY` set on
  Vercel; latest `schema.sql` applied.

**Result legend:** ✅ Pass · ❌ Fail · ⚠️ Partial · – Not run

## Summary

- Passed: __ / 65
- Failed: __
- Known issues: see "Issues found" below
- Sign-off: __

---

## 1. Authentication — Happy Paths

| # | Scenario             | Result | Notes |
| - | -------------------- | ------ | ----- |
| 1 | New User Sign Up     | –      |       |
| 2 | Existing User Sign In| –      |       |
| 3 | User Sign Out        | –      |       |

## 2. Authentication — Edge Cases & Errors

| # | Scenario        | Result | Notes |
| - | --------------- | ------ | ----- |
| 1 | Duplicate Sign Up | –    |       |
| 2 | Invalid Password  | –    |       |
| 3 | Malformed Email   | –    |       |
| 4 | Short Password    | –    |       |

## 3. Middleware & Security

| # | Scenario               | Result | Notes |
| - | ---------------------- | ------ | ----- |
| 1 | Protected Route Bounce | –      |       |
| 2 | Login Route Bounce     | –      |       |
| 3 | Session Expiry / Cleared | –    |       |
| 4 | Tampered Auth Token    | –      |       |

## 4. Sign Out

| # | Scenario               | Result | Notes |
| - | ---------------------- | ------ | ----- |
| 1 | Successful sign-out    | –      |       |
| 2 | Post-sign-out protection | –    |       |
| 3 | No stale cache         | –      |       |
| 4 | Works without JS       | –      |       |

## 5. Secure Dashboard

| # | Scenario               | Result | Notes |
| - | ---------------------- | ------ | ----- |
| 1 | Authenticated access   | –      |       |
| 2 | Unauthenticated guard  | –      |       |
| 3 | Correct email shown    | –      |       |
| 4 | Tampered/expired token | –      |       |
| 5 | Location search visible| –      |       |

## 6. City Search — As-You-Type

| # | Scenario            | Result | Notes |
| - | ------------------- | ------ | ----- |
| 1 | Live dropdown       | –      |       |
| 2 | Ambiguous matches   | –      |       |
| 3 | Select a city       | –      |       |
| 4 | Console coordinates | –      |       |
| 5 | No match            | –      |       |
| 6 | Min length          | –      |       |
| 7 | Debounce            | –      |       |
| 8 | Race safety         | –      |       |
| 9 | Edit after select   | –      |       |

## 7. Save Satellites + RLS

| #  | Scenario           | Result | Notes |
| -- | ------------------ | ------ | ----- |
| 1  | Browse catalog     | –      |       |
| 2  | Search by name     | –      |       |
| 3  | Search by NORAD id | –      |       |
| 4  | Filter by category | –      |       |
| 5  | Save               | –      |       |
| 6  | Persistence        | –      |       |
| 7  | Unsave             | –      |       |
| 8  | No duplicates      | –      |       |
| 9  | RLS isolation      | –      |       |
| 10 | RLS enabled (DB)   | –      |       |

## 8. Passes View

| # | Scenario             | Result | Notes |
| - | -------------------- | ------ | ----- |
| 1 | Empty: no location   | –      |       |
| 2 | Empty: no satellites | –      |       |
| 3 | Loading state        | –      |       |
| 4 | Passes shown         | –      |       |
| 5 | Local time           | –      |       |
| 6 | Per-satellite empty  | –      |       |
| 7 | Auto-refresh         | –      |       |
| 8 | Refresh button       | –      |       |
| 9 | Location persists    | –      |       |

## 9. Multiple Locations

| # | Scenario          | Result | Notes |
| - | ----------------- | ------ | ----- |
| 1 | Add cities        | –      |       |
| 2 | Switch active     | –      |       |
| 3 | Shared satellites | –      |       |
| 4 | Remove a city     | –      |       |
| 5 | 5-city cap        | –      |       |
| 6 | Re-select saved   | –      |       |
| 7 | Replace location  | –      |       |
| 8 | RLS isolation     | –      |       |

## 10. Pass Timeline

| # | Scenario                | Result | Notes |
| - | ----------------------- | ------ | ----- |
| 1 | Timeline renders        | –      |       |
| 2 | Peak positioned by time | –      |       |
| 3 | Height = elevation      | –      |       |
| 4 | Local times on axis     | –      |       |
| 5 | No passes               | –      |       |
| 6 | Responsive              | –      |       |

## 11. Polish

| # | Scenario          | Result | Notes |
| - | ----------------- | ------ | ----- |
| 1 | Sort by passes    | –      |       |
| 2 | Loading skeleton  | –      |       |
| 3 | Responsive layout | –      |       |

---

## Issues found

_Log any failure here: severity (blocker / major / minor), repro steps, and the
fix commit once resolved._

1.
