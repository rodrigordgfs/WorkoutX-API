import workoutController from "../controllers/workout.controller.js";

const workout = async (fastify) => {
  fastify.post("/workout", workoutController.postWorkout); // TODO
  fastify.post("/workout/:idWorkout/user/:idUser/like", workoutController.postLikeWorkout); // TODO
  fastify.post("/workout/ai", workoutController.postWorkoutAI); // TODO
  fastify.get("/workout", workoutController.getWorkouts); // OK
  fastify.delete("/workout/:idWorkout/exercise/:idExercise", workoutController.deleteExercise); // OK
  fastify.post("/workout/:id/copy", workoutController.copyWorkout); // TODO
  fastify.delete("/workout/:id", workoutController.deleteWorkout); // OK

  fastify.get("/workout/session", workoutController.getWorkoutSessionByWorkoutID); // OK
  fastify.get("/workout/session/:sessionId", workoutController.getWorkoutSession); // OK
  fastify.post("/workout/session", workoutController.postWorkoutSession); // OK
  fastify.delete("/workout/session/:sessionId", workoutController.deleteWorkoutSession); // OK
  fastify.post("/workout/session/:sessionId/complete", workoutController.postCompleteWorkoutSession); // OK
  fastify.patch("/workout/session/:sessionId/exercise/:exerciseId/complete", workoutController.patchWorkoutSessionExercise); // OK

  fastify.get("/workout/history", workoutController.getWorkoutHistory);
  fastify.get("/workout/dashboard", workoutController.getWorkoutDashboard);

  fastify.post("/exercise", workoutController.postExercise); // OK
  fastify.get("/exercise", workoutController.getExercises); // OK
};

export default workout;
