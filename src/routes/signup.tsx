import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-kashmir.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — DillKash Kashmir" },
      { name: "description", content: "Sign up for a DillKash Kashmir account to access tour bookings." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (isAuthenticated && !success) {
    navigate({ to: "/" });
    return null;
  }

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (form.full_name.trim().length < 2) errs["full_name"] = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs["email"] = "Enter a valid email address";
    if (!/^(\+?92|0)?\d{10,11}$/.test(form.phone.replace(/[\s-]/g, "")))
      errs["phone"] = "Enter a valid phone number (e.g. 03001234567)";
    if (form.password.length < 6) errs["password"] = "Password must be at least 6 characters";
    if (form.password !== form.confirm_password) errs["confirm_password"] = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await signup(form);
      setSuccess(true);
      // Auto-redirect after short delay
      setTimeout(() => navigate({ to: "/" }), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${
      fieldErrors[field] ? "border-destructive" : "border-input"
    }`;

  if (success) {
    return (
      <section className="relative flex min-h-screen items-center justify-center">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" />
        <Reveal>
          <div className="relative mx-4 w-full max-w-md rounded-3xl border border-border bg-card/95 p-8 text-center shadow-lift backdrop-blur-md">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-foreground">Account Created!</h1>
            <p className="mt-2 text-sm text-muted-foreground">Welcome to DillKash Kashmir. Redirecting you now...</p>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center py-20">
      <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" />

      <Reveal>
        <div className="relative mx-4 w-full max-w-md rounded-3xl border border-border bg-card/95 p-8 shadow-lift backdrop-blur-md sm:mx-0">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <UserPlus size={26} />
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-foreground">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join DillKash Kashmir for exclusive tour access
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div>
              <label htmlFor="su-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                Full Name
              </label>
              <input
                id="su-name"
                type="text"
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                placeholder="Muhammad Ahmad"
                autoComplete="name"
                className={inputCls("full_name")}
              />
              {fieldErrors["full_name"] && <p className="mt-1 text-xs font-medium text-destructive">{fieldErrors["full_name"]}</p>}
            </div>

            <div>
              <label htmlFor="su-email" className="mb-1.5 block text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                id="su-email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputCls("email")}
              />
              {fieldErrors["email"] && <p className="mt-1 text-xs font-medium text-destructive">{fieldErrors["email"]}</p>}
            </div>

            <div>
              <label htmlFor="su-phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                Phone Number
              </label>
              <input
                id="su-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0300 1234567"
                autoComplete="tel"
                className={inputCls("phone")}
              />
              {fieldErrors["phone"] && <p className="mt-1 text-xs font-medium text-destructive">{fieldErrors["phone"]}</p>}
            </div>

            <div>
              <label htmlFor="su-password" className="mb-1.5 block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="su-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`${inputCls("password")} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors["password"] && <p className="mt-1 text-xs font-medium text-destructive">{fieldErrors["password"]}</p>}
            </div>

            <div>
              <label htmlFor="su-confirm" className="mb-1.5 block text-sm font-semibold text-foreground">
                Confirm Password
              </label>
              <input
                id="su-confirm"
                type="password"
                value={form.confirm_password}
                onChange={(e) => set("confirm_password", e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className={inputCls("confirm_password")}
              />
              {fieldErrors["confirm_password"] && <p className="mt-1 text-xs font-medium text-destructive">{fieldErrors["confirm_password"]}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
