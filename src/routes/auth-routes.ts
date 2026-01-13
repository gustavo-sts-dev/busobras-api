import * as authControllers from "@src/controllers/index-controllers";
import rateLimit from "@fastify/rate-limit"
import z from "zod";

export default async function authRoutes(fastify) {
  fastify.post(
    "/register",
    {
      schema: {
        body: z.object({
          username: z.string(),
          email: z.email(),
          password: z.string().regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
              message: "A senha deve ter no mínimo 8 caracteres, uma letra minuscula, uma letra maiúscula e um caractere especial."
            }
          )
        }),
      },
    },
    authControllers.registerController
  );

  await fastify.register(rateLimit, {
    max: 1,
    timeWindow: "1 minute",
  });
  
  fastify.post("/login", {
      schema: {
        body: z.object({
          email: z.email(),
          password: z.string()
        }),
      },
    }, authControllers.loginController);
}
