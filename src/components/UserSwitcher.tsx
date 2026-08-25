"use client";
import { useRouter } from "next/navigation";

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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const username = e.target.value;
    if (!username) return;
    router.push(username === currentUsername ? "/" : `/u/${username}`);
  }

  return (
    <select
      onChange={handleChange}
      value={currentUsername}
      className="rounded-sm border border-undone bg-transparent px-2 py-1 text-sm text-ink focus:outline-none focus:border-done"
    >
      {profiles.map((p) => (
        <option key={p.id} value={p.username}>
          {p.username === currentUsername ? `${p.username} (you)` : p.username}
        </option>
      ))}
    </select>
  );
}
