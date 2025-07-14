import { drizzle } from "drizzle-orm/node-postgres";
// biome-ignore lint/performance/noNamespaceImport: it's needed
import * as schema from "@/db/schema";
import { env } from "@/env";

export const db = drizzle(env.DATABASE_URL, { schema });
