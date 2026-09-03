import { createFileRoute } from "@tanstack/react-router";
import AuthPage from "@/components/site/AuthPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — DillKash Kashmir" },
      { name: "description", content: "Log in to your DillKash Kashmir account." },
    ],
  }),
  component: () => <AuthPage initialMode="signin" />,
});
