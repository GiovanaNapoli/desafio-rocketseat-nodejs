import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import { getCourses } from "./routes/get-courses.ts";
import { getCoursesById } from "./routes/get-course-by-id.ts";
import { createCourse } from "./routes/create-course.ts";

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
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  })
  
  server.register(scalarAPIReference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'bluePlanet'
    } 
  })
}

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);


server.register(getCourses);
server.register(getCoursesById);
server.register(createCourse);

server.listen({ port: 3000 }).then(() => {
  console.log("Server is running on http://localhost:3000");
});
