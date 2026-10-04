import { useEffect, useMemo, useState } from "react";
import { X, Loader2, CheckCircle2, LogIn, Tag, ChevronDown, BadgeCheck, AlertCircle } from "lucide-react";
import { tours as staticTours, whatsappLink, formatPKR, type Tour } from "@/data/site";
import { WhatsAppIcon } from "./Navbar";
import { submitBooking, type BookingPricing } from "@/services/bookings";
import { getPackages } from "@/services/packages";
import { validatePromoCode, calculateDiscount } from "@/services/promo-codes";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@tanstack/react-router";

const INVALID_PROMO_MESSAGE = "Invalid or expired promo code.";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedTour?: Tour | undefined;
}

interface FormState {
  tour: string;
  date: string;
  persons: number;
  room: string;
}

const initial: FormState = {
  tour: "",
  date: "",
  persons: 1,
  room: "Standard Double",
};

export function BookingModal({ open, onClose, preselectedTour }: BookingModalProps) {
  const { user, isAuthenticated } = useAuth();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedPricing, setConfirmedPricing] = useState<BookingPricing | null>(null);

  // ── Tour catalog: DB packages (same source the server prices from), static fallback ──
  const [tours, setTours] = useState<Tour[]>(staticTours);
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    getPackages()
      .then((pkgs) => {
        if (!cancelled && pkgs.length > 0) setTours(pkgs);
      })
      .catch(() => { /* keep static data */ });
    return () => {
      cancelled = true;
    };
  }, [open]);

  // ── Promo code state ──
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  // ── Dynamic price calculation ──
  const { adultPrice, totalPrice } = useMemo(() => {
    const selectedTour =
      tours.find((t) => t.title === form.tour) ??
      (preselectedTour?.title === form.tour ? preselectedTour : undefined);
    const isIslamabad = user?.city === "Islamabad";
    const adult = isIslamabad ? (selectedTour?.priceIslamabad ?? 25000) : (selectedTour?.priceLahore ?? 25000);
    const total = Number(form.persons) * adult;
    return { adultPrice: adult, totalPrice: total };
  }, [tours, preselectedTour, form.tour, form.persons, user?.city]);

  const { discountAmount, finalPrice } = useMemo(
    () =>
      appliedPromo
        ? calculateDiscount(totalPrice, appliedPromo.discountPercent)
        : { discountAmount: 0, finalPrice: totalPrice },
    [appliedPromo, totalPrice]
  );
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, tour: preselectedTour?.title ?? f.tour }));
      setIsSuccess(false);
      setConfirmedPricing(null);
      setErrors({});
      setApiError("");
      setPromoOpen(false);
      setPromoInput("");
      setPromoError("");
      setAppliedPromo(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, preselectedTour]);

  const isAdmin = user?.role === "admin";
  if (!open || isAdmin) return null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.tour) e.tour = "Please select a tour";
    if (!form.date) e.date = "Please pick a travel date";
    if (form.persons < 1) e.persons = "At least 1 person required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApplyPromo = async () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Please enter a promo code.");
      return;
    }
    setPromoLoading(true);
    setPromoError("");
    try {
      const result = await validatePromoCode(code);
      setAppliedPromo({ code: result.code, discountPercent: result.discountPercent });
      setPromoInput(result.code);
    } catch {
      setAppliedPromo(null);
      setPromoError(INVALID_PROMO_MESSAGE);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError("");
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await submitBooking({
        fullName: user?.full_name || "",
        phoneNumber: user?.phone || "",
        selectedTour: form.tour,
        travelDate: form.date || undefined,
        persons: form.persons,
        room: form.room,
        ...(appliedPromo ? { promoCode: appliedPromo.code } : {}),
      });
      setConfirmedPricing(res.pricing ?? null);
      setIsSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      // Code was deactivated between "Apply" and "Submit" — drop it and surface inline
      if (appliedPromo && msg.startsWith(INVALID_PROMO_MESSAGE)) {
        setAppliedPromo(null);
        setPromoOpen(true);
        setPromoError(INVALID_PROMO_MESSAGE);
      }
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappBooking = () => {
    const promoLine = appliedPromo
      ? `\nPromo code: ${appliedPromo.code} (${appliedPromo.discountPercent}% off)\nEstimated total: ${formatPKR(finalPrice)}`
      : "";
    const msg = `Hi DillKash Kashmir! I want to book: ${form.tour || "a Kashmir tour"}\nName: ${user?.full_name || ""}\nDate: ${form.date || "Flexible"}\nTravelers: ${form.persons} persons\nRoom: ${form.room}${promoLine}`;
    window.open(whatsappLink(msg), "_blank", "noopener");
  };

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
      hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Booking form"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-lift sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-extrabold text-foreground">
              Book Your Kashmir Tour
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details — our team will confirm within 30 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking form"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Auth Gate ── */}
        {!isAuthenticated ? (
          <div className="rounded-2xl bg-secondary p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LogIn size={28} />
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground">
              Login Required
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in to book a tour. Your details will be auto-filled from your account.
            </p>
            <Link
              to="/login"
              search={{ redirect: "/packages" }}
              onClick={onClose}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
            >
              <LogIn size={16} />
              Sign In to Book
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" search={{ redirect: "/packages" }} onClick={onClose} className="font-bold text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
        ) : isSuccess ? (
          /* ── Success Screen ── */
          <div className="rounded-2xl bg-secondary p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta">
              <CheckCircle2 size={32} strokeWidth={2.5} aria-hidden />
            </div>
            <h4 className="font-heading text-xl font-bold text-foreground">
              Booking Request Received!
            </h4>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Thank you,{" "}
              <strong className="text-foreground">{user?.full_name?.split(" ")[0]}</strong>! Our team
              will call you at{" "}
              <strong className="text-foreground">{user?.phone}</strong> shortly to confirm
              your seats.
            </p>
            {form.tour && (
              <p className="mt-2 text-xs text-muted-foreground">
                Tour: <span className="font-semibold text-foreground">{form.tour}</span>
                {form.date && (
                  <>
                    {" "}· Travel date:{" "}
                    <span className="font-semibold text-foreground">
                      {new Date(form.date).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}
              </p>
            )}
            {confirmedPricing?.totalPrice != null && (
              <div className="mx-auto mt-4 max-w-xs rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-3 text-sm dark:border-emerald-800/40 dark:bg-emerald-950/30">
                {confirmedPricing.appliedPromo && confirmedPricing.originalPrice != null && (
                  <p className="text-xs text-gray-400 line-through">{formatPKR(confirmedPricing.originalPrice)}</p>
                )}
                <p className="font-heading text-lg font-extrabold text-emerald-800 dark:text-emerald-300">
                  {formatPKR(confirmedPricing.totalPrice)}
                </p>
                {confirmedPricing.appliedPromo && (
                  <p className="mt-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Saved {formatPKR(confirmedPricing.discountAmount)} with {confirmedPricing.appliedPromo}
                  </p>
                )}
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Track your booking status on{" "}
              <Link to="/my-bookings" onClick={onClose} className="font-bold text-primary hover:underline">
                My Bookings
              </Link>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
            >
              Done
            </button>
          </div>
        ) : (
          /* ── Booking Form ── */
          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            {/* API-level error */}
            {apiError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {apiError}
              </div>
            )}

            {/* Auto-filled user info banner */}
            <div className="rounded-xl border border-border bg-secondary/50 px-4 py-3">
              <p className="text-xs font-semibold text-muted-foreground">Booking as</p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{user?.full_name}</p>
              <p className="text-xs text-muted-foreground">{user?.email} · {user?.phone}</p>
            </div>

            {/* Tour + Date */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-tour" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Selected Tour
                </label>
                <select
                  id="bk-tour"
                  value={form.tour}
                  onChange={(e) => set("tour", e.target.value)}
                  className={inputCls(errors.tour)}
                  disabled={isSubmitting}
                >
                  <option value="">Choose a package…</option>
                  {tours.map((t) => (
                    <option key={t.slug} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
                {errors.tour && <p className="mt-1 text-xs font-medium text-destructive">{errors.tour}</p>}
              </div>
              <div>
                <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Travel Date
                </label>
                <input
                  id="bk-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className={inputCls(errors.date)}
                  disabled={isSubmitting}
                />
                {errors.date && <p className="mt-1 text-xs font-medium text-destructive">{errors.date}</p>}
              </div>
            </div>

            {/* Persons + Room */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-persons" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Total Persons
                </label>
                <input
                  id="bk-persons"
                  type="number"
                  min={1}
                  max={100}
                  value={form.persons}
                  onChange={(e) => set("persons", e.target.value === "" ? 1 : Number(e.target.value))}
                  onFocus={(e) => e.target.select()}
                  className={inputCls(errors.persons)}
                  disabled={isSubmitting}
                />
                {errors.persons && <p className="mt-1 text-xs font-medium text-destructive">{errors.persons}</p>}
              </div>
              <div>
                <label htmlFor="bk-room" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Room
                </label>
                <select
                  id="bk-room"
                  value={form.room}
                  onChange={(e) => set("room", e.target.value)}
                  className={inputCls()}
                  disabled={isSubmitting}
                >
                  <option>Standard Double</option>
                  <option>Family Room</option>
                  <option>Deluxe Double</option>
                  <option>Shared (Budget)</option>
                </select>
              </div>
            </div>

            {/* ── Promo Code (Hostinger-style) ── */}
            <div className="-mb-1">
              {!appliedPromo && (
                <button
                  id="bk-promo-toggle"
                  type="button"
                  onClick={() => {
                    setPromoOpen((o) => !o);
                    setPromoError("");
                  }}
                  aria-expanded={promoOpen}
                  aria-controls="bk-promo-panel"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <Tag size={14} className="transition-transform group-hover:-rotate-12" />
                  <span className="underline-offset-4 group-hover:underline">Have a promo code?</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${promoOpen ? "rotate-180" : ""}`}
                  />
                </button>
              )}

              <div
                id="bk-promo-panel"
                className={`grid transition-all duration-300 ease-out ${
                  promoOpen || appliedPromo ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-300/70 bg-emerald-50 px-3.5 py-2.5 dark:border-emerald-700/50 dark:bg-emerald-950/30">
                      <div className="flex min-w-0 items-center gap-2">
                        <BadgeCheck size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                          Promo code{" "}
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono font-bold tracking-wider dark:bg-emerald-900/50">
                            {appliedPromo.code}
                          </span>{" "}
                          applied successfully!
                        </p>
                      </div>
                      <button
                        id="bk-promo-remove"
                        type="button"
                        onClick={handleRemovePromo}
                        disabled={isSubmitting}
                        className="shrink-0 text-xs font-semibold text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="p-0.5">
                      <div className="flex gap-2">
                        <input
                          id="bk-promo-input"
                          type="text"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value.toUpperCase());
                            if (promoError) setPromoError("");
                          }}
                          onKeyDown={(e) => {
                            // Enter would otherwise submit the whole booking form
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleApplyPromo();
                            }
                          }}
                          placeholder="Enter promo code"
                          maxLength={50}
                          autoComplete="off"
                          aria-invalid={!!promoError}
                          aria-describedby={promoError ? "bk-promo-error" : undefined}
                          tabIndex={promoOpen ? 0 : -1}
                          disabled={promoLoading || isSubmitting}
                          className={`${inputCls(promoError)} font-mono uppercase tracking-wider placeholder:font-sans placeholder:normal-case placeholder:tracking-normal`}
                        />
                        <button
                          id="bk-promo-apply"
                          type="button"
                          onClick={handleApplyPromo}
                          tabIndex={promoOpen ? 0 : -1}
                          disabled={promoLoading || isSubmitting || !promoInput.trim()}
                          className="inline-flex min-w-[84px] items-center justify-center rounded-xl border-2 border-primary px-4 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary"
                        >
                          {promoLoading ? <Loader2 size={16} className="animate-spin" /> : "Apply"}
                        </button>
                      </div>
                      {promoError && (
                        <p
                          id="bk-promo-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          <AlertCircle size={12} />
                          {promoError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Total Price Display ── */}
            <div
              className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-r from-emerald-50 via-emerald-50/80 to-teal-50 p-4 dark:border-emerald-800/40 dark:from-emerald-950/40 dark:via-emerald-950/30 dark:to-teal-950/30"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/20 blur-2xl dark:bg-emerald-500/10" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70 dark:text-emerald-400/70">
                    Total Amount
                  </p>
                  <p className="mt-0.5 text-[11px] text-emerald-600/60 dark:text-emerald-500/50">
                    {Number(form.persons)} person{form.persons !== 1 ? "s" : ""} × {formatPKR(adultPrice)}
                  </p>
                </div>
                <div className="text-right">
                  {appliedPromo && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                      <p className="text-sm font-semibold text-gray-400 line-through decoration-gray-400">
                        {formatPKR(totalPrice)}
                      </p>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        - {appliedPromo.discountPercent}% Discount: {formatPKR(discountAmount)}
                      </p>
                    </div>
                  )}
                  <p
                    key={finalPrice}
                    className="font-heading text-2xl font-extrabold tracking-tight text-emerald-800 animate-in fade-in zoom-in-95 duration-300 dark:text-emerald-300"
                  >
                    {formatPKR(finalPrice)}
                  </p>
                  <p className="mt-1 text-[10px] text-emerald-600/70 dark:text-emerald-400/60">
                    Price based on your city: {user?.city || "Lahore"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Booking"
                )}
              </button>
              <button
                type="button"
                onClick={whatsappBooking}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                <WhatsAppIcon size={18} />
                Book via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
