"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 px-4">
      <div className="paper-card w-full max-w-sm rounded-sm bg-paper p-5">
        <h2 className="font-display text-lg text-ink">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-ink/60">{description}</p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-sm border border-undone px-3 py-1.5 text-sm text-ink/85 hover:border-ink/40 hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-sm border border-red-800/40 bg-red-800/10 px-3 py-1.5 text-sm text-red-900 hover:bg-red-800/20"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
