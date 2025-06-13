import { createServerFn } from "@tanstack/react-start";
import { auth } from "./auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const getUserSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await auth.api.getSession({
      headers: getWebRequest().headers,
    });

    return session;
  },
);

export const postLogout = createServerFn({ method: "POST" }).handler(
  async () => {
    await auth.api.signOut({
      headers: getWebRequest().headers,
    });
    // TODO: handle when success is false
    throw redirect({ to: "/" });
  },
);
