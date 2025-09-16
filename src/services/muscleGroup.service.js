import muscleGroupRepository from "../repositories/muscleGroup.repository.js";

const getMuscleGroup = async (name) => {
  try {
    return await muscleGroupRepository.getMuscleGroup(name);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMuscleGroupById = async (id) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(id);
    if (!muscleGroup) {
      throw new Error("Grupo Muscular não encontrado");
    }
    return muscleGroup;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postMuscleGroup = async (name, description, image) => {
  try {
    return await muscleGroupRepository.postMuscleGroup(name, description, image);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateMuscleGroup = async (id, name, description, image) => {
  try {
    const muscleGroup = await muscleGroupRepository.updateMuscleGroup(id, name, description, image);
    if (!muscleGroup) {
      throw new Error("Grupo Muscular não encontrado");
    }
    return muscleGroup;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteMuscleGroup = async (id) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(id);
    if (!muscleGroup) {
      throw new Error("Grupo Muscular não encontrado");
    }
    
    // Verificar se existem exercícios vinculados
    const hasExercises = await muscleGroupRepository.checkExercisesLinked(id);
    if (hasExercises) {
      throw new Error("Não é possível excluir o grupo muscular pois existem exercícios vinculados a ele");
    }
    
    await muscleGroupRepository.deleteMuscleGroup(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  postMuscleGroup,
  getMuscleGroup,
  getMuscleGroupById,
  updateMuscleGroup,
  deleteMuscleGroup,
};
