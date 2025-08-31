import { expect, test } from "vitest";
import request from "supertest";
import app from "../app.ts";
import { faker } from "@faker-js/faker";

test("create course", async () => {
  await app.ready();
  const response = await request(app.server)
    .post("/courses")
    .set("Content-type", "application/json")
    .send({ title: faker.lorem.words(4) });

  expect(response.status).toEqual(201);
  expect(response.body).toEqual({
    id: expect.any(String),
  });
});
