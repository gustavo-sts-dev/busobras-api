import authRoutes from "./auth-routes"
import carRoutes from "./car-routes";

export default function routes(fastify) {
  fastify.register(authRoutes, {
    prefix: "/auth"
  });
  fastify.register(carRoutes, {
    prefix: "/car"
  })
}