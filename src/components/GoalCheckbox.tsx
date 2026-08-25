"use client";

import { useState } from "react";

interface GoalCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
}

export default function GoalCheckbox({
  checked,
  onToggle,
  label,
  disabled,
}: GoalCheckboxProps) {
  const [justChecked, setJustChecked] = useState(false);

  function handleClick() {
    if (disabled) return;
    if (!checked) {
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 400);
    }
    onToggle();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={checked}
      aria-label={label ?? (checked ? "Mark as not done" : "Mark as done")}
      className={`relative h-6 w-6 shrink-0 rounded-sm border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-done ${
        checked
          ? "border-done bg-done/10"
          : "border-undone bg-transparent hover:border-ink/40"
      } ${disabled ? "cursor-default hover:border-undone" : "cursor-pointer"}`}
    >
      {checked && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`absolute inset-0 h-full w-full p-1 text-done ${
            justChecked ? "animate-tick" : ""
          }`}
        >
          <path
            d="M4 12.5L9.5 18L20 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={justChecked ? "1" : "0"}
          />
        </svg>
      )}
    </button>
  );
}
