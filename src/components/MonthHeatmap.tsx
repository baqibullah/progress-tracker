"use client";

import { formatWeekLabel, getMonthWeeks, toISODate } from "@/lib/dateUtils";
import WeekRow from "./WeekRow";

interface MonthHeatmapProps {
  year: number;
  month: number;
  completionByDate: Record<string, number>;
  onDayClick?: (date: string) => void;
}

export default function MonthHeatmap({
  year,
  month,
  completionByDate,
  onDayClick,
}: MonthHeatmapProps) {
  const weeks = getMonthWeeks(year, month);
  const today = toISODate(new Date());

  return (
    <div className="flex flex-col gap-2">
      {weeks.map((weekDates, i) => (
        <WeekRow
          key={i}
          weekLabel={formatWeekLabel(i)}
          todayDate={today}
          onDayClick={onDayClick}
          days={weekDates
            .filter((d) => d !== "")
            .map((date) => ({
              date,
              completionRatio: completionByDate[date] ?? 0,
            }))}
        />
      ))}
    </div>
  );
}
