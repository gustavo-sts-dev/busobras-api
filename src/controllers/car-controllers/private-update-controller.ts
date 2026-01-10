import { FastifyRequest, FastifyReply } from "fastify";
import { carType } from "@src/routes/car-routes";
import { privateUpdateCarService } from "@src/services/car-services/private-update-service"

export async function privateUpdateCarController(
  req: FastifyRequest<{ Body: Partial<carType>; Params: { id: string } }>,
  rep: FastifyReply
) {
  const data = req.body;
  const { id } = req.params;
  const userId = req.userId

  const result = await privateUpdateCarService(id, data, userId);

  rep.status(200).send(result)
}
