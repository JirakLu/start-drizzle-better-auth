import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({});

export const { useSession, getSession, signUp, signIn, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;
