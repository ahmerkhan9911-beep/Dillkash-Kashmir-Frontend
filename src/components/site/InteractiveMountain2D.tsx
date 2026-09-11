import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { images } from "@/data/site";
import { resolveImageUrl } from "@/lib/resolveImage";

/* ── Types ──────────────────────────────────────────────────────────── */

interface DestinationPoint {
  id: number;
  label: string;
  name: string;
  top: string;
  left: string;
  coverImage: string;
  info: string;
  cardSide: "left" | "right";
}

/* ── Destination data ───────────────────────────────────────────────── */

const DESTINATIONS: DestinationPoint[] = [
  {
    id: 1,
    label: "01",
    name: "Arang Kel",
    top: "35%",
    left: "42%",
    coverImage: images.arangKel,
    info: "A lush green village perched on a mountain top in Neelum Valley.",
    cardSide: "right",
  },
  {
    id: 2,
    label: "02",
    name: "Sharda Peeth",
    top: "55%",
    left: "65%",
    coverImage: images.sharda,
    info: "An ancient ruined temple and center of learning in historic Kashmir.",
    cardSide: "right",
  },
  {
    id: 3,
    label: "03",
    name: "Taobat",
    top: "48%",
    left: "25%",
    coverImage: images.taobat,
    info: "The breathtaking last station of the Neelum Valley with pristine streams.",
    cardSide: "left",
  },
  {
    id: 4,
    label: "04",
    name: "Ratti Gali",
    top: "40%",
    left: "20%",
    coverImage: images.rattiGali,
    info: "A stunning alpine lake at 12,130 ft above sea level, surrounded by glacier-tipped peaks.",
    cardSide: "left",
  },
];

export default function InteractiveMountain2D() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="w-full py-20 px-6 md:px-16 bg-white text-gray-900 border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Minimalist Text */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-emerald-600 font-semibold text-xs tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full">
            Interactive Map
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-snug">
            Explore Kashmir at a Glance
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Hover over the interactive points on the mountain map to preview destinations, cover images, and quick details before planning your journey.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/packages"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
            >
              View All Tours
            </Link>
          </div>
        </div>

        {/* Right Side: Mountain Container */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[500px] bg-gradient-to-b from-emerald-50/50 via-gray-50 to-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex items-center justify-center p-6">
            
            {/* SVG Vector Mountain Silhouette */}
            <div className="absolute inset-x-0 bottom-0 h-[80%] flex items-end justify-center pointer-events-none">
              <svg
                viewBox="0 0 1200 600"
                className="w-full h-full object-contain drop-shadow-md"
                preserveAspectRatio="none"
              >
                <polygon points="150,400 450,100 800,450 1050,200 1200,600 0,600" fill="#047857" opacity="0.2" />
                <polygon points="600,40 900,600 300,600" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                <polygon points="600,40 680,180 640,190 600,150 560,190 520,180" fill="#ffffff" opacity="0.95" />
              </svg>
            </div>

            {/* Interactive Hotspots */}
            {DESTINATIONS.map((dest) => {
              const isHovered = hoveredId === dest.id;
              const openRight = dest.cardSide === "right";

              return (
                <div
                  key={dest.id}
                  className="absolute z-20 group cursor-pointer"
                  style={{ top: dest.top, left: dest.left, transform: "translate(-50%, -50%)" }}
                >
                  <span className="absolute -inset-2 rounded-full bg-emerald-500 opacity-40 animate-ping" />

                  <button
                    type="button"
                    aria-label={`View ${dest.name}`}
                    className="relative w-5 h-5 rounded-full bg-emerald-600 border-2 border-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    onMouseEnter={() => setHoveredId(dest.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(dest.id)}
                    onBlur={() => setHoveredId(null)}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </button>

                  {/* Floating Info Card */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      bottom: "calc(100% + 14px)",
                      ...(openRight
                        ? { left: "50%", transform: "translateX(-20%)" }
                        : { right: "50%", transform: "translateX(20%)" }),
                      width: "240px",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? openRight ? "translateX(-20%) translateY(0)" : "translateX(20%) translateY(0)"
                        : openRight ? "translateX(-20%) translateY(10px)" : "translateX(20%) translateY(10px)",
                      transition:
                        "opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)",
                      zIndex: 40,
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-3 shadow-2xl">
                      <div className="w-full h-28 rounded-lg overflow-hidden mb-2 relative bg-gray-100">
                        <img
                          src={resolveImageUrl(dest.coverImage)}
                          alt={dest.name}
                          className="w-full h-full object-cover"
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
                          border: "1px solid #e5e7eb", // gray-200
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
