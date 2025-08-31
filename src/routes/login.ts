import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../db/client.ts";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.ts";
import jwt from "jsonwebtoken";
import z from "zod";
import { verify } from "argon2";
import { env } from "../env.ts";

// Mercia_Carvalho0@yahoo.com
export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ["auth"],
        summary: "Login",
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (result.length === 0) {
        return reply.status(400).send({ message: "Invalid email or password" });
      }

      const user = result[0];
      const doesPasswordMatch = await verify(user.password, password);

      if (!doesPasswordMatch) {
        return reply.status(400).send({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET);

      return reply.send({ message: "Login successful", token });
    }
  );
};
