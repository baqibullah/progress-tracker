"use client";

import { fromISODate, getDayAbbrev } from "@/lib/dateUtils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import EditGoalDialog from "./EditGoalDialog";
import GoalCheckbox from "./GoalCheckbox";

interface GoalGridRowProps {
  goalId: string;
  title: string;
  weeks: string[][];
  isDone: (date: string) => boolean;
  onToggle: (date: string) => void;
  onDelete?: () => void;
  onEdit?: (newTitle: string) => void;
  readOnly?: boolean;
  highlightedWeek?: number | null;
}

export default function GoalGridRow({
  goalId,
  title,
  weeks,
  isDone,
  onToggle,
  onDelete,
  onEdit,
  readOnly,
  highlightedWeek,
}: GoalGridRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: goalId, disabled: readOnly });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-start border-b border-undone/50 py-2"
    >
      <div className="flex w-56 shrink-0 items-start gap-1.5 pr-4">
        {!readOnly && (
          <button
            type="button"
            {...attributes}
            {...listeners}
            aria-label={`Reorder ${title}`}
            className="mt-0.5 cursor-grab touch-none text-ink/0 group-hover:text-ink/30 hover:text-ink/60! active:cursor-grabbing"
          >
            ⠿
          </button>
        )}

        <div className="min-w-0 flex-1">
          <div
            title={title}
            className="line-clamp-2 font-body text-sm leading-tight text-ink"
          >
            {title}
          </div>
          {!readOnly && (
            <div className="mt-0.5 flex gap-2">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => {
                    setEditValue(title);
                    setEditOpen(true);
                  }}
                  aria-label={`Edit ${title}`}
                  className="cursor-pointer font-mono text-[12px] text-ink/80 hover:text-ink"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  aria-label={`Delete ${title}`}
                  className="cursor-pointer font-mono text-[12px] text-ink/80 hover:text-red-900"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
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
      <EditGoalDialog
        open={editOpen}
        value={editValue}
        onChange={setEditValue}
        onSave={() => {
          const trimmed = editValue.trim();
          if (trimmed && trimmed !== title) onEdit?.(trimmed);
          setEditOpen(false);
        }}
        onCancel={() => setEditOpen(false)}
      />
    </div>
  );
}
