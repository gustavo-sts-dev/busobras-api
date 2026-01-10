import User from "@src/models/user-model";
import env_vars from "@src/configs/env-config";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function registerService(data) {
  const { password, ...registerData } = data;

  const result = await User.create({
    ...registerData,
    password: await bcrypt.hash(password, 12),
  }) as unknown as {email: string, _id: string};

  const token: string = jwt.sign(
    {
      email: result.email,
      _id: result._id.toString()
    },
    env_vars.JWT_ACCESS_SECRET,
    {
      expiresIn: env_vars.JWT_ACCESS_SECRET_EXPIRES,
    } as SignOptions
  );

  return {
    token,
    message: `Usuário ${registerData.username} criado com sucesso!`,
  };
}
