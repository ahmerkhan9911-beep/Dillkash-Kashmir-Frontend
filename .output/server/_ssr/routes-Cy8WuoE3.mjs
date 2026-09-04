import { n as __toESM } from "../_runtime.mjs";
import { a as reviews, c as whatsappLink, i as pickupPoints, r as images, s as tours, t as destinations } from "./site-Dg0SHnY9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { t as SectionHeader } from "./SectionHeader-C9AT2Ppx.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, E as Mountain, H as HeartHandshake, S as Play, U as HandPlatter, ct as BadgeCheck, et as ChevronLeft, h as ShieldCheck, i as Users, it as Camera, k as MapPin, ot as Bus, r as Wallet, st as BedDouble, t as X, ut as ArrowRight, v as Search, z as Images } from "../_libs/lucide-react.mjs";
import { n as WhatsAppIcon } from "./Navbar-P14Io8Rd.mjs";
import { a as getDestinations } from "./destinations-DX0_kpyq.mjs";
import { n as StarRating, t as BookingModal } from "./BookingModal-71ZBzTEs.mjs";
import { t as TourCard } from "./TourCard-DhgRpgwQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cy8WuoE3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DestinationGalleryModal({ destination, onClose }) {
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setActiveIndex(0);
	}, [destination]);
	const images = destination?.gallery && destination.gallery.length > 0 ? destination.gallery : destination?.cover_image ? [destination.cover_image] : [];
	const handlePrev = (0, import_react.useCallback)(() => {
		if (images.length <= 1) return;
		setActiveIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
	}, [images.length]);
	const handleNext = (0, import_react.useCallback)(() => {
		if (images.length <= 1) return;
		setActiveIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
	}, [images.length]);
	(0, import_react.useEffect)(() => {
		if (!destination) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
			else if (e.key === "ArrowLeft") handlePrev();
			else if (e.key === "ArrowRight") handleNext();
		};
		window.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [
		destination,
		onClose,
		handlePrev,
		handleNext
	]);
	if (!destination) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `${destination.name} Gallery`,
		className: "fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-6",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), "Azad Kashmir"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-heading text-xl font-extrabold text-white sm:text-2xl",
								children: destination.name
							}),
							images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { size: 12 }),
									activeIndex + 1,
									" / ",
									images.length
								]
							})
						]
					}), destination.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 max-w-2xl text-sm leading-relaxed text-white/70",
						children: destination.description
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95",
					"aria-label": "Close gallery",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 22 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative my-4 flex flex-1 items-center justify-center overflow-hidden",
				children: [images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex h-full max-h-[70vh] w-full max-w-5xl items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images[activeIndex],
						alt: `${destination.name} - Photo ${activeIndex + 1}`,
						className: "max-h-full max-w-full rounded-2xl object-contain shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
					}, images[activeIndex])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-white/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No photos available for this destination." })
				}), images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.stopPropagation();
						handlePrev();
					},
					className: "absolute left-2 sm:left-6 grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 active:scale-95 border border-white/10",
					"aria-label": "Previous photo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.stopPropagation();
						handleNext();
					},
					className: "absolute right-2 sm:right-6 grid h-12 w-12 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 active:scale-95 border border-white/10",
					"aria-label": "Next photo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 24 })
				})] })]
			}),
			images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex max-w-full gap-2.5 overflow-x-auto rounded-2xl bg-white/5 p-2 backdrop-blur-md border border-white/10 scrollbar-none",
					children: images.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveIndex(idx),
						className: `relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-xl transition-all ${idx === activeIndex ? "ring-2 ring-primary ring-offset-2 ring-offset-black scale-105 opacity-100 shadow-md" : "opacity-50 hover:opacity-90 hover:scale-100"}`,
						"aria-label": `View photo ${idx + 1}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: `Thumbnail ${idx + 1}`,
							className: "h-full w-full object-cover"
						})
					}, idx))
				})
			})
		]
	});
}
function Hero({ onSearch }) {
	const [duration, setDuration] = (0, import_react.useState)("5 Days");
	const [type, setType] = (0, import_react.useState)("Family");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-[92vh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images.heroKashmir,
					alt: "Neelum Valley, Azad Kashmir — emerald river winding through green mountains",
					width: 1920,
					height: 1080,
					fetchPriority: "high",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-4 pb-40 pt-32 text-center sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { size: 14 }), "Weekly Departures from Lahore"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-4xl font-heading text-4xl font-extrabold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl",
							children: "Experience Majestic Kashmir – Tours Departing Weekly from Lahore!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg",
							children: "Hassle-free, premium & budget-friendly tour packages to Neelum Valley, Arang Kel, Ratti Gali & beyond with Al Kareem Travel & Tours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/packages",
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105",
								children: ["Explore Kashmir Tours", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: whatsappLink(),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-cta transition-transform hover:scale-105",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 18 }), "Book on WhatsApp"]
							})]
						})
					] })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto -mt-32 max-w-4xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 150,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						onSearch(duration, type);
					},
					className: "grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-lift sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "hs-duration",
							className: "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground",
							children: "Tour Duration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "hs-duration",
							value: duration,
							onChange: (e) => setDuration(e.target.value),
							className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "3 Days" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "5 Days" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "7 Days" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "hs-type",
							className: "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground",
							children: "Package Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "hs-type",
							value: type,
							onChange: (e) => setType(e.target.value),
							className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Family" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Couples" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Group" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Corporate" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "hs-city",
							className: "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground",
							children: "Departure City"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "hs-city",
							disabled: true,
							className: "w-full cursor-not-allowed rounded-xl border border-input bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Lahore" })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.03]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), "Search Tours"]
						})
					]
				})
			})
		})]
	});
}
var features = [
	{
		icon: MapPin,
		title: "Direct Pickup from Lahore",
		text: "Convenient departures from Thokar Niaz Baig, Kalma Chowk and Lahore Ring Road."
	},
	{
		icon: Bus,
		title: "Luxury & Safe Transport",
		text: "AC Saloon Coasters plus 4x4 Jeeps for difficult terrain such as Ratti Gali and Taobat."
	},
	{
		icon: HeartHandshake,
		title: "Family & Couple Friendly",
		text: "Separate rooms, verified hotels and professional tour guides on every trip."
	},
	{
		icon: Wallet,
		title: "All-Inclusive Pricing",
		text: "Transport, meals, accommodation and required jeep rides included — no hidden costs."
	}
];
function WhyChooseUs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Why Choose Us",
			title: "Why Travel With Al Kareem Travel & Tours?",
			subtitle: "We handle everything from Lahore pickup to Kashmir drop-off, so you can focus on the views."
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
			children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-hover h-full rounded-3xl border border-border bg-card p-6 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-13 w-13 place-items-center rounded-2xl bg-secondary text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { size: 26 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-heading text-lg font-bold text-foreground",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: f.text
						})
					]
				})
			}, f.title))
		})]
	});
}
function PopularPackages({ onBook }) {
	const [featured, setFeatured] = (0, import_react.useState)(tours.filter((t) => t.featured));
	(0, import_react.useEffect)(() => {
		import("./packages-BApqLpSW.mjs").then(({ getPackages }) => {
			getPackages().then((pkgs) => {
				const feat = pkgs.filter((t) => t.featured);
				if (feat.length > 0) setFeatured(feat);
			}).catch(() => {});
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-secondary/40 py-20 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Best Sellers",
					title: "Popular Kashmir Tour Packages",
					subtitle: "Hand-crafted itineraries with weekly departures from Lahore — pick your perfect Kashmir escape."
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: featured.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourCard, {
							tour: t,
							onBook
						})
					}, t.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/packages",
						className: "inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
						children: ["View All Kashmir Packages", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
					})
				})
			]
		})
	});
}
function Destinations() {
	const [destList, setDestList] = (0, import_react.useState)([]);
	const [selectedDestination, setSelectedDestination] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getDestinations().then((data) => {
			if (data && data.length > 0) setDestList(data);
		}).catch((err) => {
			console.error("Failed to load destinations from API, using fallback:", err);
		});
	}, []);
	const displayDestinations = destList.length > 0 ? destList : destinations.map((d, idx) => ({
		id: idx + 1,
		name: d.name,
		slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		description: d.description,
		cover_image: d.image,
		gallery: [d.image],
		sort_order: idx + 1,
		is_active: true
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "destinations",
		className: "mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Destinations",
				title: "Explore The Beauty of Kashmir",
				subtitle: "From alpine lakes to thundering waterfalls — the real Azad Jammu & Kashmir, curated by locals."
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: displayDestinations.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 4 * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelectedDestination(d),
						className: "card-hover group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-soft text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary",
						"aria-label": `View photos and explore ${d.name}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: d.cover_image,
								alt: `${d.name}, Azad Jammu & Kashmir`,
								width: 1280,
								height: 720,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-heading text-lg font-bold text-white",
										children: d.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 transition-all duration-500 group-hover:max-h-24",
										children: d.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 12 }),
											"View Gallery",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 12 })
										]
									})
								]
							})
						]
					})
				}, d.slug || d.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationGalleryModal, {
				destination: selectedDestination,
				onClose: () => setSelectedDestination(null)
			})
		]
	});
}
var inclusions = [
	{
		icon: Bus,
		title: "Transport",
		text: "Luxury Saloon Coaster / Grand Cabin from Lahore to Kashmir and back."
	},
	{
		icon: BedDouble,
		title: "Accommodation",
		text: "Hotel stays in destinations such as Keran, Sharda and Kutton."
	},
	{
		icon: HandPlatter,
		title: "Food & Refreshments",
		text: "Daily breakfast and quality dinners throughout the trip."
	},
	{
		icon: Mountain,
		title: "Off-Road Transfers",
		text: "4x4 Prado / Jeep transfers where the terrain demands it."
	},
	{
		icon: Users,
		title: "Tour Guidance",
		text: "An experienced tour manager with you at every step."
	},
	{
		icon: Camera,
		title: "Photography Support",
		text: "Photography assistance so you take home perfect memories."
	},
	{
		icon: ShieldCheck,
		title: "First Aid",
		text: "Basic medical kit available during all our tours."
	}
];
function Inclusions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-muted/60 py-20 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "All-Inclusive",
				title: "Everything You Need For A Perfect Kashmir Trip",
				subtitle: "One transparent price covers the journey, the stay, the food and the adventure."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: inclusions.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 4 * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-hover flex h-full items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { size: 22 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-heading text-base font-bold text-foreground",
								children: f.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted-foreground",
								children: f.text
							})]
						})]
					})
				}, f.title))
			})]
		})
	});
}
function VideoSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: images.videoThumb,
				alt: "4x4 jeeps on a mountain road in Azad Kashmir",
				width: 1920,
				height: 1080,
				loading: "lazy",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center sm:px-6 sm:py-36",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-3xl font-extrabold text-white text-balance sm:text-4xl",
						children: "Your Kashmir Adventure Starts Here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80",
						children: "Dusty jeep trails, glassy alpine lakes, riverside bonfires — see the journey our travelers take every single week."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Play Kashmir experience video",
						className: "group mx-auto mt-8 grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-cta transition-transform hover:scale-110",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							size: 30,
							className: "ml-1 fill-current"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/packages",
							className: "inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground transition-transform hover:scale-105",
							children: ["Explore Packages", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
						})
					})
				] })
			})
		]
	});
}
function Testimonials() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const visible = 3;
	const max = Math.max(0, reviews.length - visible);
	const prev = () => setIndex((i) => Math.max(0, i - 1));
	const next = () => setIndex((i) => Math.min(max, i + 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Testimonials",
				title: "What Our Travelers Say",
				subtitle: "Real reviews from families, couples and groups who traveled with us from Lahore."
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "mt-6 flex flex-wrap items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
						size: 14,
						className: "text-primary"
					}), "4.9 on Google Reviews"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
						size: 14,
						className: "text-sky-accent"
					}), "4.8 on Facebook Reviews"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-5 transition-transform duration-500 ease-out",
						style: { transform: `translateX(calc(-${index} * (100% / ${visible}) - ${index} * 1.25rem / ${visible}))` },
						children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "w-full shrink-0 rounded-3xl border border-border bg-card p-6 shadow-soft sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-heading text-sm font-extrabold text-primary-foreground",
										children: r.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-heading text-sm font-bold text-foreground",
											children: r.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, {
											rating: r.rating,
											size: 13
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-sm leading-relaxed text-muted-foreground",
									children: [
										"“",
										r.review,
										"”"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold text-secondary-foreground",
									children: r.trip
								})
							]
						}, r.name))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: prev,
						disabled: index === 0,
						"aria-label": "Previous reviews",
						className: "grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-secondary disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: next,
						disabled: index >= max,
						"aria-label": "Next reviews",
						className: "grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-secondary disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 20 })
					})]
				})]
			})
		]
	});
}
function LahoreDepartures() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-foreground py-20 text-primary-foreground sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				align: "left",
				dark: true,
				eyebrow: "Departures",
				title: "Your Kashmir Journey Starts in Lahore",
				subtitle: "Three convenient pickup points across the city — park your car safely and hop on. Our coasters leave on time, every time."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: whatsappLink("Hi Al Kareem Travel! Please share the next departure availability from Lahore."),
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105",
					children: ["Check Departure Availability", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: pickupPoints.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-primary/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/20 text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground",
									children: i + 1
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-heading text-base font-bold",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm text-primary-foreground/60",
									children: p.detail
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold",
								children: p.time
							})
						]
					}, p.name))
				})
			})]
		})
	});
}
function CustomTourCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-15",
				style: {
					backgroundImage: `url(${images.arangKel})`,
					backgroundSize: "cover",
					backgroundPosition: "center"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mx-auto max-w-2xl font-heading text-3xl font-extrabold text-primary-foreground text-balance sm:text-4xl",
						children: "Plan Your Own Kashmir Tour"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-base text-primary-foreground/85",
						children: "Perfect for families, private groups and corporate trips — tell us your dates and destinations, we'll build the itinerary."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/custom-tour",
						className: "mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-bold text-foreground shadow-lift transition-transform hover:scale-105",
						children: ["Request Custom Tour", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
					})
				]
			})]
		}) })
	});
}
function HomePage() {
	const navigate = useNavigate();
	const [bookingTour, setBookingTour] = (0, import_react.useState)();
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const openBooking = (tour) => {
		setBookingTour(tour);
		setModalOpen(true);
	};
	const handleSearch = (duration, type) => {
		const dur = duration.split(" ")[0];
		navigate({
			to: "/packages",
			search: {
				...dur ? { duration: dur } : {},
				...type ? { type } : {}
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { onSearch: handleSearch }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChooseUs, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopularPackages, { onBook: openBooking }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Destinations, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inclusions, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LahoreDepartures, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTourCTA, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModal, {
			open: modalOpen,
			onClose: () => setModalOpen(false),
			preselectedTour: bookingTour
		})
	] });
}
//#endregion
export { HomePage as component };
