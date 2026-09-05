import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { WhatsAppIcon } from "@/components/site/Navbar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — DillKash Kashmir, Lahore" },
      {
        name: "description",
        content:
          "Get in touch with DillKash Kashmir in Lahore. Call, WhatsApp or visit our office to plan your Kashmir tour — open 7 days a week.",
      },
      { property: "og:title", content: "Contact Us — DillKash Kashmir, Lahore" },
      {
        property: "og:description",
        content:
          "Call, WhatsApp or visit our Lahore office to plan your Kashmir tour.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "message", string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<"name" | "phone" | "message", string>> = {};
    if (form.name.trim().length < 3) err.name = "Please enter your name";
    if (form.phone.trim().length < 10) err.phone = "Please enter a valid phone number";
    if (form.message.trim().length < 10) err.message = "Tell us a little about your trip";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${hasError ? "border-destructive" : "border-input"
    }`;

  return (
    <>
      <section className="bg-secondary/90 pb-16 pt-36">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-extrabold text-foreground text-balance sm:text-5xl">
            Let's Plan Your Kashmir Trip
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Call, WhatsApp or drop by our Lahore office — we reply within
            minutes, seven days a week.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info */}
          <Reveal>
            <div className="grid gap-4">
              {[
                { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
                { icon: null, label: "WhatsApp", value: site.phone, href: whatsappLink(), isWa: true },
                { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
                { icon: MapPin, label: "Lahore Office", value: site.address },
                { icon: Clock, label: "Office Hours", value: site.hours },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    {c.isWa ? <WhatsAppIcon size={22} /> : c.icon ? <c.icon size={22} /> : null}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.isWa ? "_blank" : undefined}
                        rel={c.isWa ? "noopener noreferrer" : undefined}
                        className="mt-0.5 block truncate font-heading text-base font-bold text-foreground hover:text-primary"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-heading text-base font-bold text-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map-style area */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-muted shadow-soft">
                <div className="grid h-56 place-items-center bg-[radial-gradient(circle_at_30%_30%,var(--color-secondary),var(--color-muted))]">
                  <div className="text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-cta">
                      <MapPin size={26} />
                    </span>
                    <p className="mt-3 font-heading text-sm font-bold text-foreground">Johar Town, Lahore</p>
                    <a
                      href="https://maps.google.com/?q=Johar+Town+Lahore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs font-bold text-primary hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <SectionHeader
                align="left"
                title="Send Us a Message"
                subtitle="Tell us your travel dates and group size — we'll reply with the best options."
              />
              {sent ? (
                <div className="mt-6 rounded-2xl bg-secondary p-6 text-center">
                  <p className="font-heading text-lg font-bold text-foreground">Message Sent!</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks {form.name.split(" ")[0]} — our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
                  <div>
                    <label htmlFor="ct-name" className="mb-1.5 block text-sm font-semibold text-foreground">Name</label>
                    <input
                      id="ct-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className={inputCls(errors.name)}
                    />
                    {errors.name && <p className="mt-1 text-xs font-medium text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="ct-phone" className="mb-1.5 block text-sm font-semibold text-foreground">Phone / WhatsApp</label>
                    <input
                      id="ct-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className={inputCls(errors.phone)}
                    />
                    {errors.phone && <p className="mt-1 text-xs font-medium text-destructive">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="ct-msg" className="mb-1.5 block text-sm font-semibold text-foreground">Message</label>
                    <textarea
                      id="ct-msg"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="I want to plan a 5-day Kashmir trip for my family in October…"
                      className={inputCls(errors.message)}
                    />
                    {errors.message && <p className="mt-1 text-xs font-medium text-destructive">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Big CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="rounded-[2.5rem] bg-primary px-6 py-14 text-center shadow-lift sm:px-12">
            <h2 className="font-heading text-3xl font-extrabold text-primary-foreground text-balance sm:text-4xl">
              Ready to Explore Kashmir?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-primary-foreground/85">
              The mountains are calling — our next coaster leaves Lahore this week.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-bold text-whatsapp-foreground shadow-lift transition-transform hover:scale-105"
              >
                <WhatsAppIcon size={18} />
                WhatsApp Us
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-bold text-foreground transition-transform hover:scale-105"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
