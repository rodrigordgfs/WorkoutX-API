import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const getMuscleGroup = async (name) => {
  const where = name ? { 
    name: {
      contains: name,
      mode: "insensitive"
    }
  } : {};
  try {
    return await prisma.muscleGroup.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        exercises: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
      where,
    });
  } catch (error) {
    logError(error);
  }
};

const getMuscleGroupById = async (id) => {
  try {
    return await prisma.muscleGroup.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        exercises: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const postMuscleGroup = async (name, description, image) => {
  try {
    return await prisma.muscleGroup.create({
      data: {
        name,
        description,
        image,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const updateMuscleGroup = async (id, name, description, image) => {
  try {
    return await prisma.muscleGroup.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        exercises: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const checkExercisesLinked = async (muscleGroupId) => {
  try {
    const exerciseCount = await prisma.exercise.count({
      where: {
        muscleGroupId,
      },
    });
    return exerciseCount > 0;
  } catch (error) {
    logError(error);
  }
};

const deleteMuscleGroup = async (id) => {
  try {
    return await prisma.muscleGroup.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    logError(error);
  }
};

export default {
  getMuscleGroup,
  getMuscleGroupById,
  postMuscleGroup,
  updateMuscleGroup,
  deleteMuscleGroup,
  checkExercisesLinked,
};
