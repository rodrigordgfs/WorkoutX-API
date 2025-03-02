import clerkAuth from "../middleware/clerkAuth.js";
import auth from "./auth.route.js";
import muscleGroup from "./muscleGroup.route.js";
import workout from "./workout.route.js";

const routes = async (fastify) => {
  fastify.addHook("preHandler", clerkAuth);
  fastify.addHook("onRequest", (request, reply, done) => {
    const origin = request.headers.origin;
    
    if (["https://www.workoutx.site", "http://localhost:5173"].includes(origin)) {
      reply.header("Access-Control-Allow-Origin", origin);
    }
    
    reply.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    reply.header("Access-Control-Allow-Credentials", "true");
  
    done();
  });
  fastify.register(workout);
  fastify.register(auth);
  fastify.register(muscleGroup);
};

export default routes;
