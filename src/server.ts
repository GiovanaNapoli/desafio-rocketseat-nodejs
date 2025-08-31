import fastify from "fastify";
import crypto from "node:crypto";
import { db } from "./db/client.ts";
import { courses } from "./db/schema.ts";
import { eq } from "drizzle-orm";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.get("/courses", async (request, reply) => {
  const result = await db.select().from(courses);

  return reply.send({ courses: result });
});

server.get("/course/:id", async (request, reply) => {
  type Params = {
    id: string;
  };
  const params = request.params as Params;
  const courseId = params.id;

  const course = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId));

  if (course) return reply.send({ course });

  return reply.status(404).send();
});

server.post("/courses", async (request, reply) => {
  type Body = {
    title: string;
  };

  const body = request.body as Body;
  const corseTitle = body.title;

  if (!corseTitle)
    return reply.status(400).send({ error: "Course title is required" });

  const result = await db
    .insert(courses)
    .values({
      title: corseTitle,
    })
    .returning();

  reply.code(201).send({ id: result[0].id });
});

server.listen({ port: 3000 }).then(() => {
  console.log("Server is running on http://localhost:3000");
});
