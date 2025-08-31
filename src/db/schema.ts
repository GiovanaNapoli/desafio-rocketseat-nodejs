import { pgEnum, timestamp } from "drizzle-orm/pg-core";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const userRole = pgEnum('user_role', [
  'student',
  'manager'
])

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRole().notNull().default('student'),
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
});

export const enrollments = pgTable("enrollments", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => users.id),
  course_id: uuid()
    .notNull()
    .references(() => courses.id),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
