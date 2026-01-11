import { loadEnvFile, env } from "node:process";
import z from "zod";

// Comentar antes de ir para produção
env.NODE_ENV != "production" ? loadEnvFile() : null;

export default z
  .object({
    PORT: z.coerce.number().optional(),
    NODE_ENV: z.enum(["development", "production", "test"]),
    MONGO_URI: z.string().startsWith("mongodb"),
    ORIGINS: z.string(),
    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_ACCESS_SECRET_EXPIRES: z.string().default("15m"),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET_EXPIRES: z.string().default("7d"),
    COOKIE_SECRET: z.string(),
  })
  .parse(env);
