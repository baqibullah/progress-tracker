"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { login, signup } from "./actions";

function SubmitButton({ mode }: { mode: "signin" | "signup" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-sm bg-ink px-3 py-2 text-sm text-paper hover:bg-ink/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
      )}
      {pending
        ? mode === "signin"
          ? "Signing in..."
          : "Creating account..."
        : mode === "signin"
          ? "Sign in"
          : "Sign up"}
    </button>
  );
}

export default function LoginForm() {
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
          <SubmitButton mode={mode} />
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
