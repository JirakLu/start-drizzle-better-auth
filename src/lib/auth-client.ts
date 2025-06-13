import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
});

export const { useSession, getSession, signUp, signIn, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;
