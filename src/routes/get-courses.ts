import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../db/client.ts";
import { and, asc, count, eq, ilike, SQL } from "drizzle-orm";
import { courses, enrollments } from "../db/schema.ts";
import z from "zod";

export const getCourses: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        querystring: z.object({
          search: z.string().optional(),
          orderby: z.enum(["title"]).optional().default("title"),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                enrollments: z.number(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderby, page } = request.query;

      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: courses.id,
            title: courses.title,
            enrollments: count(enrollments.id),
          })
          .from(courses)
          .leftJoin(enrollments, eq(enrollments.course_id, courses.id))
          .orderBy(asc(courses[orderby]))
          .offset((page - 1) * 10)
          .limit(10)
          .where(and(...conditions))
          .groupBy(courses.id),
        db.$count(courses, and(...conditions)),
      ]);

      return reply.send({ courses: result, total });
    }
  );
};
