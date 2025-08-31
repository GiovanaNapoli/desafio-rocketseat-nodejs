import { expect, test } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "../test/factories/make-user.ts";

test("create course", async () => {
  await server.ready();
  const { token } = await makeAuthenticatedUser("manager");
  const response = await request(server.server)
    .post("/courses")
    .set("Content-type", "application/json")
    .set("Authorization", token)
    .send({ title: faker.lorem.words(4) });

  expect(response.status).toEqual(201);
  expect(response.body).toEqual({
    id: expect.any(String),
  });
});
