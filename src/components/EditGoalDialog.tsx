"use client";

interface EditGoalDialogProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditGoalDialog({
  open,
  value,
  onChange,
  onSave,
  onCancel,
}: EditGoalDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 px-4">
      <div className="paper-card w-full max-w-sm rounded-sm px-6 py-5">
        <h2 className="font-display text-lg text-ink mb-3">Edit goal</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
            if (e.key === "Escape") onCancel();
          }}
          className="w-full rounded-sm border border-undone bg-transparent px-3 py-2 text-sm text-ink focus:outline-none focus:border-done"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-sm border border-undone px-3 py-1.5 text-sm text-ink/85 hover:border-ink/40 hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="cursor-pointer rounded-sm bg-ink px-3 py-1.5 text-sm text-paper hover:bg-ink/80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
