import { createFileRoute } from "@tanstack/react-router";
import { postLogout } from "@/lib/auth-server";

export const Route = createFileRoute("/logout/")({
  preload: false,
  loader: () => postLogout(),
});
