"use client";

import type { GoalTemplate } from "@/lib/types";
import AddGoalInput from "./AddGoalInput";
import GoalGridHeader from "./GoalGridHeader";
import GoalGridRow from "./GoalGridRow";

interface GoalGridProps {
  templates: GoalTemplate[];
  weeks: string[][];
  isDone: (goalId: string, date: string) => boolean;
  onToggle?: (goalId: string, date: string) => void;
  onAddGoal?: (title: string) => void;
  readOnly?: boolean;
  highlightedWeek?: number | null;
}

export default function GoalGrid({
  templates,
  weeks,
  isDone,
  onToggle,
  onAddGoal,
  readOnly,
  highlightedWeek,
}: GoalGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <GoalGridHeader weeks={weeks} />
        {templates.map((goal) => (
          <GoalGridRow
            key={goal.id}
            title={goal.title}
            weeks={weeks}
            isDone={(date) => isDone(goal.id, date)}
            onToggle={(date) => onToggle?.(goal.id, date)}
            readOnly={readOnly}
            highlightedWeek={highlightedWeek}
          />
        ))}

        {!readOnly && onAddGoal && (
          <div className="max-w-xs pt-3">
            <AddGoalInput onAdd={onAddGoal} />
          </div>
        )}
      </div>
    </div>
  );
}
