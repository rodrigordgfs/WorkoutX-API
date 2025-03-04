import clerkAuth from "../middleware/clerkAuth.js";
import auth from "./auth.route.js";
import muscleGroup from "./muscleGroup.route.js";
import workout from "./workout.route.js";

const routes = async (fastify) => {
  if (process.env.ENV !== "development") {
    fastify.addHook("preHandler", clerkAuth);
  }
  fastify.addHook("onRequest", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    reply.header("Access-Control-Allow-Headers", "*");
    reply.header("Access-Control-Allow-Credentials", "true");
  });
  fastify.register(workout);
  fastify.register(auth);
  fastify.register(muscleGroup);
};

export default routes;
