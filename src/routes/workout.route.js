import workouteController from "../controllers/workout.controller.js";

const workout = async (fastify) => {
  fastify.post("/workout", workouteController.postWorkout);
  fastify.post("/workout/:idWorkout/user/:idUser/like", workouteController.postLikeWorkout);
  fastify.post("/workout/ai", workouteController.postWorkoutAI);
  fastify.get("/workout", workouteController.getWorkouts);
  fastify.delete("/workout/exercise/:id", workouteController.deleteExercise);
  fastify.post("/workout/:id/copy", workouteController.copyWorkout);
};

export default workout;
