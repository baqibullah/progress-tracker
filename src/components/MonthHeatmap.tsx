"use client";

import { formatWeekLabel, getMonthWeeks, toISODate } from "@/lib/dateUtils";
import WeekRow from "./WeekRow";

interface MonthHeatmapProps {
  year: number;
  month: number;
  completionByDate: Record<string, number>;
  onDaySelect?: (date: string) => void;
}

export default function MonthHeatmap({
  year,
  month,
  completionByDate,
  onDaySelect,
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
          onDayClick={onDaySelect}
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
