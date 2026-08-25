"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <div className="paper-card rounded-sm px-6 py-8">
        <h1 className="font-display text-2xl text-ink mb-1">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mb-6 text-sm text-ink/50">
          {mode === "signin"
            ? "Welcome back."
            : "Track your progress, one day at a time."}
        </p>

        {error && (
          <p className="mb-4 rounded-sm border border-streak/40 bg-streak/10 px-3 py-2 text-sm text-ink">
            {error}
          </p>
        )}

        <form
          action={mode === "signin" ? login : signup}
          className="flex flex-col gap-3"
        >
          {mode === "signup" && (
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
              className="rounded-sm border border-undone bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-done"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="rounded-sm border border-undone bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-done"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            className="rounded-sm border border-undone bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-done"
          />

          <button
            type="submit"
            className="mt-2 rounded-sm bg-ink px-3 py-2 text-sm text-paper hover:bg-ink/80"
          >
            {mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-sm text-ink/50 hover:text-ink"
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
