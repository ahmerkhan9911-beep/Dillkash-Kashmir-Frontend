import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles, TicketPercent, Copy, Check, Percent } from "lucide-react";
import {
  getPromoCodes,
  createPromoCode,
  setPromoCodeActive,
  type PromoCode,
} from "@/services/promo-codes";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/promo-codes/")({
  component: AdminPromoCodes,
});

const CODE_PATTERN = /^[A-Z0-9_-]{3,30}$/;

function AdminPromoCodes() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  /* Form state */
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [formErrors, setFormErrors] = useState<{ code?: string; discount?: string }>({});
  const [saving, setSaving] = useState(false);

  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getPromoCodes()
      .then(setPromoCodes)
      .catch((err) => flash(err instanceof Error ? err.message : "Failed to load promo codes", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flash = (msg: string, type: "success" | "error" = "success") => {
    setMessageType(type);
    setMessage(msg);
    setTimeout(() => setMessage(""), type === "error" ? 4500 : 3000);
  };

  const stats = useMemo(() => {
    const active = promoCodes.filter((p) => p.isActive).length;
    return { total: promoCodes.length, active, inactive: promoCodes.length - active };
  }, [promoCodes]);

  /* ── Create ── */

  const validate = () => {
    const err: typeof formErrors = {};
    const normalized = code.trim().toUpperCase();
    const pct = Number(discount);
    if (!normalized) err.code = "Promo code name is required";
    else if (!CODE_PATTERN.test(normalized))
      err.code = "3–30 characters: letters, numbers, - or _";
    if (discount === "") err.discount = "Discount is required";
    else if (!Number.isInteger(pct) || pct < 1 || pct > 100)
      err.discount = "Enter a whole number from 1 to 100";
    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleGenerate = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const created = await createPromoCode(code.trim().toUpperCase(), Number(discount));
      setPromoCodes((prev) => [created, ...prev]);
      setCode("");
      setDiscount("");
      setFormErrors({});
      flash(`Promo code ${created.code} (${created.discountPercent}% off) generated`);
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to create promo code", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ── Toggle ── */

  const handleToggle = async (promo: PromoCode, next: boolean) => {
    setTogglingId(promo.id);
    // Optimistic update
    setPromoCodes((prev) => prev.map((p) => (p.id === promo.id ? { ...p, isActive: next } : p)));
    try {
      const updated = await setPromoCodeActive(promo.id, next);
      setPromoCodes((prev) => prev.map((p) => (p.id === promo.id ? updated : p)));
      flash(`${updated.code} ${updated.isActive ? "activated" : "deactivated"}`);
    } catch (err) {
      // Roll back
      setPromoCodes((prev) => prev.map((p) => (p.id === promo.id ? { ...p, isActive: !next } : p)));
      flash(err instanceof Error ? err.message : "Failed to update promo code", "error");
    } finally {
      setTogglingId(null);
    }
  };

  const handleCopy = async (promo: PromoCode) => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopiedId(promo.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard may be unavailable — ignore */
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
      hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Promo Codes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create discount codes customers can apply at checkout in the booking form.
          </p>
        </div>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="rounded-full bg-muted px-3 py-1.5 text-muted-foreground">
            {stats.total} total
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-700">
            {stats.active} active
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-zinc-600">
            {stats.inactive} inactive
          </span>
        </div>
      </div>

      {/* ── Toast ── */}
      {message && (
        <div
          role="status"
          className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
            messageType === "error"
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* ── Generate form ── */}
      <form
        onSubmit={handleGenerate}
        noValidate
        className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-heading text-base font-bold text-foreground">Generate a new code</h2>
            <p className="text-xs text-muted-foreground">Codes are case-insensitive and saved in uppercase.</p>
          </div>
        </div>

        <div className="relative grid gap-4 md:grid-cols-[1fr_200px_auto] md:items-start">
          <div>
            <label htmlFor="promo-code" className="mb-1.5 block text-sm font-semibold text-foreground">
              Promo Code Name
            </label>
            <input
              id="promo-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s+/g, ""))}
              placeholder="e.g. HBA10"
              maxLength={30}
              autoComplete="off"
              className={cn(inputCls(formErrors.code), "font-mono tracking-wider uppercase")}
              disabled={saving}
            />
            {formErrors.code && <p className="mt-1 text-xs font-medium text-destructive">{formErrors.code}</p>}
          </div>

          <div>
            <label htmlFor="promo-discount" className="mb-1.5 block text-sm font-semibold text-foreground">
              Discount %
            </label>
            <div className="relative">
              <input
                id="promo-discount"
                type="number"
                min={1}
                max={100}
                step={1}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g. 10"
                className={cn(inputCls(formErrors.discount), "pr-10")}
                disabled={saving}
              />
              <Percent size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            {formErrors.discount && (
              <p className="mt-1 text-xs font-medium text-destructive">{formErrors.discount}</p>
            )}
          </div>

          <div className="md:pt-[26px]">
            <button
              id="promo-generate"
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 md:w-auto"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <TicketPercent size={16} />}
              {saving ? "Generating…" : "Generate Code"}
            </button>
          </div>
        </div>
      </form>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : promoCodes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted">
            <TicketPercent size={24} className="text-muted-foreground" />
          </div>
          <p className="font-heading text-base font-bold text-foreground">No promo codes yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Generate your first code using the form above.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Code</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Discount</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {promoCodes.map((p) => (
                  <tr key={p.id} className={cn("transition-colors hover:bg-muted/30", !p.isActive && "opacity-70")}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg border border-dashed border-emerald-400/70 bg-emerald-50 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-emerald-800">
                          {p.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(p)}
                          title="Copy code"
                          aria-label={`Copy ${p.code}`}
                          className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          {copiedId === p.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                        {p.discountPercent}% OFF
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <label className="inline-flex cursor-pointer items-center gap-2.5">
                        <Switch
                          id={`promo-toggle-${p.id}`}
                          checked={p.isActive}
                          disabled={togglingId === p.id}
                          onCheckedChange={(checked) => handleToggle(p, checked)}
                          className="data-[state=checked]:bg-emerald-600"
                          aria-label={`Toggle ${p.code}`}
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            p.isActive ? "text-emerald-700" : "text-muted-foreground"
                          )}
                        >
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
