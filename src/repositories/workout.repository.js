import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const postWorkout = async (userId, name, visibility, exercises) => {
  try {
    const workout = await prisma.workout.create({
      data: {
        userId,
        name,
        visibility,
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
        visibility: true,
        userId: true,
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
          },
        },
      },
    });

    return workout;
  } catch (error) {
    logError(error);
  }
};

const postWorkoutAI = async (userId, workouts) => {
  try {
    for (const workout of workouts) {
      await prisma.workout.create({
        data: {
          userId,
          name: workout.name,
          exercises: {
            create: workout.exercises.map((exercise) => ({
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
      });
    }

    return workouts;
  } catch (error) {
    logError(error);
  }
};

const getWorkouts = async (userId, visibility) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(visibility ? { visibility } : {}),
      },
      select: {
        id: true,
        name: true,
        visibility: true,
        likes: {
          select: {
            userId: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
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
          },
        },
      },
    });

    return workouts;
  } catch (error) {
    logError(error);
  }
};

export default {
  postWorkout,
  postWorkoutAI,
  getWorkouts,
};
