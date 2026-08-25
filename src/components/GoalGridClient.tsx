"use client";

import { addGoalTemplate, toggleCompletion } from "@/app/goals/actions";
import type { Completion, GoalTemplate } from "@/lib/types";
import { useGoalGrid } from "@/lib/useGoalGrid";
import GoalGrid from "./GoalGrid";

export default function GoalGridClient({
  initialTemplates,
  initialCompletions,
  weeks,
  highlightedWeek,
}: {
  initialTemplates: GoalTemplate[];
  initialCompletions: Completion[];
  weeks: string[][];
  highlightedWeek?: number | null;
}) {
  const { templates, isDone, toggle, addTemplate, replaceTemplateId } =
    useGoalGrid(initialTemplates, initialCompletions);

  async function handleToggle(goalId: string, date: string) {
    toggle(goalId, date);
    await toggleCompletion(goalId, date);
  }

  async function handleAdd(title: string) {
    const tempId = crypto.randomUUID();
    addTemplate(title, tempId);
    const real = await addGoalTemplate(title);
    replaceTemplateId(tempId, real);
  }

  return (
    <GoalGrid
      templates={templates}
      weeks={weeks}
      isDone={isDone}
      onToggle={handleToggle}
      onAddGoal={handleAdd}
      highlightedWeek={highlightedWeek}
    />
  );
}
