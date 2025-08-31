import fastify from "fastify";
import crypto from "node:crypto";
import { db } from "./db/client.ts";
import { courses } from "./db/schema.ts";

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

// server.get("/courses/:id", (request, reply) => {
//   type Params = {
//     id: string;
//   };

//   const params = request.params as Params;
//   const courseId = params.id;

//   const course = courses.find((c) => c.id === courseId);

//   if (course) return { course };

//   return reply.status(404).send({ error: "Course not found" });
// });

// server.post("/courses", (request, reply) => {
//   type Body = {
//     title: string;
//   };

//   const body = request.body as Body;
//   const corseTitle = body.title;

//   if (!corseTitle)
//     return reply.status(400).send({ error: "Course title is required" });

//   const curseId = crypto.randomUUID();
//   courses.push({ id: curseId, title: corseTitle });

//   reply.code(201).send({ id: curseId });
// });

server.listen({ port: 3000 }).then(() => {
  console.log("Server is running on http://localhost:3000");
});
