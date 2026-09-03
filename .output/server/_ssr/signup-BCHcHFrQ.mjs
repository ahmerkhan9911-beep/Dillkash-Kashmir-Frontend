import { n as __toESM } from "../_runtime.mjs";
import { t as hero_kashmir_default } from "./hero-kashmir-nyUQ_9UT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Eye, R as EyeOff, a as UserPlus, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./AuthContext-BQtB4ALz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-BCHcHFrQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignupPage() {
	const { signup, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: ""
	});
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	if (isAuthenticated && !success) {
		navigate({ to: "/" });
		return null;
	}
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const validate = () => {
		const errs = {};
		if (form.full_name.trim().length < 2) errs["full_name"] = "Please enter your full name";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs["email"] = "Enter a valid email address";
		if (!/^(\+?92|0)?\d{10,11}$/.test(form.phone.replace(/[\s-]/g, ""))) errs["phone"] = "Enter a valid phone number (e.g. 03001234567)";
		if (form.password.length < 6) errs["password"] = "Password must be at least 6 characters";
		if (form.password !== form.confirm_password) errs["confirm_password"] = "Passwords do not match";
		setFieldErrors(errs);
		return Object.keys(errs).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!validate()) return;
		setLoading(true);
		try {
			await signup(form);
			setSuccess(true);
			setTimeout(() => navigate({ to: "/" }), 1500);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Signup failed");
		} finally {
			setLoading(false);
		}
	};
	const inputCls = (field) => `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${fieldErrors[field] ? "border-destructive" : "border-input"}`;
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-screen items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_kashmir_default,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-border bg-card/95 p-8 text-center shadow-lift backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "32",
							height: "32",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "3",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-2xl font-extrabold text-foreground",
						children: "Account Created!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Welcome to DillKash Kashmir. Redirecting you now..."
					})
				]
			}) })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-screen items-center justify-center py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_kashmir_default,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-border bg-card/95 p-8 shadow-lift backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 26 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-heading text-2xl font-extrabold text-foreground",
								children: "Create Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Join DillKash Kashmir for exclusive tour access"
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						noValidate: true,
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-name",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Full Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "su-name",
									type: "text",
									value: form.full_name,
									onChange: (e) => set("full_name", e.target.value),
									placeholder: "Muhammad Ahmad",
									autoComplete: "name",
									className: inputCls("full_name")
								}),
								fieldErrors["full_name"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: fieldErrors["full_name"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-email",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "su-email",
									type: "email",
									value: form.email,
									onChange: (e) => set("email", e.target.value),
									placeholder: "you@example.com",
									autoComplete: "email",
									className: inputCls("email")
								}),
								fieldErrors["email"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: fieldErrors["email"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-phone",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Phone Number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "su-phone",
									type: "tel",
									value: form.phone,
									onChange: (e) => set("phone", e.target.value),
									placeholder: "0300 1234567",
									autoComplete: "tel",
									className: inputCls("phone")
								}),
								fieldErrors["phone"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: fieldErrors["phone"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-password",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "su-password",
										type: showPassword ? "text" : "password",
										value: form.password,
										onChange: (e) => set("password", e.target.value),
										placeholder: "At least 6 characters",
										autoComplete: "new-password",
										className: `${inputCls("password")} pr-12`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
										"aria-label": showPassword ? "Hide password" : "Show password",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
									})]
								}),
								fieldErrors["password"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: fieldErrors["password"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-confirm",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Confirm Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "su-confirm",
									type: "password",
									value: form.confirm_password,
									onChange: (e) => set("confirm_password", e.target.value),
									placeholder: "Re-enter your password",
									autoComplete: "new-password",
									className: inputCls("confirm_password")
								}),
								fieldErrors["confirm_password"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: fieldErrors["confirm_password"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: loading,
								className: "mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									size: 18,
									className: "animate-spin"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 18 }), loading ? "Creating Account..." : "Create Account"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "font-bold text-primary hover:underline",
								children: "Sign In"
							})
						]
					})
				]
			}) })
		]
	});
}
//#endregion
export { SignupPage as component };
