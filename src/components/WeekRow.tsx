import DayCell from "./DayCell";

interface WeekDay {
  date: string;
  completionRatio: number;
}

interface WeekRowProps {
  days: WeekDay[];
  weekLabel: string;
  todayDate?: string;
  isSelected?: boolean;
  onDayClick?: (date: string) => void;
}

export default function WeekRow({
  days,
  weekLabel,
  todayDate,
  onDayClick,
  isSelected,
}: WeekRowProps) {
  return (
    <div className="relative flex w-full items-center gap-3 rounded-sm px-1 py-0.5">
      {isSelected && (
        <div className="absolute inset-0 -z-10 rounded-sm bg-streak/10" />
      )}
      <span className="w-16 shrink-0 font-mono text-xs text-ink/40">
        {weekLabel}
      </span>
      <div className="flex gap-1.5">
        {days.map((day) => (
          <DayCell
            key={day.date}
            date={day.date}
            completionRatio={day.completionRatio}
            isToday={day.date === todayDate}
            onClick={() => onDayClick?.(day.date)}
          />
        ))}
      </div>
    </div>
  );
}
