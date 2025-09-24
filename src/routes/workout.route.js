import workoutController from "../controllers/workout.controller.js";

const workout = async (fastify) => {
  fastify.post("/workout", workoutController.createWorkout);
  fastify.get("/workout", workoutController.getWorkouts);
  fastify.get("/dashboard", workoutController.getDashboard);
  fastify.get("/community", workoutController.getCommunity);
  fastify.get("/workout/history", workoutController.getWorkoutHistory);
  fastify.get("/workout/:id", workoutController.getWorkoutById);
  fastify.patch("/workout/:id/start", workoutController.startWorkout);
  fastify.patch("/workout/:id/complete", workoutController.completeWorkout);
  fastify.patch("/workout/:id/stop", workoutController.stopWorkout);
  fastify.patch("/workout/:id/exercise/:exerciseId/complete", workoutController.completeWorkoutSessionExercise);
  fastify.patch("/workout/:id", workoutController.updateWorkout);
  fastify.delete("/workout/:id", workoutController.deleteWorkout);
  fastify.post("/workout/:id/like", workoutController.likeWorkout);
  fastify.delete("/workout/:id/like", workoutController.unlikeWorkout);
};

export default workout;
