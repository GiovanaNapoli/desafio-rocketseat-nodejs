import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../db/client.ts";
import { courses } from "../db/schema.ts";
import z from "zod";
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { checkUserRole } from "./hooks/check-user-role.ts";

export const createCourse: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      preHandler: [checkRequestJWT, checkUserRole("manager")],
      schema: {
        tags: ["courses"],
        summary: "Create a course",
        body: z.object({
          title: z
            .string()
            .min(3, "Course title must be at least 3 characters long")
            .max(100, "Course title must be at most 100 characters long"),
        }),
        response: {
          201: z.object({ id: z.uuid() }).describe("Curso criado com sucesso!"),
        },
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title;

      const result = await db
        .insert(courses)
        .values({
          title: courseTitle,
        })
        .returning();

      reply.code(201).send({ id: result[0].id });
    }
  );
};
