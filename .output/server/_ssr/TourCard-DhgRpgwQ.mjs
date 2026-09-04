import { n as __toESM } from "../_runtime.mjs";
import { c as whatsappLink, n as formatPKR } from "./site-Dg0SHnY9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, X as Clock, at as Calendar, et as ChevronLeft, k as MapPin, z as Images } from "../_libs/lucide-react.mjs";
import { n as WhatsAppIcon } from "./Navbar-P14Io8Rd.mjs";
import { n as StarRating } from "./BookingModal-71ZBzTEs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TourCard-DhgRpgwQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TourCard({ tour, onBook }) {
	const galleryImages = (tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image]).filter(Boolean);
	const imagesList = galleryImages.length > 0 ? galleryImages : [tour.image];
	const hasMultipleImages = imagesList.length > 1;
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const touchStartX = (0, import_react.useRef)(null);
	const touchEndX = (0, import_react.useRef)(null);
	const handlePrev = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex((prev) => prev === 0 ? imagesList.length - 1 : prev - 1);
	};
	const handleNext = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex((prev) => prev === imagesList.length - 1 ? 0 : prev + 1);
	};
	const handleDotClick = (index, e) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex(index);
	};
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
		touchEndX.current = null;
	};
	const handleTouchMove = (e) => {
		touchEndX.current = e.touches[0].clientX;
	};
	const handleTouchEnd = (e) => {
		if (!touchStartX.current || !touchEndX.current) return;
		const diff = touchStartX.current - touchEndX.current;
		if (diff > 40) {
			e.stopPropagation();
			setCurrentIndex((prev) => prev === imagesList.length - 1 ? 0 : prev + 1);
		} else if (diff < -40) {
			e.stopPropagation();
			setCurrentIndex((prev) => prev === 0 ? imagesList.length - 1 : prev - 1);
		}
		touchStartX.current = null;
		touchEndX.current = null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-hover group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] overflow-hidden bg-muted select-none",
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full transition-transform duration-300 ease-out",
					style: { transform: `translateX(-${currentIndex * 100}%)` },
					children: imagesList.map((imgSrc, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-full w-full flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imgSrc,
							alt: `${tour.title} - Photo ${idx + 1}`,
							width: 1280,
							height: 720,
							loading: idx === 0 ? "eager" : "lazy",
							className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						})
					}, `${tour.slug}-img-${idx}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 top-3 z-20 flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								size: 12,
								className: "mr-1 inline-block"
							}),
							tour.durationDays,
							" Days"
						]
					}), tour.type?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur shadow-sm",
						children: tour.type[0]
					})]
				}),
				hasMultipleImages && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { size: 11 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						currentIndex + 1,
						"/",
						imagesList.length
					] })]
				}),
				hasMultipleImages && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handlePrev,
						"aria-label": "Previous photo",
						className: "absolute left-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-200 hover:bg-black/80 hover:scale-110 opacity-0 group-hover:opacity-100 sm:opacity-0 focus:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleNext,
						"aria-label": "Next photo",
						className: "absolute right-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-200 hover:bg-black/80 hover:scale-110 opacity-0 group-hover:opacity-100 sm:opacity-0 focus:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5",
						children: imagesList.map((_, dotIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => handleDotClick(dotIdx, e),
							"aria-label": `Go to slide ${dotIdx + 1}`,
							className: `rounded-full transition-all duration-300 ${currentIndex === dotIdx ? "h-1.5 w-5 bg-white shadow-md" : "h-1.5 w-1.5 bg-white/55 hover:bg-white/90 hover:scale-125"}`
						}, `dot-${dotIdx}`))
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, {
						rating: tour.rating,
						size: 14
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-muted-foreground",
						children: [
							tour.rating,
							" (",
							tour.reviews,
							" reviews)"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-heading text-lg font-bold leading-snug text-foreground",
					children: tour.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 line-clamp-2 text-sm text-muted-foreground",
					children: tour.short
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: tour.destinations.slice(0, 4).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 10 }), d]
					}, d))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Starting from"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-heading text-xl font-extrabold text-primary",
						children: formatPKR(tour.price)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							size: 13,
							className: "text-primary"
						}), tour.nextDeparture]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/packages/$slug",
						params: { slug: tour.slug },
						className: "rounded-xl border border-primary py-2.5 text-center text-sm font-bold text-primary transition-colors hover:bg-secondary",
						children: "View Itinerary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onBook ? onBook(tour) : window.open(whatsappLink(`Hi Al Kareem Travel! I want to book: ${tour.title}`), "_blank", "noopener"),
						className: "inline-flex items-center justify-center gap-1.5 rounded-xl bg-whatsapp py-2.5 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.03]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 15 }), "Book Now"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { TourCard as t };
