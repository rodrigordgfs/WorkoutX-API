import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const getExercises = async (muscleGroupId, name) => {
  const where = {};
  
  if (muscleGroupId) {
    where.muscleGroupId = muscleGroupId;
  }
  
  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }
  
  try {
    return await prisma.exercise.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        videoUrl: true,
        muscleGroupId: true,
        muscleGroup: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getExerciseById = async (id) => {
  try {
    return await prisma.exercise.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        videoUrl: true,
        muscleGroupId: true,
        muscleGroup: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const createExercise = async (name, description, image, videoUrl, muscleGroupId) => {
  try {
    return await prisma.exercise.create({
      data: {
        name,
        description,
        image,
        videoUrl,
        muscleGroupId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        videoUrl: true,
        muscleGroupId: true,
        muscleGroup: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const updateExercise = async (id, name, description, image, videoUrl, muscleGroupId) => {
  try {
    return await prisma.exercise.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
        videoUrl,
        muscleGroupId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        videoUrl: true,
        muscleGroupId: true,
        muscleGroup: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const deleteExercise = async (id) => {
  try {
    return await prisma.exercise.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    logError(error);
  }
};

export default {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};