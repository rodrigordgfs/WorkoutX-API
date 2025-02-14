import auth from "./auth.route.js";
import workout from "./workout.route.js";

const routes = async (fastify) => {
  fastify.register(workout);
  fastify.register(auth);
};

export default routes;
