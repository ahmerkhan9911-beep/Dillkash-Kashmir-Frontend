import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Bus,
  Car,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { images, pickupPoints } from "@/data/site";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Al Kareem Travel & Tours" },
      {
        name: "description",
        content:
          "Lahore-based travel company specializing in Azad Jammu & Kashmir tours. Meet our fleet, safety policies and the team behind thousands of happy Kashmir journeys.",
      },
      { property: "og:title", content: "About Us — Al Kareem Travel & Tours" },
      {
        property: "og:description",
        content:
          "Lahore-based Kashmir tour specialists with our own fleet, verified hotels and professional tour managers.",
      },
    ],
  }),
  component: AboutPage,
});

const fleet = [
  { icon: Bus, name: "Saloon Coasters", detail: "AC, pushback seats — the backbone of our group tours from Lahore." },
  { icon: Bus, name: "Grand Cabin", detail: "Premium hi-roof cabins for smaller groups and private trips." },
  { icon: Car, name: "Prado", detail: "Comfortable 4x4 for families & executives on rough stretches." },
  { icon: Car, name: "Fortuner", detail: "Power and comfort combined for long mountain journeys." },
  { icon: Car, name: "4x4 Jeeps", detail: "Essential for Ratti Gali, Taobat and Baboon Valley terrain." },
];

const trust = [
  { icon: ShieldCheck, title: "Safety First", text: "Experienced mountain drivers, vehicle inspections before every departure, and first aid kits on board." },
  { icon: BadgeCheck, title: "Verified Hotels", text: "Every hotel in Keran, Sharda and Kutton is personally inspected by our team each season." },
  { icon: Users, title: "Professional Tour Managers", text: "A dedicated tour manager travels with every group from Lahore pickup to drop-off." },
  { icon: HeartHandshake, title: "Transparent Pricing", text: "The price you see is the price you pay — transport, meals, stays and jeep rides included." },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={images.taobat}
          alt="Taobat village, Neelum Valley"
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6">
          <h1 className="font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl">
            About Al Kareem Travel & Tours
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            A Lahore-based team of Kashmir specialists, running safe and
            memorable mountain journeys since our very first coaster.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="img-zoom overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={images.keran}
                alt="Keran, Neelum Valley — one of our home destinations"
                width={1280}
                height={720}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeader
              align="left"
              eyebrow="Our Story"
              title="Born in Lahore, at Home in Kashmir"
              subtitle="Al Kareem Travel & Tours started with a single coaster and a simple promise: make the paradise of Azad Jammu & Kashmir accessible to every family in Lahore."
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Today we run weekly departures to Neelum Valley, Arang Kel, Ratti
              Gali, Sharda and Taobat — with our own fleet, hand-picked hotels
              and tour managers who treat every traveler like family. Thousands
              of travelers later, that promise hasn't changed.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "5,000+", l: "Happy Travelers" },
                { n: "120+", l: "Tours Completed" },
                { n: "4.9★", l: "Average Rating" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
                  <p className="font-heading text-2xl font-extrabold text-primary">{s.n}</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why trust us */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeader
              eyebrow="Trust"
              title="Why Travelers Trust Us"
              subtitle="Safety, transparency and local expertise on every single departure."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-secondary text-primary">
                    <t.icon size={26} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Our Fleet"
            title="The Right Vehicle for Every Road"
            subtitle="From motorway comfort to 4x4 mountain terrain — our own maintained fleet, no third-party surprises."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {fleet.map((f, i) => (
            <Reveal key={f.name} delay={i * 60}>
              <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <f.icon size={26} />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lahore departures */}
      <section className="bg-foreground py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Departures"
              title="Weekly Departures from Lahore"
              subtitle="Three pickup points across the city, on-time departures, and a tour manager waiting to welcome you aboard."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {pickupPoints.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/20 text-primary">
                    <MapPin size={20} />
                  </span>
                  <p className="mt-3 font-heading text-lg font-bold">{p.name}</p>
                  <p className="mt-1 text-sm text-primary-foreground/60">{p.detail}</p>
                  <p className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                    Departs {p.time}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105"
            >
              Explore Our Packages
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
