import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../db/client.ts";
import { courses } from "../db/schema.ts";
import z from "zod";

export const getCourses: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string().min(3).max(100),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db.select().from(courses);

      return reply.send({ courses: result });
    }
  );
};
