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
              width: `${weekDates.length * 34 + (weekDates.length - 1) * 6}px`,
            }}
          >
            Week {wi + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
