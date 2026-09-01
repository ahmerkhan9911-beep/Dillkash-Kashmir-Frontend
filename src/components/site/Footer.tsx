import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import logoHorizontal from "@/assets/dillkash-logo-horizontal.png";
import { site, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./Navbar";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Kashmir Packages", href: "/packages" },
  { label: "Custom Tours", href: "/custom-tour" },
  { label: "Contact", href: "/contact" },
];

const destinationLinks = [
  "Neelum Valley",
  "Arang Kel",
  "Ratti Gali",
  "Sharda",
  "Taobat",
  "Keran",
];

const socials = [
  { label: "Facebook", icon: "f", href: "https://facebook.com" },
  { label: "Instagram", icon: "ig", href: "https://instagram.com" },
  { label: "TikTok", icon: "tt", href: "https://tiktok.com" },
  { label: "YouTube", icon: "yt", href: "https://youtube.com" },
];

function SocialGlyph({ icon }: { icon: string }) {
  const cls = "h-4 w-4";
  switch (icon) {
    case "f":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>
      );
    case "ig":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5Zm6.4-9.65a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0Z" /></svg>
      );
    case "tt":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.31-2.84V9.35a6.35 6.35 0 1 0 5.76 6.32V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75c-.61 0-1.2-.02-1-.06Z" /></svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" /></svg>
      );
  }
}

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center rounded-xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
            <img
              src={logoHorizontal}
              alt="DillKash Kashmir"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Premium & budget-friendly Kashmir tour packages departing weekly
            from Lahore. Trusted by thousands of travelers for safe,
            all-inclusive journeys to Neelum Valley and beyond.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary"
              >
                <SocialGlyph icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Company">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular destinations">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            Popular Destinations
          </h3>
          <ul className="mt-4 space-y-2.5">
            {destinationLinks.map((d) => (
              <li key={d}>
                <Link
                  to="/packages"
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary"
                >
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              {site.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-primary" />
              <a href={site.phoneHref} className="hover:text-primary">{site.phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="shrink-0 text-primary"><WhatsAppIcon size={16} /></span>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                WhatsApp Booking
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
              {site.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-primary-foreground/50 sm:px-6">
          © 2026 Al Kareem Travel & Tours. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
