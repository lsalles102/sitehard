import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const connectionString = process.env.DATABASE_URL;

// Correção de SSL para Supabase + Render
const sql = postgres(connectionString, {
  prepare: false,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }   // Supabase exige isso
    : false                            // Ambiente local sem SSL
});

export const db = drizzle(sql, { schema });
