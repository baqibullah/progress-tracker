"use client";

import { logout } from "@/app/login/actions";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => logout())}
      className="cursor-pointer rounded-sm border border-undone px-3 py-1.5 text-sm text-ink/85 transition-colors hover:border-ink/40 hover:text-ink disabled:opacity-50 flex items-center gap-1.5"
    >
      {isPending && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
      )}
      {isPending ? "Logging out..." : "Log out"}
    </button>
  );
}
