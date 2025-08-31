import { expect, test } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../test/factories/make-course.ts";
import { randomUUID } from "node:crypto";
import { makeAuthenticatedUser } from "../test/factories/make-user.ts";

test("get course", async () => {
  await server.ready();

  const title = randomUUID();
  const { token } = await makeAuthenticatedUser("manager");
  const course = await makeCourse(title);

  const response = await request(server.server)
    .get(`/courses?search=${title}`)
    .set("Authorization", token);

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
