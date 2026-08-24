"use client";

import CompletionChart from "@/components/CompletionChart";
import GoalGrid from "@/components/GoalGrid";
import MonthHeatmap from "@/components/MonthHeatmap";
import StatsBar from "@/components/StatsBar";
import { getMonthWeeksStrict } from "@/lib/dateUtils";
import { computeCompletionByDate, generateMockGrid } from "@/lib/mockData";
import { useGoalGrid } from "@/lib/useGoalGrid";
import { useMemo } from "react";

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const initial = useMemo(() => generateMockGrid(year, month), [year, month]);
  const { templates, completions, isDone, toggle, addTemplate } = useGoalGrid(
    initial.templates,
    initial.completions,
  );

  const weeks = useMemo(() => getMonthWeeksStrict(year, month), [year, month]);

  const completionByDate = useMemo(
    () => computeCompletionByDate(templates, completions),
    [templates, completions],
  );

  const completionPct = useMemo(() => {
    const ratios = Object.values(completionByDate);
    if (ratios.length === 0) return 0;
    return Math.round(
      (ratios.reduce((a, b) => a + b, 0) / ratios.length) * 100,
    );
  }, [completionByDate]);

  const chartData = useMemo(() => {
    return Object.entries(completionByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, ratio]) => ({ date, completion: Math.round(ratio * 100) }));
  }, [completionByDate]);

  return (
    <main className="mx-auto max-w-6xl px-8 py-12">
      <h1 className="font-display text-3xl text-ink">Progress</h1>
      <p className="mb-8 text-sm text-ink/50">
        {today.toLocaleString("default", { month: "long", year: "numeric" })}
      </p>

      <div className="mb-8">
        <StatsBar completionPct={completionPct} currentStreak={4} />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <CompletionChart data={chartData} />
        <MonthHeatmap
          year={year}
          month={month}
          completionByDate={completionByDate}
          onDayClick={() => {}}
        />
      </div>

      <GoalGrid
        templates={templates}
        weeks={weeks}
        isDone={isDone}
        onToggle={toggle}
        onAddGoal={addTemplate}
      />
    </main>
  );
}
