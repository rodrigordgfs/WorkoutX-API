import workout from "./workout.route.js";

const routes = async (fastify) => {
    fastify.register(workout)
};

export default routes;