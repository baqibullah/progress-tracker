"use client";

import {
  addGoalTemplate,
  deleteGoalTemplate,
  reorderGoalTemplates,
  toggleCompletion,
  updateGoalTemplate,
} from "@/app/goals/actions";
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
  const {
    templates,
    isDone,
    toggle,
    addTemplate,
    replaceTemplateId,
    deleteTemplate,
    editTemplate,
    reorderTemplates,
  } = useGoalGrid(initialTemplates, initialCompletions);

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

  async function handleDelete(goalId: string) {
    deleteTemplate(goalId);
    await deleteGoalTemplate(goalId);
  }

  async function handleEdit(goalId: string, title: string) {
    editTemplate(goalId, title);
    await updateGoalTemplate(goalId, title);
  }
  async function handleReorder(orderedIds: string[]) {
    reorderTemplates(orderedIds);
    await reorderGoalTemplates(
      orderedIds.map((id, i) => ({ id, position: i })),
    );
  }

  return (
    <GoalGrid
      templates={templates}
      weeks={weeks}
      isDone={isDone}
      onToggle={handleToggle}
      onAddGoal={handleAdd}
      onDeleteGoal={handleDelete}
      onEditGoal={handleEdit}
      onReorderGoals={handleReorder}
      highlightedWeek={highlightedWeek}
    />
  );
}
