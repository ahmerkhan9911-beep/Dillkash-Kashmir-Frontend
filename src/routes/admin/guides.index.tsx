import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  UserCheck,
  X,
} from "lucide-react";
import {
  getAllGuidesAdmin,
  createGuide,
  updateGuide,
  deleteGuide as deleteGuideApi,
} from "@/services/guides";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Guide } from "@/data/guides";
import { resolveImageUrl } from "@/lib/resolveImage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/guides/")(  {
  component: AdminGuides,
});

/* ─── Form shape used by the Add / Edit modal ─── */

interface GuideFormData {
  name: string;
  role: string;
  experience: number;
  bio: string;
  imageUrl: string;
}

const emptyForm: GuideFormData = {
  name: "",
  role: "",
  experience: 1,
  bio: "",
  imageUrl: "",
};

/* ─── Component ─── */

function AdminGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  /* Delete state */
  const [deleteTarget, setDeleteTarget] = useState<Guide | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* Modal state */
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<GuideFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof GuideFormData, string>>>({});

  /* ── Data loading ── */

  const load = () => {
    setLoading(true);
    getAllGuidesAdmin()
      .then(setGuides)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  /* ── Delete handler ── */

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteGuideApi(deleteTarget.id);
      setMessage(`"${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      load();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ── Modal handlers ── */

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (guide: Guide) => {
    setEditingId(guide.id);
    setForm({
      name: guide.name,
      role: guide.role,
      experience: guide.experience,
      bio: guide.bio,
      imageUrl: guide.imageUrl,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
    setUploading(false);
  };

  const validateForm = (): boolean => {
    const err: Partial<Record<keyof GuideFormData, string>> = {};
    if (form.name.trim().length < 2) err.name = "Name is required";
    if (form.role.trim().length < 2) err.role = "Role is required";
    if (form.experience < 1) err.experience = "At least 1 year";
    if (form.bio.trim().length < 10) err.bio = "Bio must be at least 10 characters";
    if (form.bio.length > 150) err.bio = "Bio must be 150 characters or less";
    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateGuide(editingId, { ...form });
        setMessage("Guide updated successfully");
      } else {
        await createGuide({ ...form, is_active: true });
        setMessage("Guide created successfully");
      }
      closeModal();
      load();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ── Input helper ── */

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
      hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Tour Guides
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage tour guide profiles displayed on the public About page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02]"
        >
          <Plus size={18} /> Add New Guide
        </button>
      </div>

      {/* ── Success message ── */}
      {message && (
        <div className="mb-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {message}
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : guides.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted">
            <UserCheck size={24} className="text-muted-foreground" />
          </div>
          <p className="font-heading text-base font-bold text-foreground">
            No tour guides yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first guide to get started.
          </p>
          <button
            onClick={openCreate}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white"
          >
            <Plus size={16} /> Add Guide
          </button>
        </div>
      ) : (
        /* ── Guides List ── */
        <div className="grid gap-4">
          {/* Desktop table header */}
          <div className="hidden rounded-xl bg-muted/50 px-4 py-2.5 md:grid md:grid-cols-[64px_1fr_140px_100px_120px] md:items-center md:gap-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Photo
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Name &amp; Bio
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Role
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Experience
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-right">
              Actions
            </span>
          </div>

          {guides.map((guide) => (
            <div
              key={guide.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center md:grid md:grid-cols-[64px_1fr_140px_100px_120px] md:gap-4 md:p-3"
            >
              {/* Thumbnail */}
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                <img
                  src={resolveImageUrl(guide.imageUrl)}
                  alt={guide.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name & Bio */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-heading text-sm font-bold text-foreground">
                  {guide.name}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {guide.bio}
                </p>
              </div>

              {/* Role */}
              <div className="text-sm font-semibold text-foreground">
                {guide.role}
              </div>

              {/* Experience */}
              <div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  {guide.experience}+ Years
                </span>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(guide)}
                  title="Edit"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => setDeleteTarget(guide)}
                  title="Delete"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete Dialog ── */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        title={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {editingId ? "Edit Guide" : "Add New Guide"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {editingId
                    ? "Update the guide's profile information."
                    : "Fill in the details to add a new tour guide."}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-secondary"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="grid gap-4">
              {/* Name */}
              <div>
                <label htmlFor="g-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Full Name
                </label>
                <input
                  id="g-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ali Raza"
                  className={inputCls(formErrors.name)}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs font-medium text-destructive">{formErrors.name}</p>
                )}
              </div>

              {/* Role + Experience row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="g-role" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Role / Designation
                  </label>
                  <input
                    id="g-role"
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Trekking Expert"
                    className={inputCls(formErrors.role)}
                  />
                  {formErrors.role && (
                    <p className="mt-1 text-xs font-medium text-destructive">{formErrors.role}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="g-exp" className="mb-1.5 block text-sm font-semibold text-foreground">
                    Years of Experience
                  </label>
                  <input
                    id="g-exp"
                    type="number"
                    min={1}
                    max={50}
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })}
                    className={inputCls(formErrors.experience)}
                  />
                  {formErrors.experience && (
                    <p className="mt-1 text-xs font-medium text-destructive">{formErrors.experience}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="g-bio" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Short Bio
                </label>
                <textarea
                  id="g-bio"
                  rows={3}
                  maxLength={150}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="A brief description of the guide's expertise and personality…"
                  className={inputCls(formErrors.bio)}
                />
                <div className="mt-1 flex items-center justify-between">
                  {formErrors.bio ? (
                    <p className="text-xs font-medium text-destructive">{formErrors.bio}</p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={cn(
                      "text-xs",
                      form.bio.length > 150 ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {form.bio.length}/150
                  </span>
                </div>
              </div>

              {/* Profile Picture Upload */}
              <ImageUploader
                label="Upload Profile Picture"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                onUploadingChange={setUploading}
              />
              <p className="-mt-2 text-xs text-muted-foreground">
                Recommended size: 500×500 px (JPG / PNG / WebP, max 5 MB)
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {saving ? "Saving…" : uploading ? "Uploading…" : "Save Guide"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
