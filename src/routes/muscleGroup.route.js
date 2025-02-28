import muscleGroupController from "../controllers/muscleGroup.controller.js";

const muscleGroup = async (fastify) => {
  fastify.get("/muscle-group", muscleGroupController.getMuscleGroup);
  fastify.get("/muscle-group/:id", muscleGroupController.getMuscleGroupById);
};

export default muscleGroup;
