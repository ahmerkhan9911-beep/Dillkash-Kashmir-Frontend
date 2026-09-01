import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X, LogIn, LogOut, User, Shield } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import logoHorizontal from "@/assets/dillkash-logo-horizontal.png";
import logoIcon from "@/assets/dillkash-logo-icon.png";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Kashmir Packages" },
  { to: "/packages", label: "Destinations", hash: "destinations" },
  { to: "/custom-tour", label: "Custom Tour" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88Zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.6 5.96L.05 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41Z" />
    </svg>
  );
}

export { WhatsAppIcon };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-soft backdrop-blur-md"
          : "bg-gradient-to-b from-black/40 to-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 lg:gap-6",
          scrolled ? "py-2.5" : "py-3.5",
        )}
      >
        {/* LEFT: Logo */}
        <Link to="/" className="flex shrink-0 items-center">
          {/* Desktop: horizontal logo */}
          <div
            className={cn(
              "hidden items-center rounded-xl px-2.5 py-1 transition-colors sm:flex",
              scrolled ? "" : "bg-white/90 shadow-sm backdrop-blur-sm",
            )}
          >
            <img
              src={logoHorizontal}
              alt="DillKash Kashmir"
              className="h-8.5 w-auto object-contain xl:h-9"
            />
          </div>

          {/* Mobile: icon-only logo */}
          <div
            className={cn(
              "flex items-center rounded-xl p-1.5 transition-colors sm:hidden",
              scrolled ? "" : "bg-white/90 shadow-sm backdrop-blur-sm",
            )}
          >
            <img
              src={logoIcon}
              alt="DillKash Kashmir"
              className="h-8 w-auto object-contain"
            />
          </div>
        </Link>

        {/* CENTER: Navigation Links */}
        <nav
          className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-1.5"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isAnchor = "hash" in link && Boolean(link.hash);
            const baseClass = cn(
              "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-colors xl:px-3.5 xl:py-2 xl:text-sm",
              scrolled
                ? "text-foreground hover:bg-secondary hover:text-primary"
                : "text-white/90 hover:bg-white/15 hover:text-white",
            );

            if (isAnchor) {
              return (
                <a key={link.label} href="/#destinations" className={baseClass}>
                  {link.label}
                </a>
              );
            }

            return (
              <Link key={link.label} to={link.to} className={baseClass}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Actions (WhatsApp Booking + Login / Auth) */}
        <div className="flex shrink-0 items-center gap-2 xl:gap-2.5">
          {/* WhatsApp Booking CTA */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-whatsapp px-3.5 py-2 text-xs font-bold text-whatsapp-foreground shadow-cta transition-transform hover:scale-[1.02] sm:inline-flex xl:px-4 xl:py-2 xl:text-sm"
          >
            <WhatsAppIcon size={16} />
            <span>WhatsApp Booking</span>
          </a>

          {/* Auth State */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className={cn(
                "hidden items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition-all sm:inline-flex xl:px-4 xl:py-2 xl:text-sm",
                scrolled
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "bg-white/20 text-white backdrop-blur hover:bg-white/30",
              )}
            >
              <LogIn size={15} />
              <span>Login</span>
            </Link>
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              {isAdmin && (
                <Link
                  to="/admin"
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                    scrolled
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "bg-white/20 text-white backdrop-blur hover:bg-white/30",
                  )}
                >
                  <Shield size={13} />
                  <span>Admin</span>
                </Link>
              )}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold",
                  scrolled ? "text-foreground" : "text-white",
                )}
              >
                <User size={13} />
                <span className="max-w-[100px] truncate">
                  {user?.full_name?.split(" ")[0]}
                </span>
              </span>
              <button
                type="button"
                onClick={logout}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full transition-colors",
                  scrolled
                    ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    : "text-white/80 hover:bg-white/20 hover:text-white",
                )}
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}

          {/* Hamburger toggle button for Mobile/Tablet */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-xl transition-colors lg:hidden",
              scrolled
                ? "bg-secondary text-secondary-foreground"
                : "bg-white/15 text-white backdrop-blur hover:bg-white/25",
            )}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet dropdown menu */}
      <div
        className={cn(
          "overflow-hidden bg-background/98 backdrop-blur-lg shadow-lift transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[580px] border-t border-border opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Home
          </Link>
          <Link
            to="/packages"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Kashmir Packages
          </Link>
          <a
            href="/#destinations"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Destinations
          </a>
          <Link
            to="/custom-tour"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Custom Tour
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Contact
          </Link>

          <div className="mt-2 grid gap-2 border-t border-border pt-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-bold text-whatsapp-foreground shadow-sm"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Booking
            </a>

            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              <Phone size={15} className="text-primary" />
              <span>Call: {site.phone}</span>
            </a>

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <LogIn size={16} />
                Login / Sign Up
              </Link>
            ) : (
              <div className="grid gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary"
                  >
                    <Shield size={16} />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/10"
                >
                  <LogOut size={16} />
                  Logout ({user?.full_name?.split(" ")[0]})
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

