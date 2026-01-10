import { authorization } from "@src/middlewares/authorization-middleware";
import {
  privateCreateCarController,
  publicGetCarController,
} from "@src/controllers/index-controllers";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { privateUpdateCarController } from "@src/controllers/car-controllers/private-update-controller";

const CarBody = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  price: z.number(),
  mileage: z.number(),
  fuel: z
    .enum(["flex", "gasoline", "diesel", "electric", "hybrid"]),
  description: z.string(),
  photos: z.array(z.string()),
  status: z.enum(["announced", "sold", "draft"])
});

export type carType = z.infer<typeof CarBody>;

export default async function carRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/private/create",
    {
      preHandler: authorization,
      schema: {
        body: CarBody,
      },
    },
    privateCreateCarController
  );

  app.get(
    "/public/get/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      }
    },
    publicGetCarController
  );

  app.put(
    "/private/update/:id",
    {
      preHandler: authorization,
      schema: {
        body: CarBody.partial()
      },
    },
    privateUpdateCarController
  );
}
