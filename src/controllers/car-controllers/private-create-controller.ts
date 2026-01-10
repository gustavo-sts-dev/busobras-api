import { carType } from "@src/routes/car-routes";
import { FastifyRequest, FastifyReply } from "fastify";
import { createCarService } from "@src/services/car-services/create-service";

export async function privateCreateCarController(
  req: FastifyRequest<{ Body: carType, userId: string}>,
  rep: FastifyReply
) {
  const data = req.body;
  const userId = req.userId;

  const result = await createCarService(data, userId);

  rep.status(201).send(result);
}
