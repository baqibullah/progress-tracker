import { fromISODate } from "@/lib/dateUtils";

interface DayCellProps {
  date: string;
  completionRatio: number;
  isToday?: boolean;
  onClick?: () => void;
}

export default function DayCell({
  date,
  completionRatio,
  isToday,
  onClick,
}: DayCellProps) {
  const day = fromISODate(date).getDate();

  const fillClass =
    completionRatio === 0
      ? "bg-undone/40"
      : completionRatio < 1
        ? "bg-streak/50"
        : "bg-done";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-9 w-9 items-center justify-center rounded-sm font-mono text-xs transition-colors ${fillClass} ${
        isToday ? "ring-2 ring-ink/60 ring-offset-1 ring-offset-paper" : ""
      } ${completionRatio === 1 ? "text-paper" : "text-ink/70"}`}
    >
      {day}
    </button>
  );
}
