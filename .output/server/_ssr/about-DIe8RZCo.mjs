import { n as __toESM } from "../_runtime.mjs";
import { i as pickupPoints, r as images } from "./site-Dg0SHnY9.mjs";
import { t as resolveImageUrl } from "./resolveImage-BSOQr9n2.mjs";
import { i as getGuides } from "./guides-Ba4CryA6.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { t as SectionHeader } from "./SectionHeader-C9AT2Ppx.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as MessageCircle, H as HeartHandshake, K as Facebook, L as Instagram, W as Globe, ct as BadgeCheck, h as ShieldCheck, i as Users, k as MapPin, ot as Bus, rt as Car, ut as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DIe8RZCo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fleet = [
	{
		icon: Bus,
		name: "Saloon Coasters",
		detail: "AC, pushback seats — the backbone of our group tours from Lahore."
	},
	{
		icon: Bus,
		name: "Grand Cabin",
		detail: "Premium hi-roof cabins for smaller groups and private trips."
	},
	{
		icon: Car,
		name: "Prado",
		detail: "Comfortable 4x4 for families & executives on rough stretches."
	},
	{
		icon: Car,
		name: "Fortuner",
		detail: "Power and comfort combined for long mountain journeys."
	},
	{
		icon: Car,
		name: "4x4 Jeeps",
		detail: "Essential for Ratti Gali, Taobat and Baboon Valley terrain."
	}
];
var trust = [
	{
		icon: ShieldCheck,
		title: "Safety First",
		text: "Experienced mountain drivers, vehicle inspections before every departure, and first aid kits on board."
	},
	{
		icon: BadgeCheck,
		title: "Verified Hotels",
		text: "Every hotel in Keran, Sharda and Kutton is personally inspected by our team each season."
	},
	{
		icon: Users,
		title: "Professional Tour Managers",
		text: "A dedicated tour manager travels with every group from Lahore pickup to drop-off."
	},
	{
		icon: HeartHandshake,
		title: "Transparent Pricing",
		text: "The price you see is the price you pay — transport, meals, stays and jeep rides included."
	}
];
function AboutPage() {
	const [guides, setGuides] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getGuides().then(setGuides).catch(console.error);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images.taobat,
					alt: "Taobat village, Neelum Valley",
					width: 1280,
					height: 720,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl",
						children: "About Al Kareem Travel & Tours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-base text-white/85",
						children: "A Lahore-based team of Kashmir specialists, running safe and memorable mountain journeys since our very first coaster."
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "img-zoom overflow-hidden rounded-[2rem] shadow-lift",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images.keran,
						alt: "Keran, Neelum Valley — one of our home destinations",
						width: 1280,
						height: 720,
						loading: "lazy",
						className: "h-full w-full object-cover"
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 120,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							align: "left",
							eyebrow: "Our Story",
							title: "Born in Lahore, at Home in Kashmir",
							subtitle: "Al Kareem Travel & Tours started with a single coaster and a simple promise: make the paradise of Azad Jammu & Kashmir accessible to every family in Lahore."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-base leading-relaxed text-muted-foreground",
							children: "Today we run weekly departures to Neelum Valley, Arang Kel, Ratti Gali, Sharda and Taobat — with our own fleet, hand-picked hotels and tour managers who treat every traveler like family. Thousands of travelers later, that promise hasn't changed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-3 gap-4",
							children: [
								{
									n: "5,000+",
									l: "Happy Travelers"
								},
								{
									n: "120+",
									l: "Tours Completed"
								},
								{
									n: "4.9★",
									l: "Average Rating"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-4 text-center shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-heading text-2xl font-extrabold text-primary",
									children: s.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-semibold text-muted-foreground",
									children: s.l
								})]
							}, s.l))
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/40 py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Trust",
					title: "Why Travelers Trust Us",
					subtitle: "Safety, transparency and local expertise on every single departure."
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: trust.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-hover h-full rounded-3xl border border-border bg-card p-6 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-13 w-13 place-items-center rounded-2xl bg-secondary text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { size: 26 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-heading text-lg font-bold text-foreground",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: t.text
								})
							]
						})
					}, t.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Our Fleet",
				title: "The Right Vehicle for Every Road",
				subtitle: "From motorway comfort to 4x4 mountain terrain — our own maintained fleet, no third-party surprises."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5",
				children: fleet.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-hover h-full rounded-3xl border border-border bg-card p-6 text-center shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { size: 26 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-heading text-base font-bold text-foreground",
								children: f.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: f.detail
							})
						]
					})
				}, f.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/40 py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Our Team",
					title: "Meet Our Expert Tour Guides",
					subtitle: "Passionate locals who turn every Kashmir journey into an unforgettable story."
				}) }), guides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
					children: guides.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg aspect-[3/4]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveImageUrl(g.imageUrl),
									alt: g.name,
									loading: "lazy",
									className: "w-full h-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-0 w-full p-6 flex flex-col items-center text-center transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold text-white tracking-wide",
											children: g.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-emerald-400 font-medium text-sm mt-1",
											children: [
												g.role,
												" • ",
												g.experience,
												"+ Years"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4 mt-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "#",
													"aria-label": `${g.name} on Facebook`,
													className: "text-gray-300 hover:text-white transition-colors cursor-pointer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { size: 20 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "#",
													"aria-label": `${g.name} on Instagram`,
													className: "text-gray-300 hover:text-white transition-colors cursor-pointer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 20 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "#",
													"aria-label": `Chat with ${g.name}`,
													className: "text-gray-300 hover:text-white transition-colors cursor-pointer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 20 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "#",
													"aria-label": `${g.name}'s website`,
													className: "text-gray-300 hover:text-white transition-colors cursor-pointer",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 20 })
												})
											]
										})
									]
								})
							]
						})
					}, g.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-foreground py-20 text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						dark: true,
						eyebrow: "Departures",
						title: "Weekly Departures from Lahore",
						subtitle: "Three pickup points across the city, on-time departures, and a tour manager waiting to welcome you aboard."
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-4 sm:grid-cols-3",
						children: pickupPoints.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 80,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/20 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 20 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-heading text-lg font-bold",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-primary-foreground/60",
										children: p.detail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold",
										children: ["Departs ", p.time]
									})
								]
							})
						}, p.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "mt-10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/packages",
							className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-105",
							children: ["Explore Our Packages", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
