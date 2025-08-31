import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/client.ts";
import { eq } from "drizzle-orm";
import { courses } from "../db/schema.ts";
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { getAuthenticatedUserFromRequest } from "../utils/get-authenticated-user.ts";

export const getCoursesById: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ["courses"],
        summary: "Get a course by ID",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }),
          }),
          404: z.null(),
        },
      },
    },
    async (request, reply) => {
      const user = getAuthenticatedUserFromRequest(request);

      const courseId = request.params.id;

      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (course.length > 0) return reply.send({ course: course[0] });

      return reply.status(404).send();
    }
  );
};
