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
