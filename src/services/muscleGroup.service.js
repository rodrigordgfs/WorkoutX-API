import muscleGroupRepository from "../repositories/muscleGroup.repository.js";
import AppError from "../utils/error.js";

const getMuscleGroup = async () => {
  try {
    return await muscleGroupRepository.getMuscleGroup();
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getMuscleGroupById = async (id) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(id);

    if (!muscleGroup) {
      throw new AppError("Grupo Muscular não encontrado");
    }

    return muscleGroup;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const postMuscleGroup = async (name, description, image) => {
  try {
    return await muscleGroupRepository.postMuscleGroup(
      name,
      description,
      image
    );
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  getMuscleGroup,
  getMuscleGroupById,
  postMuscleGroup,
};
