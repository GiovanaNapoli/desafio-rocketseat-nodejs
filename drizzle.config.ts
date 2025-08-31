import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5433/desafio",
  },
  out: "./drizzle",
  schema: "./src/db/schema.ts",
});
