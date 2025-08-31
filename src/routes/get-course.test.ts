import { expect, test } from "vitest";
import request from "supertest";
import app from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../test/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("get course", async () => {
  await app.ready();

  const title = randomUUID();
  const course = await makeCourse(title);

  const response = await request(app.server).get(`/courses?search=${title}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: title,
        enrollments: 0,
      },
    ],
  });
});
