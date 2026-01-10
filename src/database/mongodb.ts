import env_vars from '@src/configs/env-config';
import mongoose from "mongoose";

export async function connectDatabase(fastify: import("fastify").FastifyInstance) {
  try {
    await mongoose.connect(env_vars.MONGO_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
    });
    fastify.log.info("Banco de dados MONGODB conectado com sucesso!");

    fastify.addHook("onClose", () => {
      mongoose.disconnect();
      console.log("Banco de dados MONGODB desconectado com sucesso!");
    });
  } catch (e) {
    fastify.log.error(
      `Erro ao se conectar com o banco de dados MONGODB: ${
        e instanceof Error ? e.message : "Erro desconhecido."
      }.`
    );
    return e;
  }
}
