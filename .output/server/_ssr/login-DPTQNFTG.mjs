import { n as __toESM } from "../_runtime.mjs";
import { t as dest_ratti_gali_default } from "./dest-ratti-gali-B7IFeZhf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ArrowRight, B as CircleCheck, L as Eye, O as Lock, R as EyeOff, T as Mail, a as UserPlus, d as ShieldCheck, i as User, k as LoaderCircle, w as MapPin, y as Phone } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./AuthContext-BQtB4ALz.mjs";
import { t as dillkash_logo_horizontal_default } from "./dillkash-logo-horizontal-gZmcQUGi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DPTQNFTG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage({ initialMode = "signin" }) {
	const { login, signup, isAuthenticated, isAdmin } = useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [showLoginPw, setShowLoginPw] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const [signupForm, setSignupForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: ""
	});
	const [showSignupPw, setShowSignupPw] = (0, import_react.useState)(false);
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isAuthenticated && !success) if (isAdmin) navigate({ to: "/admin" });
		else navigate({ to: "/" });
	}, [
		isAuthenticated,
		isAdmin,
		success,
		navigate
	]);
	if (isAuthenticated && !success) return null;
	const set = (key, value) => setSignupForm((f) => ({
		...f,
		[key]: value
	}));
	const switchMode = (next) => {
		setMode(next);
		setError("");
		setFieldErrors({});
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		if (!loginEmail.trim() || !loginPassword.trim()) {
			setError("Please enter your email and password");
			return;
		}
		setLoading(true);
		try {
			await login(loginEmail, loginPassword);
			navigate({ to: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setLoading(false);
		}
	};
	const validate = () => {
		const errs = {};
		if (signupForm.full_name.trim().length < 2) errs.full_name = "Please enter your full name";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email)) errs.email = "Enter a valid email address";
		if (!/^(\+?92|0)?\d{10,11}$/.test(signupForm.phone.replace(/[\s-]/g, ""))) errs.phone = "Enter a valid phone number (e.g. 03001234567)";
		if (signupForm.password.length < 6) errs.password = "Password must be at least 6 characters";
		if (signupForm.password !== signupForm.confirm_password) errs.confirm_password = "Passwords do not match";
		setFieldErrors(errs);
		return Object.keys(errs).length === 0;
	};
	const handleSignup = async (e) => {
		e.preventDefault();
		setError("");
		if (!validate()) return;
		setLoading(true);
		try {
			await signup(signupForm);
			setSuccess(true);
			setTimeout(() => navigate({ to: "/" }), 1500);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Signup failed");
		} finally {
			setLoading(false);
		}
	};
	const inputCls = (field) => `w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 ${field && fieldErrors[field] ? "border-red-400" : "border-gray-200"}`;
	const inputClsRight = (field) => `w-full rounded-lg border bg-white py-3 pl-11 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 ${field && fieldErrors[field] ? "border-red-400" : "border-gray-200"}`;
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center bg-cover bg-center p-4 sm:p-8",
		style: { backgroundImage: `url(${dest_ratti_gali_default})` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-teal-900/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-sm rounded-2xl bg-white p-10 text-center shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white",
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
					className: "text-2xl font-bold text-slate-800",
					children: "Account Created!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate-500",
					children: "Welcome to DillKash Kashmir. Redirecting you now…"
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center bg-cover bg-center p-4 sm:p-8",
		style: { backgroundImage: `url(${dest_ratti_gali_default})` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-teal-900/60 backdrop-blur-[2px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex w-full flex-col justify-between bg-[#064E3B] p-8 text-white md:w-[45%] md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: dillkash_logo_horizontal_default,
							alt: "DillKash Kashmir",
							className: "mb-8 h-9 brightness-0 invert"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl font-bold leading-tight md:text-3xl",
						children: [
							"Your Kashmir journey",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"starts here."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-emerald-200/80",
						children: "One account for curated packages, custom tours and member-only deals across the valley."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, { children: "Exclusive member pricing on tour packages" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, { children: "Save trips, compare plans and book in minutes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckItem, { children: "24/7 support from local Kashmir travel experts" })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex items-center gap-2 text-xs text-emerald-300/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						size: 14,
						className: "shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Neelum Valley • Arang Kel • Ratti Gali • Taobat" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full flex-col justify-center bg-white p-8 md:w-[55%] md:p-10 lg:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mb-8 flex w-fit rounded-full bg-gray-100 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleBtn, {
							active: mode === "signin",
							onClick: () => switchMode("signin"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 14 }),
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleBtn, {
							active: mode === "signup",
							onClick: () => switchMode("signup"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 14 }),
							children: "Create Account"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold text-slate-800",
							children: mode === "signin" ? "Welcome back" : "Create your account"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-slate-500",
							children: mode === "signin" ? "Sign in to your DillKash Kashmir account" : "Join DillKash Kashmir for exclusive tour access"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600",
						children: error
					}),
					mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogin,
						noValidate: true,
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "auth-email",
								className: "mb-1.5 block text-sm font-medium text-slate-700",
								children: "Email address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "auth-email",
									type: "email",
									value: loginEmail,
									onChange: (e) => setLoginEmail(e.target.value),
									placeholder: "you@example.com",
									autoComplete: "email",
									className: inputCls()
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "auth-password",
								className: "mb-1.5 block text-sm font-medium text-slate-700",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "auth-password",
										type: showLoginPw ? "text" : "password",
										value: loginPassword,
										onChange: (e) => setLoginPassword(e.target.value),
										placeholder: "Enter your password",
										autoComplete: "current-password",
										className: inputClsRight()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwToggle, {
										show: showLoginPw,
										onClick: () => setShowLoginPw(!showLoginPw)
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-2 text-sm text-slate-600",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: rememberMe,
										onChange: (e) => setRememberMe(e.target.checked),
										className: "h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
									}), "Remember me"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm font-semibold text-emerald-600 hover:underline",
									children: "Forgot password?"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitBtn, {
								loading,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									size: 18,
									className: "animate-spin"
								}), " Signing in…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign In ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-sm text-slate-500",
								children: [
									"Don't have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("signup"),
										className: "font-bold text-emerald-600 hover:underline",
										children: "Create Account"
									})
								]
							})
						]
					}),
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSignup,
						noValidate: true,
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-name",
									className: "mb-1.5 block text-sm font-medium text-slate-700",
									children: "Full Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 16 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "su-name",
										type: "text",
										value: signupForm.full_name,
										onChange: (e) => set("full_name", e.target.value),
										placeholder: "Muhammad Ahmad",
										autoComplete: "name",
										className: inputCls("full_name")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { msg: fieldErrors.full_name })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-email",
									className: "mb-1.5 block text-sm font-medium text-slate-700",
									children: "Email address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "su-email",
										type: "email",
										value: signupForm.email,
										onChange: (e) => set("email", e.target.value),
										placeholder: "you@example.com",
										autoComplete: "email",
										className: inputCls("email")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { msg: fieldErrors.email })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-phone",
									className: "mb-1.5 block text-sm font-medium text-slate-700",
									children: "Phone Number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "su-phone",
										type: "tel",
										value: signupForm.phone,
										onChange: (e) => set("phone", e.target.value),
										placeholder: "0300 1234567",
										autoComplete: "tel",
										className: inputCls("phone")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { msg: fieldErrors.phone })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-password",
									className: "mb-1.5 block text-sm font-medium text-slate-700",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "su-password",
											type: showSignupPw ? "text" : "password",
											value: signupForm.password,
											onChange: (e) => set("password", e.target.value),
											placeholder: "At least 6 characters",
											autoComplete: "new-password",
											className: inputClsRight("password")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwToggle, {
											show: showSignupPw,
											onClick: () => setShowSignupPw(!showSignupPw)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { msg: fieldErrors.password })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "su-confirm",
									className: "mb-1.5 block text-sm font-medium text-slate-700",
									children: "Confirm Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "su-confirm",
										type: "password",
										value: signupForm.confirm_password,
										onChange: (e) => set("confirm_password", e.target.value),
										placeholder: "Re-enter your password",
										autoComplete: "new-password",
										className: inputCls("confirm_password")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { msg: fieldErrors.confirm_password })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitBtn, {
								loading,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									size: 18,
									className: "animate-spin"
								}), " Creating Account…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Create Account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-sm text-slate-500",
								children: [
									"Already have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("signin"),
										className: "font-bold text-emerald-600 hover:underline",
										children: "Sign in"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							size: 14,
							className: "text-emerald-500"
						}), "Your details are protected and never shared with third parties."]
					})
				]
			})]
		})]
	});
}
function ToggleBtn({ active, onClick, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all ${active ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
		children: [icon, children]
	});
}
function InputIcon({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400",
		children
	});
}
function PwToggle({ show, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600",
		"aria-label": show ? "Hide password" : "Show password",
		children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
	});
}
function SubmitBtn({ loading, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "submit",
		disabled: loading,
		className: "mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/35 active:scale-[0.98] disabled:opacity-60",
		children
	});
}
function CheckItem({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
			size: 20,
			className: "mt-0.5 shrink-0 text-emerald-400"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm leading-relaxed text-emerald-100/90",
			children
		})]
	});
}
function FieldError({ msg }) {
	if (!msg) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs font-medium text-red-500",
		children: msg
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, { initialMode: "signin" });
//#endregion
export { SplitComponent as component };
