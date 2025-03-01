import workoutController from "../controllers/workout.controller.js";

const workout = async (fastify) => {
  fastify.post("/workout", workoutController.postWorkout); // TODO
  fastify.post("/workout/:idWorkout/user/:idUser/like", workoutController.postLikeWorkout); // TODO
  fastify.post("/workout/ai", workoutController.postWorkoutAI); // TODO
  fastify.get("/workout", workoutController.getWorkouts);
  fastify.delete("/workout/:idWorkout/exercise/:idExercise", workoutController.deleteExercise);
  fastify.post("/workout/:id/copy", workoutController.copyWorkout); // TODO
  fastify.delete("/workout/:id", workoutController.deleteWorkout);
  fastify.get("/workout/session", workoutController.getWorkoutSessionByWorkoutID);
  fastify.get("/workout/session/:sessionId", workoutController.getWorkoutSession);
  fastify.post("/workout/session", workoutController.postWorkoutSession); // TODO
  fastify.delete("/workout/session/:sessionId", workoutController.deleteWorkoutSession);
  fastify.post("/workout/session/:sessionId/complete", workoutController.postCompleteWorkoutSession); // TODO
  fastify.patch("/workout/session/:sessionId/exercise/:exerciseId/complete", workoutController.patchWorkoutSessionExercise);
  fastify.get("/workout/history", workoutController.getWorkoutHistory);
  fastify.get("/workout/dashboard", workoutController.getWorkoutDashboard);
};

export default workout;
