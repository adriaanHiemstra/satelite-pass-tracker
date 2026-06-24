"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Login action: authenticates a user with email and password.
 * On error, redirects back to login with an error message in the URL.
 * On success, clears the cache and redirects to the home page.
 */
export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Validate that both fields are provided
  if (!email || !password) {
    redirect("/login?message=Email and password are required");
  }

  const supabase = await createClient();

  // Attempt to sign in the user
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If authentication fails, redirect back to login with the error message
  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  // Revalidate the layout to update the session state across the app
  revalidatePath("/", "layout");

  // Redirect to the home page on successful login
  redirect("/");
}

/**
 * Signup action: creates a new user account with email and password.
 * On error, redirects back to login with an error message in the URL.
 * On success, clears the cache and redirects to the home page.
 */
export async function signup(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Validate that both fields are provided
  if (!email || !password) {
    redirect("/login?message=Email and password are required");
  }

  const supabase = await createClient();

  // Attempt to create a new user account
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  // If signup fails, redirect back to login with the error message
  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  // Revalidate the layout to update the session state across the app
  revalidatePath("/", "layout");

  // Redirect to the home page on successful signup
  redirect("/");
}

/**
 * Sign out action: ends the current user's session.
 * Clears the Supabase auth cookies and sends the user back to the login page.
 */
export async function signOut() {
  const supabase = await createClient();

  // Clear the session server-side (removes the auth cookies)
  await supabase.auth.signOut();

  // Revalidate the layout so the app re-renders as logged out
  revalidatePath("/", "layout");

  // Send the user to the login page
  redirect("/login");
}
