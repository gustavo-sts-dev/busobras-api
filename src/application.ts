import Fastify from "fastify";

import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

const fastify = Fastify({logger: true}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

import cors from "@fastify/cors";
import env_vars from "./configs/env-config";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cookie from "@fastify/cookie";

fastify.register(cors, {
  origin: env_vars.ORIGINS.split(","),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["X-Response-Time", "X-Total-Count"],
});

fastify.register(helmet);

fastify.register(cookie, {
  secret: env_vars.COOKIE_SECRET,
  parseOptions: {}
})

if (env_vars.NODE_ENV === "development") {
  fastify.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "BusoBRAS docs",
        description: "Documentação do backend BusoBRAS",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Server de desenvolvimento",
        },
      ],
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
    },
    transform: jsonSchemaTransform
  });

  fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  })
}

import { connectDatabase } from "./database/mongodb";
fastify.register(connectDatabase);

import routes from "./routes/index-routes";

fastify.register(routes)

export default fastify;
