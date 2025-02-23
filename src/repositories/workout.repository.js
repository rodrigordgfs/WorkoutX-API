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

const postWorkoutAI = async (userId, workout) => {
  try {
    return await prisma.workout.create({
      data: {
        userId,
        name: String(workout.name),
        exercises: {
          create: workout.exercises.map((exercise) => ({
            name: String(exercise.name),
            series: String(exercise.series),
            repetitions: String(exercise.repetitions),
            weight: String(exercise.weight),
            restTime: String(exercise.restTime),
            videoUrl: String(exercise.videoUrl),
            instructions: String(exercise.instructions),
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

const getWorkoutByID = async (workoutId) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
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

    return workout;
  } catch (error) {
    logError(error);
  }
};

const postLikeWorkout = async (workoutId, userId) => {
  try {
    const like = await prisma.workoutLikes.create({
      data: {
        workoutId,
        userId,
      },
    });

    return like;
  } catch (error) {
    logError(error);
  }
};

const postUnlikeWorkout = async (workoutId, userId) => {
  try {
    await prisma.workoutLikes.deleteMany({
      where: {
        workoutId,
        userId,
      },
    });

    return;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutLikedByUser = async (workoutId, userId) => {
  try {
    const like = await prisma.workoutLikes.findFirst({
      where: {
        workoutId,
        userId,
      },
    });

    return like;
  } catch (error) {
    logError(error);
  }
};

const getExerciseByID = async (exerciseId) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    return exercise;
  } catch (error) {
    logError(error);
  }
};

const deleteExercise = async (exerciseId) => {
  try {
    await prisma.exercise.delete({
      where: {
        id: exerciseId,
      },
    });

    return;
  } catch (error) {
    logError(error);
  }
};

const deleteWorkout = async (workoutId) => {
  try {
    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });

    return;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutExercises = async (workoutId) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        workoutId,
      },
    });

    return exercises;
  } catch (error) {
    logError(error);
  }
};

const postWorkoutSession = async (userId, workoutId, exercises) => {
  try {
    const workoutSession = await prisma.workoutSession.create({
      data: {
        userId,
        workoutId,
        exercises: {
          create: exercises.map((exercise) => ({
            exerciseId: exercise.id,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            restTime: exercise.restTime,
          })),
        },
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        workout: {
          select: {
            id: true,
            name: true,
          },
        },
        exercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            completed: true,
            exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return workoutSession;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionNotCompleted = async (userId) => {
  try {
    const session = await prisma.workoutSession.findFirst({
      where: {
        userId,
        endedAt: null,
      },
    });

    return session;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionByID = async (sessionId) => {
  try {
    const session = await prisma.workoutSession.findUnique({
      where: {
        id: sessionId,
        endedAt: null,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        workout: {
          select: {
            id: true,
            name: true,
          },
        },
        exercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            completed: true,
            exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return session;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionExerciseById = async (exerciseId) => {
  try {
    const exercise = await prisma.workoutSessionExercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    return exercise;
  } catch (error) {
    logError(error);
  }
};

const patchWorkoutSessionExercise = async (
  sessionId,
  exerciseId,
  completed,
  weight,
  repetitions,
  series
) => {
  try {
    await prisma.workoutSessionExercise.update({
      where: {
        id: exerciseId,
      },
      data: {
        completed,
        weight,
        repetitions,
        series,
        updatedAt: new Date(),
      },
    });

    const workoutSession = await prisma.workoutSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        workout: {
          select: {
            id: true,
            name: true,
          },
        },
        exercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            completed: true,
            exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return workoutSession;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionByWorkoutID = async (workoutId) => {
  try {
    const session = await prisma.workoutSession.findFirst({
      where: {
        workoutId,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        workout: {
          select: {
            id: true,
            name: true,
          },
        },
        exercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            completed: true,
            exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return session;
  } catch (error) {
    logError(error);
  }
};

const postCompleteWorkoutSession = async (sessionId) => {
  try {
    await prisma.workoutSession.update({
      where: {
        id: sessionId,
      },
      data: {
        endedAt: new Date(),
      },
    });

    const workoutSession = await prisma.workoutSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        workout: {
          select: {
            id: true,
            name: true,
          },
        },
        exercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            completed: true,
            exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return workoutSession;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutHistory = async (userId) => {
  try {
    const workoutHistory = await prisma.workoutSession.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        workout: {
          select: {
            name: true,
            visibility: true,
            createdAt: true,
          },
        },
        exercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            completed: true,
            exercise: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        endedAt: "desc",
      },
    });

    return workoutHistory;
  } catch (error) {
    logError(error);
  }
}

export default {
  postWorkout,
  postWorkoutAI,
  getWorkouts,
  getWorkoutByID,
  postLikeWorkout,
  getWorkoutLikedByUser,
  postUnlikeWorkout,
  getExerciseByID,
  deleteExercise,
  deleteWorkout,
  getWorkoutExercises,
  postWorkoutSession,
  patchWorkoutSessionExercise,
  getWorkoutSessionByID,
  getWorkoutSessionExerciseById,
  getWorkoutSessionNotCompleted,
  getWorkoutSessionByWorkoutID,
  postCompleteWorkoutSession,
  getWorkoutHistory
};
