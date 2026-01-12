import { FastifyRequest, FastifyReply } from "fastify";
import { loginService } from "@src/services/index-services";
import env_vars from "@src/configs/env-config";

export async function loginController(req: FastifyRequest, rep: FastifyReply) {
  try {
    const data = req.body;

    const result = await loginService(data);

    rep.setCookie("access_token", result.token, {
      secure: true,
      httpOnly: true,
      signed: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    rep.status(200).send({
      message: result.message,
    });
  } catch (e) {
    rep.status(401).send({
      message: `Credenciais inválidas. ${env_vars.NODE_ENV ? e : ""}`,
    });
  }
}
