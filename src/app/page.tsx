"use client";

import CompletionChart from "@/components/CompletionChart";
import DayPanel from "@/components/DayPanel";
import MonthHeatmap from "@/components/MonthHeatmap";
import StatsBar from "@/components/StatsBar";
import { toISODate } from "@/lib/dateUtils";
import { computeCompletionByDate, generateMockGoals } from "@/lib/mockData";
import { useGoals } from "@/lib/useGoals";
import { useMemo, useState } from "react";

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const initialGoals = useMemo(
    () => generateMockGoals(year, month),
    [year, month],
  );
  const { goals, toggleGoal, addGoal } = useGoals(initialGoals);

  const [selectedDate, setSelectedDate] = useState(toISODate(today));

  const completionByDate = useMemo(
    () => computeCompletionByDate(goals),
    [goals],
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

  const selectedDayGoals = goals.filter((g) => g.date === selectedDate);

  return (
    <main className="mx-auto max-w-6xl px-8 py-12">
      <h1 className="font-display text-3xl text-ink">Progress</h1>
      <p className="mb-8 text-sm text-ink/50">
        {today.toLocaleString("default", { month: "long", year: "numeric" })}
      </p>

      <div className="mb-8">
        <StatsBar completionPct={completionPct} currentStreak={4} />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-8">
            <CompletionChart data={chartData} />
          </div>
          <MonthHeatmap
            year={year}
            month={month}
            completionByDate={completionByDate}
            onDayClick={setSelectedDate}
          />
        </div>

        <DayPanel
          date={selectedDate}
          goals={selectedDayGoals}
          onToggle={toggleGoal}
          onAdd={(title) => addGoal(selectedDate, title)}
        />
      </div>
    </main>
  );
}
