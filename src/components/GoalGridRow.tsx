"use client";

import { fromISODate, getDayAbbrev } from "@/lib/dateUtils";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import GoalCheckbox from "./GoalCheckbox";

interface GoalGridRowProps {
  title: string;
  weeks: string[][];
  isDone: (date: string) => boolean;
  onToggle: (date: string) => void;
  onDelete?: () => void;
  readOnly?: boolean;
  highlightedWeek?: number | null;
}

export default function GoalGridRow({
  title,
  weeks,
  isDone,
  onToggle,
  onDelete,
  readOnly,
  highlightedWeek,
}: GoalGridRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex items-center border-b border-undone/50 py-2">
      <div className="w-40 shrink-0 pr-4">
        <div className="truncate font-body text-sm text-ink">{title}</div>
        {!readOnly && onDelete && (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            aria-label={`Delete ${title}`}
            className="mt-0.5 cursor-pointer font-mono text-[12px] text-ink/80 hover:text-red-900"
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {weeks.map((weekDates, wi) => (
          <div
            key={wi}
            className={`flex gap-1.5 rounded-sm transition-colors ${
              wi === highlightedWeek ? "bg-streak/10" : ""
            }`}
          >
            {weekDates.map((date) => (
              <div key={date} className="flex flex-col items-center gap-1">
                <span className="font-mono text-[10px] text-ink/30">
                  {getDayAbbrev(date)}
                </span>
                <span className="font-mono text-[10px] text-ink/40">
                  {fromISODate(date).getDate()}
                </span>
                <GoalCheckbox
                  checked={isDone(date)}
                  onToggle={() => onToggle(date)}
                  label={`${title} - ${date}`}
                  disabled={readOnly}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={`Delete "${title}"?`}
        description="This removes the goal and all its checked-off days. This can't be undone."
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete?.();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
