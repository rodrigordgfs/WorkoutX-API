import clerkAuth from "../middleware/clerkAuth.js";
import auth from "./auth.route.js";
import muscleGroup from "./muscleGroup.route.js";
import exercise from "./exercise.route.js";
const routes = async (fastify) => {
  if (process.env.ENV !== "development") {
    fastify.addHook("preHandler", clerkAuth);
  }
  fastify.register(auth);
  fastify.register(muscleGroup);
  fastify.register(exercise);
};

export default routes;
