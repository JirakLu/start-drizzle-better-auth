import { postLogout } from "@/lib/auth-server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logout/")({
  preload: false,
  loader: () => postLogout(),
});
