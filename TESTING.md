# Application Testing Matrix

## 1. Authentication (Happy Paths)

| Test Case                 | Steps to Reproduce                                    | Expected Result                                        | Status |
| :------------------------ | :---------------------------------------------------- | :----------------------------------------------------- | :----- |
| **New User Sign Up**      | Enter a new, valid email and password > Click Sign Up | Account created, redirected to `/`, session cookie set | [ ]    |
| **Existing User Sign In** | Enter correct credentials > Click Sign In             | Redirected to `/`, dashboard loads correctly           | [ ]    |
| **User Sign Out**         | Click Sign Out button on dashboard                    | Session cleared, redirected to `/login`                | [ ]    |

## 2. Authentication (Edge Cases & Errors)

| Test Case             | Steps to Reproduce                                      | Expected Result                                   | Status |
| :-------------------- | :------------------------------------------------------ | :------------------------------------------------ | :----- |
| **Duplicate Sign Up** | Try to sign up with an email that is already registered | UI displays a clear "User already exists" error   | [ ]    |
| **Invalid Password**  | Sign in with correct email but wrong password           | UI displays "Invalid login credentials" error     | [ ]    |
| **Malformed Email**   | Try to sign in or sign up with `test@.com`              | UI rejects the input before submitting            | [ ]    |
| **Short Password**    | Try to sign up with a 3-character password              | UI displays a password length error from Supabase | [ ]    |

## 3. Middleware & Security

| Test Case                    | Steps to Reproduce                                                    | Expected Result                                           | Status |
| :--------------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------- | :----- |
| **Protected Route Bounce**   | Open Incognito window > Go directly to `http://localhost:3000/`       | Middleware intercepts, instantly redirects to `/login`    | [ ]    |
| **Login Route Bounce**       | Log in successfully > Manually type `/login` in URL bar               | Middleware intercepts, instantly redirects back to `/`    | [ ]    |
| **Session Expiry / Cleared** | Log in > Open Dev Tools > Application > Delete cookies > Refresh page | Middleware detects missing session, redirects to `/login` | [ ]    |
