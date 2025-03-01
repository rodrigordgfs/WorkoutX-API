import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const getMuscleGroup = async () => {
  try {
    return await prisma.muscleGroup.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
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
            instructions: true,
            series: true,
            repetitions: true,
            restTime: true,
            weight: true,
            imageUrl: true,
            videoUrl: true,
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

export default {
  getMuscleGroup,
  getMuscleGroupById,
  postMuscleGroup,
};
