import { createFileRoute } from "@tanstack/react-router";
import AuthPage from "@/components/site/AuthPage";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: search.redirect as string | undefined,
  }),
  head: () => ({
    meta: [
      { title: "Login — DillKash Kashmir" },
      { name: "description", content: "Log in to your DillKash Kashmir account." },
    ],
  }),
  component: () => {
    const { redirect } = Route.useSearch();
    return <AuthPage initialMode="signin" redirectUrl={redirect} />;
  },
});
