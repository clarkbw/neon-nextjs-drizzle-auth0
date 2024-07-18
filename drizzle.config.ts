import type { Config } from "drizzle-kit";
// requires a .env file, doesn't work with the .env.local file
import "dotenv/config";

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL not found in environment");

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
} satisfies Config;
