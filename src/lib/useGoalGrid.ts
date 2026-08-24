"use client";

import { useState, useCallback } from "react";
import type { GoalTemplate, Completion } from "./types";

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

  const addTemplate = useCallback((title: string) => {
    setTemplates((prev) => [...prev, { id: crypto.randomUUID(), title }]);
  }, []);

  return { templates, completions, isDone, toggle, addTemplate };
}
