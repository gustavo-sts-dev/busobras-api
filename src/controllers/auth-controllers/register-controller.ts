import { FastifyRequest, FastifyReply } from "fastify";
import env_vars from "@src/configs/env-config";
import { registerService } from "@src/services/index-services";

export async function registerController(req: FastifyRequest, rep: FastifyReply) {
  try {
    const data = req.body; 
    
    const result = await registerService(data);

    if (!result.token) throw new Error("Token de acesso JWT não pode ser gerado!");
    
    rep.setCookie("access_token", result.token, {
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      signed: true,
      maxAge: 60 * 60 * 24,
    });

    rep.status(201).send({
      message: result.message,
    });
  } catch (e) {
    rep.status(400).send({
      message: `Erro ao registrar-se. ${env_vars.NODE_ENV ? e : ""}`,
    });
  }
}
