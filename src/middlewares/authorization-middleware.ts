import jwt from "jsonwebtoken";
import env_vars from "@src/configs/env-config";

export async function authorization(req, rep) {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token)
      return rep.status(401).send({ message: "Token não fornecido" });

    const { valid, value: token } = req.unsignCookie(access_token);

    if (!valid || !token) {
      return rep.status(401).send({ message: "Cookie adulterado ou inválido" });
    }

    const decoded = jwt.verify(token, env_vars.JWT_ACCESS_SECRET) as {_id: string};

    req.userId = decoded._id;
  } catch (err) {
    return rep.status(401).send({ message: "Token inválido ou expirado" });
  }
}
