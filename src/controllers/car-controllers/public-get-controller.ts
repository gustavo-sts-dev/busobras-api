import { FastifyRequest, FastifyReply } from "fastify";
import { publicGetCarService } from "@src/services/car-services/public-get-service";

export async function publicGetCarController(
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply
) {
  const result = await publicGetCarService(req.params);

  return rep.status(200).send(result);
}
