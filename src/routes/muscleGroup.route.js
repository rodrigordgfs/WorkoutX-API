import muscleGroupController from "../controllers/muscleGroup.controller.js";

const muscleGroup = async (fastify) => {
  fastify.post("/muscle-group", muscleGroupController.postMuscleGroup);
  fastify.get("/muscle-group", muscleGroupController.getMuscleGroup);
  fastify.get("/muscle-group/:id", muscleGroupController.getMuscleGroupById);
};

export default muscleGroup;
