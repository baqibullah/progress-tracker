"use client";

import type { GoalTemplate } from "@/lib/types";
import AddGoalInput from "./AddGoalInput";
import GoalGridHeader from "./GoalGridHeader";
import GoalGridRow from "./GoalGridRow";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface GoalGridProps {
  templates: GoalTemplate[];
  weeks: string[][];
  isDone: (goalId: string, date: string) => boolean;
  onToggle?: (goalId: string, date: string) => void;
  onAddGoal?: (title: string) => void;
  onDeleteGoal?: (goalId: string) => void;
  onEditGoal?: (goalId: string, title: string) => void;
  onReorderGoals?: (orderedIds: string[]) => void;
  readOnly?: boolean;
  highlightedWeek?: number | null;
}

export default function GoalGrid({
  templates,
  weeks,
  isDone,
  onToggle,
  onAddGoal,
  readOnly,
  onDeleteGoal,
  onEditGoal,
  onReorderGoals,
  highlightedWeek,
}: GoalGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = templates.findIndex((t) => t.id === active.id);
    const newIndex = templates.findIndex((t) => t.id === over.id);
    const reordered = arrayMove(templates, oldIndex, newIndex);
    onReorderGoals?.(reordered.map((t) => t.id));
  }

  return (
    <div>
      {!readOnly && onAddGoal && (
        <div className="max-w-xs pb-3">
          <AddGoalInput onAdd={onAddGoal} />
        </div>
      )}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <GoalGridHeader weeks={weeks} />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={templates.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {templates.map((goal) => (
                <GoalGridRow
                  key={goal.id}
                  goalId={goal.id}
                  title={goal.title}
                  weeks={weeks}
                  isDone={(date) => isDone(goal.id, date)}
                  onToggle={(date) => onToggle?.(goal.id, date)}
                  onDelete={() => onDeleteGoal?.(goal.id)}
                  onEdit={(newTitle) => onEditGoal?.(goal.id, newTitle)}
                  readOnly={readOnly}
                  highlightedWeek={highlightedWeek}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
