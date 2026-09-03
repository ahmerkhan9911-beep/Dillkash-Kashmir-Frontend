import { useState, useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Loader2,
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/dillkash-logo-horizontal.png";
import scenicImg from "@/assets/dest-ratti-gali.jpg";

/* ─────────────────────────── types ─────────────────────────── */

type AuthMode = "signin" | "signup";

interface AuthPageProps {
  initialMode?: AuthMode;
}

/* ─────────────────────────── component ─────────────────────── */

export default function AuthPage({ initialMode = "signin" }: AuthPageProps) {
  const { login, signup, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>(initialMode);

  /* ── sign-in state ── */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /* ── sign-up state ── */
  const [signupForm, setSignupForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /* ── shared state ── */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ── redirect if authed ── */
  useEffect(() => {
    if (isAuthenticated && !success) {
      if (isAdmin) navigate({ to: "/admin" });
      else navigate({ to: "/" });
    }
  }, [isAuthenticated, isAdmin, success, navigate]);

  if (isAuthenticated && !success) return null;

  /* ── helpers ── */
  const set = (key: string, value: string) =>
    setSignupForm((f) => ({ ...f, [key]: value }));

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError("");
    setFieldErrors({});
  };

  /* ── sign-in submit ── */
  const handleLogin = async (e: React.FormEvent) => {
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

  /* ── sign-up validation ── */
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (signupForm.full_name.trim().length < 2)
      errs.full_name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email))
      errs.email = "Enter a valid email address";
    if (!/^(\+?92|0)?\d{10,11}$/.test(signupForm.phone.replace(/[\s-]/g, "")))
      errs.phone = "Enter a valid phone number (e.g. 03001234567)";
    if (signupForm.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (signupForm.password !== signupForm.confirm_password)
      errs.confirm_password = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── sign-up submit ── */
  const handleSignup = async (e: React.FormEvent) => {
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

  /* ── input class helper ── */
  const inputCls = (field?: string) =>
    `w-full rounded-lg border bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 ${
      field && fieldErrors[field] ? "border-red-400" : "border-gray-200"
    }`;

  const inputClsRight = (field?: string) =>
    `w-full rounded-lg border bg-white py-3 pl-11 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 ${
      field && fieldErrors[field] ? "border-red-400" : "border-gray-200"
    }`;

  /* ════════════════════════ SUCCESS SCREEN ═══════════════════ */

  if (success) {
    return (
      <div
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4 pb-4 pt-20 sm:p-8 sm:pt-24"
        style={{ backgroundImage: `url(${scenicImg})` }}
      >
        <div className="absolute inset-0 bg-teal-900/60 backdrop-blur-sm" />
        <div className="relative w-full max-w-sm rounded-2xl bg-white p-10 text-center shadow-2xl">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Account Created!</h1>
          <p className="mt-2 text-sm text-slate-500">Welcome to DillKash Kashmir. Redirecting you now…</p>
        </div>
      </div>
    );
  }

  /* ════════════════════════ MAIN LAYOUT ═════════════════════ */

  return (
    <div
      className="relative flex min-h-screen items-start justify-center bg-cover bg-center px-3 pb-3 pt-16 sm:items-center sm:px-8 sm:pb-8 sm:pt-24"
      style={{ backgroundImage: `url(${scenicImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-900/60 backdrop-blur-[2px]" />

      {/* ── Floating Card ── */}
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl md:flex-row">

        {/* ═══════════ LEFT: Brand Panel ═══════════ */}
        <div className="relative flex w-full shrink-0 flex-col justify-between bg-[#064E3B] px-4 py-4 text-white sm:px-6 sm:py-5 md:w-[45%] md:shrink md:px-10 md:py-10">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src={logoImg}
                alt="DillKash Kashmir"
                className="mb-3 h-6 brightness-0 invert sm:mb-4 sm:h-7 md:mb-8 md:h-9"
              />
            </Link>

            {/* Heading */}
            <h2 className="text-lg font-bold leading-tight sm:text-xl md:text-3xl">
              Your Kashmir journey starts here.
            </h2>
            <p className="mt-1 hidden text-sm leading-relaxed text-emerald-200/80 sm:mt-2 sm:block md:mt-4">
              One account for curated packages, custom tours and member-only
              deals across the valley.
            </p>

            {/* Checklist */}
            <ul className="mt-4 hidden space-y-4 md:mt-8 md:block">
              <CheckItem>Exclusive member pricing on tour packages</CheckItem>
              <CheckItem>Save trips, compare plans and book in minutes</CheckItem>
              <CheckItem>24/7 support from local Kashmir travel experts</CheckItem>
            </ul>
          </div>

          {/* Footer destinations */}
          <div className="mt-3 hidden items-center gap-2 text-xs text-emerald-300/60 md:mt-10 md:flex">
            <MapPin size={14} className="shrink-0" />
            <span>Neelum Valley • Arang Kel • Ratti Gali • Taobat</span>
          </div>
        </div>

        {/* ═══════════ RIGHT: Auth Form ═══════════ */}
        <div className="flex w-full flex-col justify-center overflow-y-auto bg-white px-4 py-5 sm:p-6 md:w-[55%] md:p-10 lg:p-12">
          {/* Segmented Toggle */}
          <div className="mx-auto mb-5 flex w-fit rounded-full bg-gray-100 p-1 sm:mb-8">
            <ToggleBtn
              active={mode === "signin"}
              onClick={() => switchMode("signin")}
              icon={<Lock size={14} />}
            >
              Sign In
            </ToggleBtn>
            <ToggleBtn
              active={mode === "signup"}
              onClick={() => switchMode("signup")}
              icon={<UserPlus size={14} />}
            >
              Create Account
            </ToggleBtn>
          </div>

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {mode === "signin"
                ? "Sign in to your DillKash Kashmir account"
                : "Join DillKash Kashmir for exclusive tour access"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* ════════ SIGN IN ════════ */}
          {mode === "signin" && (
            <form onSubmit={handleLogin} noValidate className="grid gap-4">
              {/* Email */}
              <div>
                <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <InputIcon><Mail size={16} /></InputIcon>
                  <input
                    id="auth-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls()}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <InputIcon><Lock size={16} /></InputIcon>
                  <input
                    id="auth-password"
                    type={showLoginPw ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={inputClsRight()}
                  />
                  <PwToggle show={showLoginPw} onClick={() => setShowLoginPw(!showLoginPw)} />
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm font-semibold text-emerald-600 hover:underline">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <SubmitBtn loading={loading}>
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Signing in…</>
                ) : (
                  <>Sign In <ArrowRight size={16} /></>
                )}
              </SubmitBtn>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <button type="button" onClick={() => switchMode("signup")} className="font-bold text-emerald-600 hover:underline">
                  Create Account
                </button>
              </p>
            </form>
          )}

          {/* ════════ SIGN UP ════════ */}
          {mode === "signup" && (
            <form onSubmit={handleSignup} noValidate className="grid gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="su-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <InputIcon><User size={16} /></InputIcon>
                  <input
                    id="su-name"
                    type="text"
                    value={signupForm.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    placeholder="Muhammad Ahmad"
                    autoComplete="name"
                    className={inputCls("full_name")}
                  />
                </div>
                <FieldError msg={fieldErrors.full_name} />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="su-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <InputIcon><Mail size={16} /></InputIcon>
                  <input
                    id="su-email"
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls("email")}
                  />
                </div>
                <FieldError msg={fieldErrors.email} />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="su-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <div className="relative">
                  <InputIcon><Phone size={16} /></InputIcon>
                  <input
                    id="su-phone"
                    type="tel"
                    value={signupForm.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="0300 1234567"
                    autoComplete="tel"
                    className={inputCls("phone")}
                  />
                </div>
                <FieldError msg={fieldErrors.phone} />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="su-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <InputIcon><Lock size={16} /></InputIcon>
                  <input
                    id="su-password"
                    type={showSignupPw ? "text" : "password"}
                    value={signupForm.password}
                    onChange={(e) => set("password", e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className={inputClsRight("password")}
                  />
                  <PwToggle show={showSignupPw} onClick={() => setShowSignupPw(!showSignupPw)} />
                </div>
                <FieldError msg={fieldErrors.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="su-confirm" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <InputIcon><Lock size={16} /></InputIcon>
                  <input
                    id="su-confirm"
                    type="password"
                    value={signupForm.confirm_password}
                    onChange={(e) => set("confirm_password", e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={inputCls("confirm_password")}
                  />
                </div>
                <FieldError msg={fieldErrors.confirm_password} />
              </div>

              {/* Submit */}
              <SubmitBtn loading={loading}>
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Creating Account…</>
                ) : (
                  <>Create Account <ArrowRight size={16} /></>
                )}
              </SubmitBtn>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("signin")} className="font-bold text-emerald-600 hover:underline">
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* Trust badge */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            Your details are protected and never shared with third parties.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── sub-components ─────────────────────── */

function ToggleBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-white text-slate-800 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function InputIcon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
      {children}
    </span>
  );
}

function PwToggle({ show, onClick }: { show: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}

function SubmitBtn({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/35 active:scale-[0.98] disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-400" />
      <span className="text-sm leading-relaxed text-emerald-100/90">{children}</span>
    </li>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs font-medium text-red-500">{msg}</p>;
}
