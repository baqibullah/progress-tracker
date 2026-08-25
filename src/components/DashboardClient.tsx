"use client";

import { useMemo, useState } from "react";
import CompletionChart from "./CompletionChart";
import GoalGrid from "./GoalGrid";
import GoalGridClient from "./GoalGridClient";
import MonthHeatmap from "./MonthHeatmap";
import type { Completion, GoalTemplate } from "@/lib/types";

interface DashboardClientProps {
  weeks: string[][];
  year: number;
  month: number;
  completionByDate: Record<string, number>;
  chartData: { date: string; completion: number }[];
  templates: GoalTemplate[];
  completions: Completion[];
  variant: "editable" | "readonly";
}

export default function DashboardClient({
  weeks,
  year,
  month,
  completionByDate,
  chartData,
  templates,
  completions,
  variant,
}: DashboardClientProps) {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  function handleDaySelect(date: string) {
    const weekIndex = weeks.findIndex((weekDates) => weekDates.includes(date));
    if (weekIndex === -1) return;
    setSelectedWeek((prev) => (prev === weekIndex ? null : weekIndex));
  }

  const filteredChartData = useMemo(() => {
    if (selectedWeek === null) return chartData;
    const weekDates = new Set(weeks[selectedWeek]);
    return chartData.filter((d) => weekDates.has(d.date));
  }, [chartData, weeks, selectedWeek]);

  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <CompletionChart data={filteredChartData} />
        <MonthHeatmap
          year={year}
          month={month}
          completionByDate={completionByDate}
          onDaySelect={handleDaySelect}
          selectedWeek={selectedWeek}
        />
      </div>
      {variant === "editable" ? (
        <GoalGridClient
          weeks={weeks}
          initialTemplates={templates}
          initialCompletions={completions}
          highlightedWeek={selectedWeek}
        />
      ) : (
        <GoalGrid
          templates={templates}
          weeks={weeks}
          isDone={(goalId, date) =>
            completions.find((c) => c.goalId === goalId && c.date === date)
              ?.isCompleted ?? false
          }
          readOnly
          highlightedWeek={selectedWeek}
        />
      )}
    </>
  );
}
