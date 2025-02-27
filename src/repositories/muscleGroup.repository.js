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

export default {
  getMuscleGroup
};
