import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { images } from "@/data/site";
import { resolveImageUrl } from "@/lib/resolveImage";
import kashmirMapBg from "@/assets/kashmir-map.png";

/* ── Types ──────────────────────────────────────────────────────────── */

interface DestinationPoint {
  id: number;
  label: string;
  name: string;
  /**
   * Percentage-based position on the map image container.
   * ✏️  Tweak these `top` / `left` values to align dots with the real map.
   */
  top: string;
  left: string;
  coverImage: string;
  info: string;
  /** Which side the tooltip card opens toward */
  cardSide: "left" | "right";
}

/* ── Destination data ─────────────────────────────────────────────── */
/*
 * ✏️  EDITABLE COORDINATES
 *
 * Each entry's `top` and `left` are CSS percentages relative to
 * the map image container. Adjust them to pin-point the real
 * locations on your kashmir-map.png image.
 *
 *   top  → vertical position   (0% = top edge, 100% = bottom edge)
 *   left → horizontal position (0% = left edge, 100% = right edge)
 */

const DESTINATIONS: DestinationPoint[] = [
  {
    id: 1,
    label: "01",
    name: "Muzaffarabad",
    top: "68%",
    left: "35%",
    coverImage: images.muzaffarabad,
    info: "Capital of Azad Kashmir — gateway to the Neelum Valley at the confluence of Neelum & Jhelum rivers.",
    cardSide: "right",
  },
  {
    id: 2,
    label: "02",
    name: "Kutton",
    top: "55%",
    left: "42%",
    coverImage: images.kutton,
    info: "Hidden gem in Jagran Valley with mesmerizing multi-tiered waterfalls surrounded by pine forests.",
    cardSide: "right",
  },
  {
    id: 3,
    label: "03",
    name: "Keran",
    top: "46%",
    left: "33%",
    coverImage: images.keran,
    info: "A peaceful riverside town with India-administered Kashmir visible just across the Neelum River.",
    cardSide: "right",
  },
  {
    id: 4,
    label: "04",
    name: "Dhani Waterfall",
    top: "40%",
    left: "26%",
    coverImage: images.dhani,
    info: "One of AJK's tallest waterfalls, cascading down the mountainside in a misty spectacle.",
    cardSide: "left",
  },
  {
    id: 5,
    label: "05",
    name: "Sharda",
    top: "33%",
    left: "34%",
    coverImage: images.sharda,
    info: "Ancient Sharda Peeth — a historic temple and center of learning in the Kashmir valley.",
    cardSide: "right",
  },
  {
    id: 6,
    label: "06",
    name: "Arang Kel",
    top: "28%",
    left: "40%",
    coverImage: images.arangKel,
    info: "A lush green village perched on a mountain top in Neelum Valley — the 'Pearl of Neelum'.",
    cardSide: "right",
  },
  {
    id: 7,
    label: "07",
    name: "Ratti Gali Lake",
    top: "30%",
    left: "22%",
    coverImage: images.rattiGali,
    info: "A stunning alpine lake at 12,130 ft above sea level, surrounded by glacier-tipped peaks.",
    cardSide: "left",
  },
  {
    id: 8,
    label: "08",
    name: "Taobat",
    top: "22%",
    left: "30%",
    coverImage: images.taobat,
    info: "The breathtaking last station of the Neelum Valley — raw, remote and unforgettable.",
    cardSide: "left",
  },
];

/* ── Animated pulsing dot ─────────────────────────────────────────── */

function PulsingDot({ isActive }: { isActive: boolean }) {
  return (
    <>
      {/* Outer pulse ring */}
      <span
        className="absolute rounded-full bg-emerald-400"
        style={{
          inset: "-6px",
          opacity: isActive ? 0.3 : 0.15,
          animation: "map-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        }}
      />
      {/* Secondary glow */}
      <span
        className="absolute rounded-full bg-emerald-300"
        style={{
          inset: "-3px",
          opacity: isActive ? 0.4 : 0.2,
          animation: "map-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s",
        }}
      />
    </>
  );
}

/* ── Main Component ───────────────────────────────────────────────── */

export default function InteractiveMountain2D() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [touchedId, setTouchedId] = useState<number | null>(null);
  const activeId = hoveredId ?? touchedId;

  // Handle touch for mobile
  const handleTouch = (id: number) => {
    setTouchedId((prev) => (prev === id ? null : id));
  };

  // Close touch card when tapping outside
  useEffect(() => {
    if (touchedId === null) return;
    const handler = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-map-point]")) {
        setTouchedId(null);
      }
    };
    document.addEventListener("touchstart", handler, { passive: true });
    return () => document.removeEventListener("touchstart", handler);
  }, [touchedId]);

  return (
    <section className="w-full py-20 px-6 md:px-16 bg-white text-gray-900 border-b border-gray-100">
      {/* Inject keyframe animation */}
      <style>{`
        @keyframes map-ping {
          0% { transform: scale(1); opacity: 0.3; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes map-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

        {/* Left Side: Minimalist Text */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-emerald-600 font-semibold text-xs tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full">
            Interactive Map
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-snug">
            Explore Kashmir at a Glance
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Hover over the interactive points on the Neelum Valley map to preview destinations, cover images, and quick details — from Muzaffarabad at the gateway to Taobat at the valley's end.
          </p>

          {/* Legend */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destinations</p>
            <div className="grid grid-cols-2 gap-2">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  className={`text-left text-xs px-3 py-2 rounded-lg border transition-all duration-200 ${
                    activeId === dest.id
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold shadow-sm"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-emerald-50/50 hover:border-emerald-200"
                  }`}
                  onMouseEnter={() => setHoveredId(dest.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span className="text-emerald-500 font-bold mr-1">{dest.label}</span>
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/packages"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
            >
              View All Tours
            </Link>
          </div>
        </div>

        {/* ── Right Side: Map Image Container ──────────────────────── */}
        <div className="lg:col-span-7">
          <div
            className="relative w-full"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* Static map background image (transparent PNG — no box needed) */}
            <img
              src={kashmirMapBg}
              alt="Map of Kashmir"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-lg"
              draggable={false}
            />

            {/* ── Interactive Hotspots (absolutely positioned over the image) ── */}
            {DESTINATIONS.map((dest) => {
              const isActive = activeId === dest.id;
              const openRight = dest.cardSide === "right";

              return (
                <div
                  key={dest.id}
                  data-map-point
                  className="absolute z-20 group cursor-pointer"
                  style={{
                    top: dest.top,
                    left: dest.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Dot with pulse */}
                  <button
                    type="button"
                    aria-label={`View ${dest.name}`}
                    className={`relative w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isActive
                        ? "bg-emerald-500 scale-125"
                        : "bg-emerald-600 hover:scale-110"
                    }`}
                    onMouseEnter={() => setHoveredId(dest.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(dest.id)}
                    onBlur={() => setHoveredId(null)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleTouch(dest.id);
                    }}
                  >
                    <PulsingDot isActive={isActive} />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white relative z-10" />
                  </button>

                  {/* Label below the dot */}
                  <span
                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] md:text-[10px] font-semibold tracking-wide pointer-events-none select-none"
                    style={{
                      color: isActive ? "#059669" : "#6b7280",
                      transition: "color 0.2s",
                      textShadow: "0 1px 3px rgba(255,255,255,0.9)",
                    }}
                  >
                    {dest.name}
                  </span>

                  {/* Floating Info Card */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      bottom: "calc(100% + 18px)",
                      ...(openRight
                        ? { left: "50%", transform: "translateX(-20%)" }
                        : { right: "50%", transform: "translateX(20%)" }),
                      width: "240px",
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? openRight
                          ? "translateX(-20%) translateY(0)"
                          : "translateX(20%) translateY(0)"
                        : openRight
                          ? "translateX(-20%) translateY(10px)"
                          : "translateX(20%) translateY(10px)",
                      transition:
                        "opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)",
                      zIndex: 40,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-3 shadow-2xl">
                      <div className="w-full h-28 rounded-lg overflow-hidden mb-2 relative bg-gray-100">
                        <img
                          src={resolveImageUrl(dest.coverImage)}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80";
                          }}
                        />
                      </div>
                      <h4 className="text-emerald-700 font-bold text-sm">{dest.name}</h4>
                      <p className="text-gray-600 text-[11px] mt-1 leading-relaxed">{dest.info}</p>
                    </div>

                    {/* Arrow tip */}
                    <div
                      className="absolute"
                      style={{
                        bottom: "-7px",
                        left: openRight ? "22%" : undefined,
                        right: openRight ? undefined : "22%",
                        width: "14px",
                        height: "7px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          background: "rgba(255,255,255,0.95)",
                          border: "1px solid #e5e7eb",
                          transform: "rotate(45deg)",
                          position: "absolute",
                          bottom: "3px",
                          left: "2px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
