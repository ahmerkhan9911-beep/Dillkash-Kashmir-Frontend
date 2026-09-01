import { Link } from "@tanstack/react-router";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./Navbar";

/** Fixed WhatsApp button on every page + mobile sticky booking CTA. */
export function WhatsAppFloat() {
  return (
    <>
      {/* Floating WhatsApp button */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-pulse fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* Mobile sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md sm:hidden">
        <Link
          to="/packages"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-cta"
        >
          Book Your Kashmir Tour
        </Link>
      </div>
    </>
  );
}
