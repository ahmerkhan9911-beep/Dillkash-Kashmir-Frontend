import { useState } from "react";
import { X } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteConfirmDialog({ open, title, onConfirm, onCancel, loading }: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Delete Package</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-secondary"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-destructive px-5 py-2.5 text-sm font-bold text-destructive-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
