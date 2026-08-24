"use client";

import { useState } from "react";

interface AddGoalInputProps {
  onAdd: (title: string) => void;
}

export default function AddGoalInput({ onAdd }: AddGoalInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a goal for today..."
        className="flex-1 rounded-sm border border-undone bg-transparent px-3 py-1.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-done"
      />
      <button
        type="submit"
        className="rounded-sm bg-ink px-3 py-1.5 text-sm text-paper hover:bg-ink/80"
      >
        Add
      </button>
    </form>
  );
}
