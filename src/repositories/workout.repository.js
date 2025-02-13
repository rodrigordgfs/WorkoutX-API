import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const postWorkout = async (userId, name, exercises) => {
  try {
    const workout = await prisma.workout.create({
      data: {
        userId,
        name,
        exercises: {
          create: exercises.map((exercise) => ({
            name: exercise.name,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            restTime: exercise.restTime,
            videoUrl: exercise.videoUrl,
            instructions: exercise.instructions,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        exercises: {
            select: {
                id: true,
                name: true,
                series: true,
                repetitions: true,
                weight: true,
                restTime: true,
                videoUrl: true,
                instructions: true,
            }
        }
      }
    });

    return workout;
  } catch (error) {
    logError(error);
  }
};

export default {
  postWorkout,
};
