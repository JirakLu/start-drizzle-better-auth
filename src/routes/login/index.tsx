import { createFileRoute, linkOptions, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { LoginForm } from "@/components/feat/login-form";

const FALLBACK_ROUTE = linkOptions({ to: "/dashboard" }).to;

export const Route = createFileRoute("/login/")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.session) {
      throw redirect({ to: search.redirect || FALLBACK_ROUTE });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const { redirect: redirectTo } = Route.useSearch();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm redirect={redirectTo} fallbackRoute={FALLBACK_ROUTE} />
      </div>
    </div>
  );
}
