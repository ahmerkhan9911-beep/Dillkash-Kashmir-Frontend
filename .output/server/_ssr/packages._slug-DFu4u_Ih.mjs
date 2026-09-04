import { n as __toESM } from "../_runtime.mjs";
import { c as whatsappLink, i as pickupPoints, n as formatPKR, o as site } from "./site-Dg0SHnY9.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Phone, P as LoaderCircle, U as HandPlatter, X as Clock, at as Calendar, i as Users, k as MapPin, nt as Check, ot as Bus, st as BedDouble, t as X, tt as ChevronDown } from "../_libs/lucide-react.mjs";
import { getPackageBySlug } from "./packages-BApqLpSW.mjs";
import { n as WhatsAppIcon } from "./Navbar-P14Io8Rd.mjs";
import { t as Route } from "./packages._slug-DE8ZbPFw.mjs";
import { n as StarRating, t as BookingModal } from "./BookingModal-71ZBzTEs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages._slug-DFu4u_Ih.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var quickInfo = (tour) => [
	{
		icon: Clock,
		label: "Duration",
		value: `${tour.durationDays} Days / ${tour.durationDays - 1} Nights`
	},
	{
		icon: MapPin,
		label: "Departure",
		value: "Lahore (Thokar, Kalma Chowk, Ring Road)"
	},
	{
		icon: Bus,
		label: "Transportation",
		value: tour.transport
	},
	{
		icon: BedDouble,
		label: "Accommodation",
		value: tour.accommodation
	},
	{
		icon: HandPlatter,
		label: "Meals",
		value: tour.meals
	},
	{
		icon: Users,
		label: "Tour Type",
		value: tour.type.join(", ")
	}
];
function ItineraryAccordion({ itinerary }) {
	const [openDay, setOpenDay] = (0, import_react.useState)(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: itinerary.map((day) => {
			const isOpen = openDay === day.day;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("overflow-hidden rounded-2xl border transition-colors", isOpen ? "border-primary/40 bg-card shadow-soft" : "border-border bg-card"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpenDay(isOpen ? 0 : day.day),
					"aria-expanded": isOpen,
					className: "flex w-full items-center gap-4 px-5 py-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("grid h-10 w-10 shrink-0 place-items-center rounded-full font-heading text-sm font-extrabold transition-colors", isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
							children: ["D", day.day]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
								children: ["Day ", day.day]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-heading text-base font-bold text-foreground",
								children: day.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							size: 20,
							className: cn("shrink-0 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2.5 px-5 pb-5 pl-[4.75rem]",
							children: day.details.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2.5 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 15,
									className: "mt-0.5 shrink-0 text-primary"
								}), d]
							}, d))
						})
					})
				})]
			}, day.day);
		})
	});
}
function TourDetailPage() {
	const loaderData = Route.useLoaderData();
	const [tour, setTour] = (0, import_react.useState)(loaderData.tour);
	const [loading, setLoading] = (0, import_react.useState)(!loaderData.tour);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getPackageBySlug(loaderData.slug).then((apiTour) => setTour(apiTour)).catch(() => {}).finally(() => setLoading(false));
	}, [loaderData.slug]);
	if (loading || !tour) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			size: 32,
			className: "animate-spin text-primary"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tour.image,
					alt: tour.title,
					width: 1280,
					height: 720,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-4 pb-14 pt-36 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "mb-4 text-xs font-semibold text-white/70",
							"aria-label": "Breadcrumb",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-white",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/packages",
									className: "hover:text-white",
									children: "Packages"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white",
									children: tour.title
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-3xl font-heading text-3xl font-extrabold text-white text-balance sm:text-5xl",
							children: tour.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 }),
										" ",
										tour.durationDays,
										" Days"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }), " Departs Lahore"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 14 }),
										" Next: ",
										tour.nextDeparture
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRating, {
											rating: tour.rating,
											size: 13
										}),
										" ",
										tour.rating,
										" (",
										tour.reviews,
										")"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "rounded-2xl bg-white/10 px-5 py-3 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[11px] font-bold uppercase tracking-wide text-white/70",
										children: "Starting from"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-heading text-2xl font-extrabold text-white",
										children: formatPKR(tour.price)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setModalOpen(true),
									className: "rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105",
									children: "Book Now"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink(`Hi Al Kareem Travel! I want to book: ${tour.title}`),
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-105",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 18 }), "WhatsApp"]
								})
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-14 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-3",
					children: quickInfo(tour).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(q.icon, { size: 19 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
								children: q.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-sm font-semibold text-foreground",
								children: q.value
							})]
						})]
					}, q.label))
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
						children: "Day-by-Day Itinerary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItineraryAccordion, { itinerary: tour.itinerary })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-full rounded-3xl border border-border bg-card p-6 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-heading text-xl font-extrabold text-foreground",
							children: "What's Included"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: tour.included.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 })
								}), item]
							}, item))
						})]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-full rounded-3xl border border-border bg-card p-6 shadow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-heading text-xl font-extrabold text-foreground",
								children: "What's Not Included"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-3",
								children: tour.notIncluded.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
									}), item]
								}, item))
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
						children: "Lahore Pickup Points"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-3",
						children: pickupPoints.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-hover rounded-2xl border border-border bg-card p-5 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-heading text-base font-bold text-foreground",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: p.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground",
									children: ["Pickup ", p.time]
								})
							]
						}, p.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
						children: "Gallery"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4",
						children: tour.gallery.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "img-zoom aspect-[4/3] overflow-hidden rounded-2xl shadow-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img,
								alt: `${tour.title} — photo ${i + 1}`,
								width: 1280,
								height: 720,
								loading: "lazy",
								className: "h-full w-full object-cover"
							})
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-14 pb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-6 rounded-[2rem] bg-primary px-6 py-10 text-center shadow-lift sm:flex-row sm:justify-between sm:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-heading text-2xl font-extrabold text-primary-foreground",
							children: [
								"Ready for ",
								tour.destinations[0],
								"?"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-primary-foreground/85",
							children: [
								"Seats fill fast for the ",
								tour.nextDeparture,
								" departure. Reserve yours today."
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setModalOpen(true),
								className: "rounded-full bg-background px-7 py-3.5 text-sm font-bold text-foreground transition-transform hover:scale-105",
								children: "Book This Tour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: site.phoneHref,
								className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 }), site.phone]
							})]
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModal, {
			open: modalOpen,
			onClose: () => setModalOpen(false),
			preselectedTour: tour
		})
	] });
}
//#endregion
export { TourDetailPage as component };
