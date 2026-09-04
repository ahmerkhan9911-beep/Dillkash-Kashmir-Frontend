import { n as __toESM } from "../_runtime.mjs";
import { c as whatsappLink, o as site } from "./site-Dg0SHnY9.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mail, C as Phone, X as Clock, k as MapPin } from "../_libs/lucide-react.mjs";
import { t as AuthProvider } from "./AuthContext-BQtB4ALz.mjs";
import { t as dillkash_logo_horizontal_default } from "./dillkash-logo-horizontal-gZmcQUGi.mjs";
import { n as WhatsAppIcon, t as Navbar } from "./Navbar-P14Io8Rd.mjs";
import { t as Route$20 } from "./destinations._id.edit-BDOFnhO7.mjs";
import { t as Route$21 } from "./hotels._id.edit-BUTCSOlB.mjs";
import { t as Route$22 } from "./packages._id.edit-mh7s_jzB.mjs";
import { t as Route$23 } from "./packages._slug-DE8ZbPFw.mjs";
import { t as Route$24 } from "./packages.index-zYMGNX-m.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DKlCiIaF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles--5p5zPQQ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var companyLinks = [
	{
		label: "About Us",
		href: "/about"
	},
	{
		label: "Kashmir Packages",
		href: "/packages"
	},
	{
		label: "Custom Tours",
		href: "/custom-tour"
	},
	{
		label: "Contact",
		href: "/contact"
	}
];
var destinationLinks = [
	"Neelum Valley",
	"Arang Kel",
	"Ratti Gali",
	"Sharda",
	"Taobat",
	"Keran"
];
var socials = [
	{
		label: "Facebook",
		icon: "f",
		href: "https://facebook.com"
	},
	{
		label: "Instagram",
		icon: "ig",
		href: "https://instagram.com"
	},
	{
		label: "TikTok",
		icon: "tt",
		href: "https://tiktok.com"
	},
	{
		label: "YouTube",
		icon: "yt",
		href: "https://youtube.com"
	}
];
function SocialGlyph({ icon }) {
	const cls = "h-4 w-4";
	switch (icon) {
		case "f": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: cls,
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" })
		});
		case "ig": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: cls,
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5Zm6.4-9.65a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0Z" })
		});
		case "tt": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: cls,
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.31-2.84V9.35a6.35 6.35 0 1 0 5.76 6.32V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75c-.61 0-1.2-.02-1-.06Z" })
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: cls,
			viewBox: "0 0 24 24",
			fill: "currentColor",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" })
		});
	}
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-foreground text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center rounded-xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: dillkash_logo_horizontal_default,
							alt: "DillKash Kashmir",
							className: "h-14 w-auto object-contain"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-primary-foreground/70",
						children: "Premium & budget-friendly Kashmir tour packages departing weekly from Lahore. Trusted by thousands of travelers for safe, all-inclusive journeys to Neelum Valley and beyond."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex gap-2",
						children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": s.label,
							className: "grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialGlyph, { icon: s.icon })
						}, s.label))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Company",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-heading text-sm font-bold uppercase tracking-widest text-primary",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5",
						children: companyLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.href,
							className: "text-sm text-primary-foreground/70 transition-colors hover:text-primary",
							children: l.label
						}) }, l.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Popular destinations",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-heading text-sm font-bold uppercase tracking-widest text-primary",
						children: "Popular Destinations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5",
						children: destinationLinks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/packages",
							className: "text-sm text-primary-foreground/70 transition-colors hover:text-primary",
							children: d
						}) }, d))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-heading text-sm font-bold uppercase tracking-widest text-primary",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-primary-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 16,
								className: "mt-0.5 shrink-0 text-primary"
							}), site.address]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
								size: 16,
								className: "shrink-0 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: site.phoneHref,
								className: "hover:text-primary",
								children: site.phone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: whatsappLink(),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:text-primary",
								children: "WhatsApp Booking"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								size: 16,
								className: "shrink-0 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site.email}`,
								className: "hover:text-primary",
								children: site.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								size: 16,
								className: "mt-0.5 shrink-0 text-primary"
							}), site.hours]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-7xl px-4 py-5 text-center text-xs text-primary-foreground/50 sm:px-6",
				children: "© 2026 Al Kareem Travel & Tours. All Rights Reserved."
			})
		})]
	});
}
/** Fixed WhatsApp button on every page + mobile sticky booking CTA. */
function WhatsAppFloat() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: whatsappLink(),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat on WhatsApp",
		className: "whatsapp-pulse fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:scale-110 sm:bottom-6 sm:right-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 28 })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md sm:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/packages",
			className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-cta",
			children: "Book Your Kashmir Tour"
		})
	})] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Al Kareem Travel & Tours — Kashmir Tours from Lahore" },
			{
				name: "description",
				content: "Premium & budget-friendly Kashmir tour packages departing weekly from Lahore. Neelum Valley, Arang Kel, Ratti Gali, Sharda, Taobat & more with all-inclusive pricing."
			},
			{
				name: "author",
				content: "Al Kareem Travel & Tours"
			},
			{
				property: "og:title",
				content: "Al Kareem Travel & Tours — Kashmir Tours from Lahore"
			},
			{
				property: "og:description",
				content: "Hassle-free weekly departures from Lahore to Neelum Valley, Arang Kel, Ratti Gali & beyond."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "icon",
				href: "/favicon-32.png",
				type: "image/png",
				sizes: "32x32"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon-192.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isAdmin = pathname.startsWith("/admin");
	const isAuth = pathname === "/login" || pathname === "/signup";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			!isAdmin && !isAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			!isAdmin && !isAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFloat, {})
		]
	}) });
}
var $$splitComponentImporter$18 = () => import("./routes-Cy8WuoE3.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Al Kareem Travel & Tours — Kashmir Tours from Lahore" },
		{
			name: "description",
			content: "Experience Majestic Kashmir — weekly tours from Lahore to Neelum Valley, Arang Kel, Ratti Gali & beyond. All-inclusive packages, luxury transport, verified hotels."
		},
		{
			property: "og:title",
			content: "Al Kareem Travel & Tours — Kashmir Tours from Lahore"
		},
		{
			property: "og:description",
			content: "Weekly Lahore departures to Neelum Valley, Arang Kel, Ratti Gali & beyond. All-inclusive premium & budget packages."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./about-DIe8RZCo.mjs");
var Route$17 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us — Al Kareem Travel & Tours" },
		{
			name: "description",
			content: "Lahore-based travel company specializing in Azad Jammu & Kashmir tours. Meet our fleet, safety policies and the team behind thousands of happy Kashmir journeys."
		},
		{
			property: "og:title",
			content: "About Us — Al Kareem Travel & Tours"
		},
		{
			property: "og:description",
			content: "Lahore-based Kashmir tour specialists with our own fleet, verified hotels and professional tour managers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin-CVf9cffi.mjs");
var Route$16 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Dashboard — DillKash Kashmir" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./contact-Bd61sCyJ.mjs");
var Route$15 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Us — Al Kareem Travel & Tours, Lahore" },
		{
			name: "description",
			content: "Get in touch with Al Kareem Travel & Tours in Lahore. Call, WhatsApp or visit our office to plan your Kashmir tour — open 7 days a week."
		},
		{
			property: "og:title",
			content: "Contact Us — Al Kareem Travel & Tours, Lahore"
		},
		{
			property: "og:description",
			content: "Call, WhatsApp or visit our Lahore office to plan your Kashmir tour."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./custom-tour-Cri-aO2g.mjs");
var Route$14 = createFileRoute("/custom-tour")({
	head: () => ({ meta: [
		{ title: "Plan a Custom Kashmir Tour — Al Kareem Travel & Tours" },
		{
			name: "description",
			content: "Design your own Kashmir itinerary from Lahore — perfect for families, private groups and corporate trips. Choose your dates, destinations and hotel standard."
		},
		{
			property: "og:title",
			content: "Plan a Custom Kashmir Tour — Al Kareem Travel & Tours"
		},
		{
			property: "og:description",
			content: "Custom Kashmir itineraries from Lahore for families, private groups and corporate trips."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./hotels-BRjLjUZa.mjs");
var Route$13 = createFileRoute("/hotels")({
	head: () => ({ meta: [
		{ title: "Kashmir Hotels — Luxury to Budget Stays | DillKash Kashmir" },
		{
			name: "description",
			content: "Browse and book standalone hotels across Kashmir — from 5-star luxury resorts in Muzaffarabad to cozy guest houses in Arang Kel. Filter by star rating, location, price & amenities."
		},
		{
			property: "og:title",
			content: "Kashmir Hotels — Luxury to Budget Stays | DillKash Kashmir"
		},
		{
			property: "og:description",
			content: "Find your perfect stay in Kashmir. 5-star luxury resorts, riverside hotels, and budget-friendly guest houses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./login-DPeEuHEH.mjs");
var Route$12 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login — DillKash Kashmir" }, {
		name: "description",
		content: "Log in to your DillKash Kashmir account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./packages-BNLFs_o1.mjs");
var Route$11 = createFileRoute("/packages")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./signup-Cj6xWhIK.mjs");
var Route$10 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Create Account — DillKash Kashmir" }, {
		name: "description",
		content: "Sign up for a DillKash Kashmir account to access tour bookings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin-B87SpIcx.mjs");
var Route$9 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./hotels-tVSrouNF.mjs");
var Route$8 = createFileRoute("/admin/hotels")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./packages-DB8lF8K3.mjs");
var Route$7 = createFileRoute("/admin/packages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./destinations.index-Dlxc-Vn6.mjs");
var Route$6 = createFileRoute("/admin/destinations/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./destinations.create-7OYcZFDT.mjs");
var Route$5 = createFileRoute("/admin/destinations/create")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./guides.index-Fl5fR4H1.mjs");
var Route$4 = createFileRoute("/admin/guides/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./hotels.index-BcEhBPNF.mjs");
var Route$3 = createFileRoute("/admin/hotels/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./hotels.create-CHRIo6tH.mjs");
var Route$2 = createFileRoute("/admin/hotels/create")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./packages.index-262ZoTxW.mjs");
var Route$1 = createFileRoute("/admin/packages/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./packages.create-Cktd6Cqu.mjs");
var Route = createFileRoute("/admin/packages/create")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$17.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var AdminRoute = Route$16.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$15.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var CustomTourRoute = Route$14.update({
	id: "/custom-tour",
	path: "/custom-tour",
	getParentRoute: () => Route$19
});
var HotelsRoute = Route$13.update({
	id: "/hotels",
	path: "/hotels",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var PackagesRoute = Route$11.update({
	id: "/packages",
	path: "/packages",
	getParentRoute: () => Route$19
});
var SignupRoute = Route$10.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminHotelsRoute = Route$8.update({
	id: "/hotels",
	path: "/hotels",
	getParentRoute: () => AdminRoute
});
var AdminPackagesRoute = Route$7.update({
	id: "/packages",
	path: "/packages",
	getParentRoute: () => AdminRoute
});
var PackagesIndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => PackagesRoute
});
var PackagesSlugRoute = Route$23.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => PackagesRoute
});
var AdminDestinationsIndexRoute = Route$6.update({
	id: "/destinations/",
	path: "/destinations/",
	getParentRoute: () => AdminRoute
});
var AdminDestinationsCreateRoute = Route$5.update({
	id: "/destinations/create",
	path: "/destinations/create",
	getParentRoute: () => AdminRoute
});
var AdminGuidesIndexRoute = Route$4.update({
	id: "/guides/",
	path: "/guides/",
	getParentRoute: () => AdminRoute
});
var AdminHotelsIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminHotelsRoute
});
var AdminHotelsCreateRoute = Route$2.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => AdminHotelsRoute
});
var AdminPackagesIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminPackagesRoute
});
var AdminPackagesCreateRoute = Route.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => AdminPackagesRoute
});
var AdminDestinationsIdEditRoute = Route$20.update({
	id: "/destinations/$id/edit",
	path: "/destinations/$id/edit",
	getParentRoute: () => AdminRoute
});
var AdminHotelsIdEditRoute = Route$21.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => AdminHotelsRoute
});
var AdminPackagesIdEditRoute = Route$22.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => AdminPackagesRoute
});
var AdminHotelsRouteChildren = {
	AdminHotelsCreateRoute,
	AdminHotelsIndexRoute,
	AdminHotelsIdEditRoute
};
var AdminHotelsRouteWithChildren = AdminHotelsRoute._addFileChildren(AdminHotelsRouteChildren);
var AdminPackagesRouteChildren = {
	AdminPackagesCreateRoute,
	AdminPackagesIndexRoute,
	AdminPackagesIdEditRoute
};
var AdminRouteChildren = {
	AdminHotelsRoute: AdminHotelsRouteWithChildren,
	AdminPackagesRoute: AdminPackagesRoute._addFileChildren(AdminPackagesRouteChildren),
	AdminIndexRoute,
	AdminDestinationsCreateRoute,
	AdminDestinationsIndexRoute,
	AdminGuidesIndexRoute,
	AdminDestinationsIdEditRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var PackagesRouteChildren = {
	PackagesSlugRoute,
	PackagesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	ContactRoute,
	CustomTourRoute,
	HotelsRoute,
	LoginRoute,
	PackagesRoute: PackagesRoute._addFileChildren(PackagesRouteChildren),
	SignupRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
