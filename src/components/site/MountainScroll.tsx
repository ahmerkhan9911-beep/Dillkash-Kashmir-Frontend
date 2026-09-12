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
