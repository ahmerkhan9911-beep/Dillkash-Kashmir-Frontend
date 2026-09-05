import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { tours, whatsappLink, type Tour } from "@/data/site";
import { WhatsAppIcon } from "./Navbar";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedTour?: Tour | undefined;
}

interface FormState {
  name: string;
  phone: string;
  tour: string;
  date: string;
  adults: number;
  kids: number;
  room: string;
}

const initial: FormState = {
  name: "",
  phone: "",
  tour: "",
  date: "",
  adults: 2,
  kids: 0,
  room: "Standard Double",
};

export function BookingModal({ open, onClose, preselectedTour }: BookingModalProps) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, tour: preselectedTour?.title ?? f.tour }));
      setSubmitted(false);
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, preselectedTour]);

  if (!open) return null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) e.name = "Please enter your full name";
    if (!/^(\+?92|0)?\d{10}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid phone number (e.g. 03001234567)";
    if (!form.tour) e.tour = "Please select a tour";
    if (!form.date) e.date = "Please pick a travel date";
    if (form.adults < 1) e.adults = "At least 1 adult required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // Frontend-only mock submission — ready to be wired to an API later.
    setSubmitted(true);
  };

  const whatsappBooking = () => {
    const msg = `Hi DillKash Kashmir! I want to book: ${form.tour || "a Kashmir tour"}\nName: ${form.name}\nDate: ${form.date || "Flexible"}\nTravelers: ${form.adults} adults, ${form.kids} kids\nRoom: ${form.room}`;
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

        {submitted ? (
          <div className="rounded-2xl bg-secondary p-6 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground">
              Booking Request Received!
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, {form.name.split(" ")[0]}! Our team will call you at{" "}
              <strong className="text-foreground">{form.phone}</strong> shortly to
              confirm your seats.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div>
              <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                Full Name
              </label>
              <input
                id="bk-name"
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Muhammad Ahmad"
                className={inputCls(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs font-medium text-destructive">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                Phone Number
              </label>
              <input
                id="bk-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0300 1234567"
                className={inputCls(errors.phone)}
              />
              {errors.phone && <p className="mt-1 text-xs font-medium text-destructive">{errors.phone}</p>}
            </div>

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
                />
                {errors.date && <p className="mt-1 text-xs font-medium text-destructive">{errors.date}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="bk-adults" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Adults
                </label>
                <input
                  id="bk-adults"
                  type="number"
                  min={1}
                  max={30}
                  value={form.adults}
                  onChange={(e) => set("adults", Number(e.target.value))}
                  className={inputCls(errors.adults)}
                />
              </div>
              <div>
                <label htmlFor="bk-kids" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Kids
                </label>
                <input
                  id="bk-kids"
                  type="number"
                  min={0}
                  max={20}
                  value={form.kids}
                  onChange={(e) => set("kids", Number(e.target.value))}
                  className={inputCls()}
                />
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
                >
                  <option>Standard Double</option>
                  <option>Family Room</option>
                  <option>Deluxe Double</option>
                  <option>Shared (Budget)</option>
                </select>
              </div>
            </div>

            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                className="rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
              >
                Submit Booking
              </button>
              <button
                type="button"
                onClick={whatsappBooking}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02]"
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
