import fastify from "./application";
import env_vars from "./configs/env-config"

async function gracefulShutdown(signal: NodeJS.Signals) {
  try {
    console.log(
      `Sinal de encerramento ${signal} recebido, tentando encerrar aplicação!`
    );
    await fastify.close();
    console.log("Aplicação encerrada com sucesso, finalizando...");
    process.exit(0);
  } catch {
    console.log("Erro ao encerrar aplicação da forma recomendada.");
    process.exit(1);
  }
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

const port = env_vars.PORT || 5000;

async function start() {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });

    console.log("Servidor iniciado com sucesso!")
  } catch (e) {
    console.error(`Um erro ocorreu durante a inicialização do servidor: ${e}`)
  }
}

start()
