"use client";

import GoalCheckbox from "./GoalCheckbox";

interface GoalItemProps {
  title: string;
  notes?: string;
  checked: boolean;
  onToggle: () => void;
}

export default function GoalItem({
  title,
  notes,
  checked,
  onToggle,
}: GoalItemProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <GoalCheckbox checked={checked} onToggle={onToggle} label={title} />
      <div className="min-w-0">
        <p
          className={`font-body text-sm leading-snug transition-colors ${
            checked ? "text-ink/50 line-through" : "text-ink"
          }`}
        >
          {title}
        </p>
        {notes && (
          <p className="mt-0.5 text-xs text-ink/40 leading-snug">{notes}</p>
        )}
      </div>
    </div>
  );
}
