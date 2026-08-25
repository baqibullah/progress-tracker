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
  onDeleteGoal?: (goalId: string) => void;
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
  onDeleteGoal,
  highlightedWeek,
}: GoalGridProps) {
  return (
    <div>
      {!readOnly && onAddGoal && (
        <div className="max-w-xs pb-3">
          <AddGoalInput onAdd={onAddGoal} />
        </div>
      )}
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
              onDelete={() => onDeleteGoal?.(goal.id)}
              readOnly={readOnly}
              highlightedWeek={highlightedWeek}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
