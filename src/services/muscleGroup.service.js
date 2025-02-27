import muscleGroupRepository from "../repositories/muscleGroup.repository.js";
import AppError from "../utils/error.js";

const getMuscleGroup = async () => {
  try {
    return await muscleGroupRepository.getMuscleGroup();
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  getMuscleGroup,
};
