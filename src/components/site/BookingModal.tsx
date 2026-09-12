import { useEffect, useMemo, useState } from "react";
import { X, Loader2, CheckCircle2, LogIn } from "lucide-react";
import { tours, whatsappLink, formatPKR, type Tour } from "@/data/site";
import { WhatsAppIcon } from "./Navbar";
import { submitBooking } from "@/services/bookings";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@tanstack/react-router";

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

  // ── Dynamic price calculation ──
  const { adultPrice, totalPrice } = useMemo(() => {
    const selectedTour = tours.find((t) => t.title === form.tour);
    const isIslamabad = user?.city === "Islamabad";
    const adult = isIslamabad ? (selectedTour?.priceIslamabad ?? 25000) : (selectedTour?.priceLahore ?? 25000);
    const total = Number(form.persons) * adult;
    return { adultPrice: adult, totalPrice: total };
  }, [form.tour, form.persons, user?.city]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, tour: preselectedTour?.title ?? f.tour }));
      setIsSuccess(false);
      setErrors({});
      setApiError("");
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

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      await submitBooking({
        fullName: user?.full_name || "",
        phoneNumber: user?.phone || "",
        selectedTour: form.tour,
        travelDate: form.date || undefined,
        persons: form.persons,
        room: form.room,
      });
      setIsSuccess(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappBooking = () => {
    const msg = `Hi DillKash Kashmir! I want to book: ${form.tour || "a Kashmir tour"}\nName: ${user?.full_name || ""}\nDate: ${form.date || "Flexible"}\nTravelers: ${form.persons} persons\nRoom: ${form.room}`;
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
              <Link to="/signup" onClick={onClose} className="font-bold text-primary hover:underline">
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
                  onChange={(e) => set("persons", Number(e.target.value))}
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

            {/* ── Total Price Display ── */}
            <div
              className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-r from-emerald-50 via-emerald-50/80 to-teal-50 p-4 dark:border-emerald-800/40 dark:from-emerald-950/40 dark:via-emerald-950/30 dark:to-teal-950/30"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/20 blur-2xl dark:bg-emerald-500/10" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70 dark:text-emerald-400/70">
                    Total Amount
                  </p>
                  <p className="mt-0.5 text-[11px] text-emerald-600/60 dark:text-emerald-500/50">
                    {Number(form.persons)} person{form.persons !== 1 ? "s" : ""} × {formatPKR(adultPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-2xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-300">
                    {formatPKR(totalPrice)}
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
