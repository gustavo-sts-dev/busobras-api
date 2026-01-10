import env_vars from "@src/configs/env-config";
import bcrypt from "bcrypt";
import User from "@src/models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";

export async function loginService(data) {
  const { email, password } = data;

  const userExists = await User.findOne({
    email,
  }).lean();

  if (!userExists) throw new Error("Usuário não existe!");

  const correctPassword = await bcrypt.compare(password, userExists.password);

  if (!correctPassword) throw new Error("Senha errada!");

  const token = jwt.sign(
    {
      email,
      _id: userExists._id
    },
    env_vars.JWT_ACCESS_SECRET,
    {
      expiresIn: env_vars.JWT_ACCESS_SECRET_EXPIRES,
    } as SignOptions
  );

  return {
    token,
    message: `Usuário ${userExists.username} logado com sucesso!`,
  };
}
