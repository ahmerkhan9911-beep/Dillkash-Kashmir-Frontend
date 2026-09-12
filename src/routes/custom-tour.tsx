import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Send, Car, Truck, Bus, LogIn } from "lucide-react";
import { destinations, whatsappLink } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { images } from "@/data/site";
import { cn } from "@/lib/utils";
import { submitCustomTour } from "@/services/custom-tours";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/custom-tour")({
  head: () => ({
    meta: [
      { title: "Plan a Custom Kashmir Tour — DillKash Kashmir" },
      {
        name: "description",
        content:
          "Design your own Kashmir itinerary from Lahore — perfect for families, private groups and corporate trips. Choose your dates, destinations and hotel standard.",
      },
      { property: "og:title", content: "Plan a Custom Kashmir Tour — DillKash Kashmir" },
      {
        property: "og:description",
        content:
          "Custom Kashmir itineraries from Lahore for families, private groups and corporate trips.",
      },
    ],
  }),
  component: CustomTourPage,
});

interface CustomForm {
  date: string;
  adults: number;
  kids: number;
  hotel: string;
  transportPreference: string;
  destinations: string[];
  message: string;
}

const initial: CustomForm = {
  date: "",
  adults: 2,
  kids: 0,
  hotel: "3 Star",
  transportPreference: "Standard Car",
  destinations: [],
  message: "",
};

const TRANSPORT_OPTIONS = [
  { value: "Standard Car", subtitle: "Up to 3 persons", icon: Car },
  { value: "SUV / Prado", subtitle: "Best for off-roading", icon: Truck },
  { value: "Grand Cabin / Hiace", subtitle: "For families/groups", icon: Bus },
] as const;

function CustomTourPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<CustomForm>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomForm, string>>>({});
  const [sent, setSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const toggleDestination = (name: string) =>
    setForm((f) => ({
      ...f,
      destinations: f.destinations.includes(name)
        ? f.destinations.filter((d) => d !== name)
        : [...f.destinations, name],
    }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Auth gate: redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate({ to: "/login", search: { redirect: "/custom-tour" } });
      return;
    }

    const err: Partial<Record<keyof CustomForm, string>> = {};
    if (!form.date) err.date = "Please choose a preferred date";
    if (form.destinations.length === 0) err.destinations = "Pick at least one destination";
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      await submitCustomTour({
        name: user?.full_name || "",
        phoneNumber: user?.phone || "",
        preferredDate: form.date,
        adults: form.adults,
        kids: form.kids,
        hotelPreference: form.hotel,
        transportPreference: form.transportPreference,
        preferredDestinations: form.destinations,
        message: form.message,
      });
      setSent(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
      hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={images.videoThumb}
          alt="4x4 jeeps heading into the Kashmir mountains"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl">
            Plan Your Own Kashmir Tour
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            Perfect for families, private groups and corporate trips — your
            dates, your destinations, your pace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-10">
            <SectionHeader
              align="left"
              eyebrow="Custom Tour Request"
              title="Tell Us About Your Trip"
              subtitle="Fill this in and our tour planners will call you with a tailored itinerary and quote."
            />

            {sent ? (
              <div className="mt-8 rounded-2xl bg-secondary p-8 text-center">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check size={28} />
                </div>
                <p className="font-heading text-lg font-bold text-foreground">Request Received!</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Thanks {user?.full_name?.split(" ")[0]} — a tour planner will call{" "}
                  <strong className="text-foreground">{user?.phone}</strong> within
                  a few hours with your custom itinerary.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Track your request status on{" "}
                  <Link to="/my-bookings" className="font-bold text-primary hover:underline">
                    My Bookings
                  </Link>
                </p>
                <a
                  href={whatsappLink(`Hi! I just submitted a custom tour request for ${form.destinations.join(", ")}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-xl bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground"
                >
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
                {apiError && (
                  <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
                    {apiError}
                  </div>
                )}

                {/* Auth gate banner or user info */}
                {!isAuthenticated ? (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
                    <LogIn size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold text-foreground">Login required to submit</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your name and phone will be auto-filled from your account.
                    </p>
                    <Link
                      to="/login"
                      search={{ redirect: "/custom-tour" }}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
                    >
                      <LogIn size={14} />
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-secondary/50 px-4 py-3">
                    <p className="text-xs font-semibold text-muted-foreground">Requesting as</p>
                    <p className="mt-0.5 text-sm font-bold text-foreground">{user?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email} · {user?.phone}</p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="c-date" className="mb-1.5 block text-sm font-semibold text-foreground">Preferred Date</label>
                    <input
                      id="c-date"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className={inputCls(errors.date)}
                    />
                    {errors.date && <p className="mt-1 text-xs font-medium text-destructive">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-adults" className="mb-1.5 block text-sm font-semibold text-foreground">Adults</label>
                    <input
                      id="c-adults"
                      type="number"
                      min={1}
                      max={50}
                      value={form.adults}
                      onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
                      className={inputCls()}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-kids" className="mb-1.5 block text-sm font-semibold text-foreground">Kids</label>
                    <input
                      id="c-kids"
                      type="number"
                      min={0}
                      max={30}
                      value={form.kids}
                      onChange={(e) => setForm({ ...form, kids: Number(e.target.value) })}
                      className={inputCls()}
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-foreground">Hotel Preference</span>
                  <div className="flex gap-2">
                    {["3 Star", "5 Star"].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setForm({ ...form, hotel: h })}
                        className={cn(
                          "flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition-colors",
                          form.hotel === h
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-secondary",
                        )}
                        aria-pressed={form.hotel === h}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-foreground">Transport Preference</span>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {TRANSPORT_OPTIONS.map((opt) => {
                      const active = form.transportPreference === opt.value;
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, transportPreference: opt.value })}
                          aria-pressed={active}
                          className={cn(
                            "relative flex flex-col items-center gap-1.5 rounded-xl border px-4 py-4 text-sm font-bold transition-all",
                            active
                              ? "border-[#059669] bg-[#059669] text-white shadow-md"
                              : "border-border bg-background text-foreground hover:bg-secondary hover:border-[#059669]/40",
                          )}
                        >
                          <Icon size={22} className={active ? "text-white" : "text-muted-foreground"} />
                          <span>{opt.value}</span>
                          <span className={cn("text-xs font-normal", active ? "text-white/80" : "text-muted-foreground")}>
                            {opt.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-foreground">Preferred Destinations</span>
                  <div className="flex flex-wrap gap-2">
                    {destinations.map((d) => {
                      const active = form.destinations.includes(d.name);
                      return (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => toggleDestination(d.name)}
                          aria-pressed={active}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:bg-secondary",
                          )}
                        >
                          {d.name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.destinations && (
                    <p className="mt-1 text-xs font-medium text-destructive">{errors.destinations}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="c-msg" className="mb-1.5 block text-sm font-semibold text-foreground">Message</label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Anything special — anniversary, wheelchair access, corporate branding, specific hotels…"
                    className={inputCls()}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
