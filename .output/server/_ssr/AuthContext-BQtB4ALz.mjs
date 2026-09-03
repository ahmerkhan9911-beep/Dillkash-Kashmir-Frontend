import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as removeToken, r as setToken, t as api } from "./api-CJHRqUur.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-BQtB4ALz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!(typeof window !== "undefined" ? localStorage.getItem("dillkash_token") : null)) {
			setIsLoading(false);
			return;
		}
		api("/auth/me").then((data) => setUser(data.user)).catch(() => {
			removeToken();
			setUser(null);
		}).finally(() => setIsLoading(false));
	}, []);
	const login = (0, import_react.useCallback)(async (email, password) => {
		const data = await api("/auth/login", {
			method: "POST",
			body: {
				email,
				password
			}
		});
		setToken(data.token);
		setUser(data.user);
	}, []);
	const signup = (0, import_react.useCallback)(async (signupData) => {
		const data = await api("/auth/signup", {
			method: "POST",
			body: signupData
		});
		setToken(data.token);
		setUser(data.user);
	}, []);
	const logout = (0, import_react.useCallback)(() => {
		removeToken();
		setUser(null);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			isAuthenticated: !!user,
			isAdmin: user?.role === "admin",
			isLoading,
			login,
			signup,
			logout
		},
		children
	});
}
//#endregion
export { useAuth as n, AuthProvider as t };
