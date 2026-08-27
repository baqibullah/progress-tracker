"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Profile {
  id: string;
  username: string;
}

export default function UserSwitcher({
  profiles,
  currentUsername,
}: {
  profiles: Profile[];
  currentUsername: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const username = e.target.value;
    if (!username) return;
    startTransition(() => {
      router.push(username === currentUsername ? "/" : `/u/${username}`);
    });
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <select
        onChange={handleChange}
        value={currentUsername}
        disabled={isPending}
        className="rounded-sm border border-undone bg-transparent px-2 py-1 text-sm text-ink focus:outline-none focus:border-done disabled:opacity-50"
      >
        {profiles.map((p) => (
          <option key={p.id} value={p.username}>
            {p.username === currentUsername
              ? `${p.username} (you)`
              : p.username}
          </option>
        ))}
      </select>
      {isPending && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
      )}
    </div>
  );
}
