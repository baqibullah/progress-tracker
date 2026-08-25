import { DAY_CELL_GAP, DAY_CELL_WIDTH } from "@/lib/gridLayout";

interface GoalGridHeaderProps {
  weeks: string[][];
}

export default function GoalGridHeader({ weeks }: GoalGridHeaderProps) {
  return (
    <div className="flex items-center pb-2">
      <div className="w-40 shrink-0" />
      <div className="flex gap-6">
        {weeks.map((weekDates, wi) => (
          <div
            key={wi}
            className="text-center font-mono text-xs text-ink/40"
            style={{
              width: `${weekDates.length * DAY_CELL_WIDTH + (weekDates.length - 1) * DAY_CELL_GAP}px`,
            }}
          >
            Week {wi + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
