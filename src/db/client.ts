import {drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle("postgresql://postgres:postgres@localhost:5433/desafio");