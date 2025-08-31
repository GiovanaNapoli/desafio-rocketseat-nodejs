import { expect, test } from "vitest";
import request from "supertest";
import app from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../test/factories/make-course.ts";

test("get course by id", async () => {
  await app.ready();

  const course = await makeCourse();
  const response = await request(app.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 for non existing courses", async () => {
  await app.ready();

  const response = await request(app.server).get(
    `/courses/CBA2E131-C83C-471A-9DAC-4F4A84B55476`
  );

  expect(response.status).toEqual(404);
});
