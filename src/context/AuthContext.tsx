import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { api, setToken, removeToken } from "@/services/api";

/* ---------- Types ---------- */

export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

/* ---------- Context ---------- */

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/* ---------- Provider ---------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from stored token on mount
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("dillkash_token") : null;
    if (!token) {
      setIsLoading(false);
      return;
    }

    api<{ user: AuthUser }>("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => {
        removeToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setToken(data.token);
    setUser(data.user);
  }, []);

  const signup = useCallback(async (signupData: SignupData) => {
    const data = await api<{ token: string; user: AuthUser }>("/auth/signup", {
      method: "POST",
      body: signupData,
    });
    setToken(data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
