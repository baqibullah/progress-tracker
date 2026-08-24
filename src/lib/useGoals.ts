"use client";

import { useState, useCallback } from "react";
import type { Goal } from "./types";

export function useGoals(initialGoals: Goal[]) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const toggleGoal = useCallback((id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g))
    );
  }, []);

  const addGoal = useCallback((date: string, title: string) => {
    setGoals((prev) => [
      ...prev,
      { id: `${date}-${crypto.randomUUID()}`, date, title, isCompleted: false },
    ]);
  }, []);

  return { goals, toggleGoal, addGoal };
}
