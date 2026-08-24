import { getDayAbbrev } from "@/lib/dateUtils";
import GoalCheckbox from "./GoalCheckbox";

interface GoalGridRowProps {
  title: string;
  weeks: string[][];
  isDone: (date: string) => boolean;
  onToggle: (date: string) => void;
}

export default function GoalGridRow({
  title,
  weeks,
  isDone,
  onToggle,
}: GoalGridRowProps) {
  return (
    <div className="flex items-center border-b border-undone/50 py-2">
      <div className="w-40 shrink-0 pr-4 font-body text-sm text-ink">
        {title}
      </div>
      <div className="flex gap-6">
        {weeks.map((weekDates, wi) => (
          <div key={wi} className="flex gap-1.5">
            {weekDates.map((date) => (
              <div key={date} className="flex flex-col items-center gap-1">
                <span className="font-mono text-[10px] text-ink/30">
                  {getDayAbbrev(date)}
                </span>
                <GoalCheckbox
                  checked={isDone(date)}
                  onToggle={() => onToggle(date)}
                  label={`${title} - ${date}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
