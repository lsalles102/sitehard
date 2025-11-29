import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const sql = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false }, // Supabase Pooler exige isso
  prepare: false                      // Pooler não suporta prepare
});

export const db = drizzle(sql, { schema });
