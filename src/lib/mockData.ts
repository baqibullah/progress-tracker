import { toISODate } from "./dateUtils";
import type { Goal } from "./types";

const sampleTitles = [
  "Morning run",
  "Read 20 pages",
  "Ship one PR",
  "Study linear algebra",
  "No sugar today",
  "Journal",
  "Practice guitar",
];

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateMockGoals(year: number, month: number): Goal[] {
  const rand = mulberry32(year * 100 + month);
  const goals: Goal[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date > today) continue;

    const numGoals = 2 + Math.floor(rand() * 2);
    for (let i = 0; i < numGoals; i++) {
      goals.push({
        id: `${toISODate(date)}-${i}`,
        date: toISODate(date),
        title: sampleTitles[Math.floor(rand() * sampleTitles.length)],
        isCompleted: rand() > 0.35,
      });
    }
  }

  return goals;
}

export function computeCompletionByDate(goals: Goal[]): Record<string, number> {
  const byDate: Record<string, { done: number; total: number }> = {};

  for (const goal of goals) {
    if (!byDate[goal.date]) byDate[goal.date] = { done: 0, total: 0 };
    byDate[goal.date].total += 1;
    if (goal.isCompleted) byDate[goal.date].done += 1;
  }

  const result: Record<string, number> = {};
  for (const [date, { done, total }] of Object.entries(byDate)) {
    result[date] = total > 0 ? done / total : 0;
  }
  return result;
}
