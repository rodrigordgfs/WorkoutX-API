import muscleGroupRepository from "../repositories/muscleGroup.repository.js";
import AppError from "../utils/error.js";
import {
  deleteImageFromS3,
  uploadImageToS3,
} from "../utils/uploadImageToS3.js";

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
    // const imageUrl = await uploadImageToS3(
    //   name,
    //   image,
    //   "workoutx-bucket",
    //   "muscle-groups/"
    // );

    return await muscleGroupRepository.postMuscleGroup(
      name,
      description,
      image
    );
  } catch (error) {
    throw new AppError(error.message);
  }
};

const deleteMuscleGroup = async (id) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(id);

    if (!muscleGroup) {
      throw new AppError("Grupo Muscular não encontrado");
    }

    if (muscleGroup.exercises.length > 0) {
      throw new AppError(
        "Não é possível deletar um Grupo Muscular com exercícios associados"
      );
    }

    if (muscleGroup.imageUrl) {
      await deleteImageFromS3(muscleGroup.imageUrl, "workoutx-bucket");
    }

    await muscleGroupRepository.deleteMuscleGroup(id);
    console.log(`Grupo muscular deletado: ${id}`);
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  getMuscleGroup,
  getMuscleGroupById,
  postMuscleGroup,
  deleteMuscleGroup,
};
