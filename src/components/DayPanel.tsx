import type { Goal } from "@/lib/types";
import AddGoalInput from "./AddGoalInput";
import GoalItem from "./GoalItem";

interface DayPanelProps {
  date: string;
  goals: Goal[];
  onToggle: (id: string) => void;
  onAdd: (title: string) => void;
}

export default function DayPanel({
  date,
  goals,
  onToggle,
  onAdd,
}: DayPanelProps) {
  const label = new Date(date).toLocaleDateString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-sm border border-undone bg-paper p-4">
      <p className="font-display text-lg text-ink">{label}</p>
      <div className="mt-2 divide-y divide-undone/50">
        {goals.length === 0 && (
          <p className="py-2 text-sm text-ink/40">
            No goals yet — add one below.
          </p>
        )}
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            title={goal.title}
            notes={goal.notes}
            checked={goal.isCompleted}
            onToggle={() => onToggle(goal.id)}
          />
        ))}
      </div>
      <AddGoalInput onAdd={onAdd} />
    </div>
  );
}
