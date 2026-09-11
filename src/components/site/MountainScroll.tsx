import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MountainScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    const handleLoadedMetadata = () => {
      gsap.to(video, {
        currentTime: video!.duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });
    };

    if (video) {
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      } else {
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
      }
    }

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="/uploads/mountain-spin.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-12 md:px-24">
        <div className="pointer-events-auto bg-black/70 backdrop-blur-md text-white p-4 rounded-xl border border-white/20 shadow-2xl transition-transform hover:scale-105 cursor-pointer">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            Destination 01
          </span>
          <h3 className="font-bold text-xl text-white">Arang Kel</h3>
          <p className="text-xs text-gray-300 mt-1">
            The crown jewel of Neelum Valley.
          </p>
        </div>

        <div className="pointer-events-auto bg-black/70 backdrop-blur-md text-white p-4 rounded-xl border border-white/20 shadow-2xl transition-transform hover:scale-105 cursor-pointer">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            Destination 02
          </span>
          <h3 className="font-bold text-xl text-white">Sharda Peeth</h3>
          <p className="text-xs text-gray-300 mt-1">
            Ancient historical heritage site.
          </p>
        </div>
      </div>
    </div>
  );
}
              />
            </svg >
            <p className="text-sm font-semibold tracking-wide">360° Mountain View</p>
            <p className="text-xs text-white/30">Video unavailable</p>
          </div >
        )}
      </div >

  {/* ── Scroll-driven video ────────────────────────────────────────── */ }
  < video
ref = { videoRef }
src = "/mountain-spin.mp4"
className = "absolute inset-0 w-full h-full object-cover"
style = {{
  opacity: videoLoaded && !videoError ? 1 : 0,
    transition: "opacity 0.8s ease",
        }}
muted
playsInline
preload = "auto"
onLoadedMetadata = {() => setVideoLoaded(true)}
onCanPlay = {() => setVideoLoaded(true)}
onError = {() => setVideoError(true)}
      />

{/* ── Subtle dark vignette overlay ──────────────────────────────── */ }
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
  }}
/>

{/* ── Scroll-linked destination cards ───────────────────────────── */ }
{
  DESTINATIONS.map((dest, idx) => {
    const isActive = activeCard === idx;
    const isLeft = dest.position === "left";

    return (
      <div
        key={dest.id}
        className="absolute bottom-20 pointer-events-none"
        style={{ [isLeft ? "left" : "right"]: "clamp(2rem, 6vw, 6rem)" }}
      >
        <div
          className="pointer-events-auto bg-black/80 backdrop-blur-xl text-white p-5 rounded-2xl border shadow-2xl max-w-xs"
          style={{
            borderColor: isActive
              ? "rgba(52,211,153,0.45)"
              : "rgba(255,255,255,0.08)",
            opacity: isActive ? 1 : 0,
            transform: isActive
              ? "translateY(0px) scale(1)"
              : `translateY(18px) scale(0.95) ${isLeft ? "" : ""}`,
            transition:
              "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
            pointerEvents: isActive ? "auto" : "none",
          }}
        >
          {/* Emerald accent bar */}
          <div
            className="absolute top-0 left-6 right-6 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(52,211,153,0.7), transparent)",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.4s ease 0.15s",
            }}
          />

          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
            {dest.label}
          </span>
          <h3 className="font-extrabold text-xl text-white mt-1 leading-tight">
            {dest.title}
          </h3>
          <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
            {dest.subtitle}
          </p>

          {/* Glowing dot indicator */}
          <div className="flex items-center gap-2 mt-3">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{
                boxShadow: "0 0 6px 2px rgba(52,211,153,0.6)",
              }}
            />
            <span className="text-[10px] text-emerald-400/70 font-semibold tracking-wider uppercase">
              Explore
            </span>
          </div>
        </div>
      </div>
    );
  })
}

{/* ── Progress indicator dots ────────────────────────────────────── */ }
<div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
  {DESTINATIONS.map((_, idx) => (
    <span
      key={idx}
      className="block rounded-full transition-all duration-500"
      style={{
        width: activeCard === idx ? "8px" : "5px",
        height: activeCard === idx ? "8px" : "5px",
        backgroundColor:
          activeCard === idx
            ? "rgba(52,211,153,1)"
            : "rgba(255,255,255,0.35)",
        boxShadow:
          activeCard === idx
            ? "0 0 8px 3px rgba(52,211,153,0.5)"
            : "none",
        transform: activeCard === idx ? "scale(1)" : "scale(0.85)",
      }}
    />
  ))}
</div>
    </div >
  );
}
