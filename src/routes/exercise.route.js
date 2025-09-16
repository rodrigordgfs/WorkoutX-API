import exerciseController from "../controllers/exercise.controller.js";

const exercise = async (fastify) => {
  fastify.post("/exercise", exerciseController.createExercise);
  fastify.get("/exercise", exerciseController.getExercises);
  fastify.get("/exercise/:id", exerciseController.getExerciseById);
  fastify.patch("/exercise/:id", exerciseController.updateExercise);
  fastify.delete("/exercise/:id", exerciseController.deleteExercise);
};

export default exercise;