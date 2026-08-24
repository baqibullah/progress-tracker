"use client";

import MonthHeatmap from "@/components/MonthHeatmap";
import StatsBar from "@/components/StatsBar";
import { computeCompletionByDate, generateMockGoals } from "@/lib/mockData";
import { useMemo } from "react";

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const goals = useMemo(() => generateMockGoals(year, month), [year, month]);
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

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">Progress</h1>
      <p className="mb-8 text-sm text-ink/50">
        {today.toLocaleString("default", { month: "long", year: "numeric" })}
      </p>

      <div className="mb-8">
        <StatsBar completionPct={completionPct} currentStreak={4} />
      </div>

      <MonthHeatmap
        year={year}
        month={month}
        completionByDate={completionByDate}
      />
    </main>
  );
}
