import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/")({
  loader: () => {
    throw redirect({ to: "/dashboard/todo" });
  },
});
