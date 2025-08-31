import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";

import { hash } from "argon2";

const passwordHash = await hash("123");

async function seed() {
  const usersInsert = await db
    .insert(users)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "student",
        password: passwordHash,
      },
    ])
    .returning();

  const coursesInsert = await db
    .insert(courses)
    .values([
      { title: faker.lorem.words(3) },
      { title: faker.lorem.words(3) },
      { title: faker.lorem.words(3) },
    ])
    .returning();

  await db.insert(enrollments).values([
    { user_id: usersInsert[0].id, course_id: coursesInsert[0].id },
    { user_id: usersInsert[0].id, course_id: coursesInsert[1].id },
    { user_id: usersInsert[1].id, course_id: coursesInsert[2].id },
  ]);
}

seed();
