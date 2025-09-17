import workoutController from "../controllers/workout.controller.js";

const workout = async (fastify) => {
  fastify.post("/workout", workoutController.createWorkout);
  fastify.get("/workout", workoutController.getWorkouts);
  fastify.get("/workout/history", workoutController.getWorkoutHistory);
  fastify.get("/workout/:id", workoutController.getWorkoutById);
  fastify.patch("/workout/:id/start", workoutController.startWorkout);
  fastify.patch("/workout/:id/complete", workoutController.completeWorkout);
  fastify.patch("/workout/:id/stop", workoutController.stopWorkout);
  fastify.patch("/workout/:id/exercise/:exerciseId/complete", workoutController.completeWorkoutSessionExercise);
};

export default workout;
