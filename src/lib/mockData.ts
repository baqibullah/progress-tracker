import { getMonthWeeksStrict } from "./dateUtils";
import type { Completion, GoalTemplate } from "./types";

const sampleTitles = [
  "Morning run",
  "Read 20 pages",
  "Ship one PR",
  "No sugar today",
  "Journal",
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

export function generateMockGrid(year: number, month: number) {
  const rand = mulberry32(year * 100 + month);
  const templates: GoalTemplate[] = sampleTitles.map((title, i) => ({
    id: `tpl-${i}`,
    title,
  }));

  const weeks = getMonthWeeksStrict(year, month);
  const today = new Date();
  const completions: Completion[] = [];

  for (const week of weeks) {
    for (const date of week) {
      if (new Date(date) > today) continue;
      for (const tpl of templates) {
        if (rand() > 0.35) {
          completions.push({ goalId: tpl.id, date, isCompleted: true });
        }
      }
    }
  }

  return { templates, completions };
}

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
