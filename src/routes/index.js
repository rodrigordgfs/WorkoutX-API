import clerkAuth from "../middleware/clerkAuth.js";
import auth from "./auth.route.js";
import muscleGroup from "./muscleGroup.route.js";
import reportBug from "./reportBug.route.js";
import workout from "./workout.route.js";

const routes = async (fastify) => {
  if (process.env.ENV !== "development") {
    fastify.addHook("preHandler", clerkAuth);
  }
  fastify.register(workout);
  fastify.register(auth);
  fastify.register(muscleGroup);
  fastify.register(reportBug);
};

export default routes;
