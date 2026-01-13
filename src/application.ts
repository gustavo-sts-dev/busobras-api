import Fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

import cors from "@fastify/cors";
import env_vars from "./configs/env-config";
import helmet from "@fastify/helmet";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cookie from "@fastify/cookie";

const allowedOrigins = env_vars.ORIGINS.split(",").map((o) => o.trim());

fastify.register(cors, {
  origin: (origin, callback) => {
    if (
      (env_vars.NODE_ENV == "development" && !origin) ||
      (origin && allowedOrigins.includes(origin)) ||
      allowedOrigins.includes("*")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Negado pelo cors."), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Accept"],
  exposedHeaders: ["X-Response-Time", "X-Total-Count"],
});

fastify.register(helmet);

fastify.register(cookie, {
  secret: env_vars.COOKIE_SECRET,
  parseOptions: {},
});

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
    transform: jsonSchemaTransform,
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
  });
}

import { connectDatabase } from "./database/mongodb";
fastify.register(connectDatabase);

import routes from "./routes/index-routes";

fastify.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error.validation) {
      return reply.status(400).send({
        message: "Erro de validação",
        details: error.validation,
      });
    }

    if (error.statusCode) {
      reply.status(error.statusCode).send(error.message);
    }
  }
);

fastify.register(routes);

fastify.get("/health", (req, rep) => {
  rep.status(200).send({
    status: "Ok!",
  });
});

export default fastify;
