import workouteController from "../controllers/workout.controller.js";

const workout = async (fastify) => {
  fastify.post("/workout", workouteController.postWorkout);
  fastify.get("/workout", workouteController.getWorkouts);
};

export default workout;
