import { toISODate } from "./dateUtils";
import type { Completion, GoalTemplate } from "./types";

export function computeCompletionByDate(
  templates: GoalTemplate[],
  completions: Completion[],
) {
  const total = templates.length;
  const doneByDate: Record<string, number> = {};

  for (const c of completions) {
    if (c.isCompleted) doneByDate[c.date] = (doneByDate[c.date] ?? 0) + 1;
  }

  const result: Record<string, number> = {};
  for (const [date, done] of Object.entries(doneByDate)) {
    result[date] = total > 0 ? done / total : 0;
  }
  return result;
}

export function computeCurrentStreak(
  completions: Completion[],
  today: Date = new Date(),
): number {
  const doneDates = new Set(
    completions.filter((c) => c.isCompleted).map((c) => c.date),
  );

  let streak = 0;
  const cursor = new Date(today);

  // If today has no completions yet, start counting from yesterday instead
  // so an incomplete "today" doesn't zero out an existing streak.
  if (!doneDates.has(toISODate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (doneDates.has(toISODate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
