"use client";

import { useCallback, useState } from "react";
import type { Completion, GoalTemplate } from "./types";

export function useGoalGrid(
  initialTemplates: GoalTemplate[],
  initialCompletions: Completion[],
) {
  const [templates, setTemplates] = useState<GoalTemplate[]>(initialTemplates);
  const [completions, setCompletions] =
    useState<Completion[]>(initialCompletions);

  const isDone = useCallback(
    (goalId: string, date: string) =>
      completions.find((c) => c.goalId === goalId && c.date === date)
        ?.isCompleted ?? false,
    [completions],
  );

  const toggle = useCallback((goalId: string, date: string) => {
    setCompletions((prev) => {
      const existing = prev.find((c) => c.goalId === goalId && c.date === date);
      if (existing) {
        return prev.map((c) =>
          c.goalId === goalId && c.date === date
            ? { ...c, isCompleted: !c.isCompleted }
            : c,
        );
      }
      return [...prev, { goalId, date, isCompleted: true }];
    });
  }, []);

  const addTemplate = useCallback((title: string, id?: string) => {
    setTemplates((prev) => [...prev, { id: id ?? crypto.randomUUID(), title }]);
  }, []);

  const replaceTemplateId = useCallback(
    (tempId: string, real: GoalTemplate) => {
      setTemplates((prev) => prev.map((t) => (t.id === tempId ? real : t)));
    },
    [],
  );

  return {
    templates,
    completions,
    isDone,
    toggle,
    addTemplate,
    replaceTemplateId,
  };
}
