import muscleGroupController from "../controllers/muscleGroup.controller.js";

const muscleGroup = async (fastify) => {
  fastify.get("/muscle-group", muscleGroupController.getMuscleGroup);
};

export default muscleGroup;
