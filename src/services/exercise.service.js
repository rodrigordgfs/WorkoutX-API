import exerciseRepository from "../repositories/exercise.repository.js";

const getExercises = async (muscleGroupId, name) => {
  try {
    return await exerciseRepository.getExercises(muscleGroupId, name);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExerciseById = async (id) => {
  try {
    const exercise = await exerciseRepository.getExerciseById(id);
    if (!exercise) {
      throw new Error("Exercício não encontrado");
    }
    return exercise;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createExercise = async (name, description, image, videoUrl, muscleGroupId) => {
  try {
    return await exerciseRepository.createExercise(name, description, image, videoUrl, muscleGroupId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateExercise = async (id, name, description, image, videoUrl, muscleGroupId) => {
  try {
    const exercise = await exerciseRepository.getExerciseById(id);
    if (!exercise) {
      throw new Error("Exercício não encontrado");
    }
    return await exerciseRepository.updateExercise(id, name, description, image, videoUrl, muscleGroupId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteExercise = async (id) => {
  try {
    const exercise = await exerciseRepository.getExerciseById(id);
    if (!exercise) {
      throw new Error("Exercício não encontrado");
    }
    return await exerciseRepository.deleteExercise(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};