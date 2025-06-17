import { RegisterForm } from "@/components/feat/register-form";
import { createFileRoute, linkOptions, redirect } from "@tanstack/react-router";
import { z } from "zod";

const FALLBACK_ROUTE = linkOptions({ to: "/dashboard" }).to;

export const Route = createFileRoute("/register/")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.session) {
      throw redirect({ to: search.redirect || FALLBACK_ROUTE });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  const { redirect } = Route.useSearch();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm redirect={redirect} fallbackRoute={FALLBACK_ROUTE} />
      </div>
    </div>
  );
}
