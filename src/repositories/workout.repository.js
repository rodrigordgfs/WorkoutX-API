import { prisma } from "../libs/prisma.js";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  setHours,
  setMinutes,
  setSeconds,
  subYears,
} from "date-fns";

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
            imageUrl: true,
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
            imageUrl: true,
            instructions: true,
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkouts = async (userId, visibility, likes, exercises) => {
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
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        ...(likes && {
          likes: {
            select: {
              userId: true,
            },
          },
        }),
        ...(exercises && {
          exercises: {
            select: {
              exercise: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  instructions: true,
                  muscleGroup: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  repetitions: true,
                  restTime: true,
                  series: true,
                  videoUrl: true,
                  weight: true,
                },
              },
            },
          },
        }),
      },
    });

    return workouts.map((workout) => ({
      ...workout,
      exercises: exercises
        ? workout.exercises.map((e) => e.exercise)
        : undefined,
    }));
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
            exercise: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                instructions: true,
                muscleGroup: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                repetitions: true,
                restTime: true,
                series: true,
                videoUrl: true,
                weight: true,
              },
            },
          },
        },
      },
    });

    return {
      ...workout,
      exercises: workout.exercises.map((e) => e.exercise),
    };
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

const getWorkoutExerciseByID = async (idWorkout, idExercise) => {
  try {
    const exercise = await prisma.workoutExercises.findFirst({
      where: {
        exerciseId: idExercise,
        workoutId: idWorkout,
      },
    });

    return exercise;
  } catch (error) {
    logError(error);
  }
};

const deleteWorkoutExercise = async (idWorkout, idExercise) => {
  try {
    await prisma.workoutExercises.deleteMany({
      where: {
        workoutId: idWorkout,
        exerciseId: idExercise,
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

const getVolumeWorkoutExercises = async (userId, startDate, endDate) => {
  try {
    const exercises = await prisma.workoutSession.findMany({
      where: {
        userId,
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
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
        endedByService: true,
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

const getRecentsWorkoutsSessions = async (userId) => {
  try {
    const sessions = await prisma.workoutSession.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        endedByService: true,
        workout: {
          select: {
            id: true,
            name: true,
          },
        },
        exercises: true,
      },
      orderBy: {
        startedAt: "desc",
      },
      take: 5,
    });

    const sessionsWithExerciseCount = sessions.map((session) => {
      return {
        id: session.id,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        endedByService: session.endedByService,
        workout: session.workout,
        exerciseCount: session.exercises.length,
      };
    });

    return sessionsWithExerciseCount;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessions = async (userId) => {
  try {
    const sessions = await prisma.workoutSession.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        endedByService: true,
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
      orderBy: {
        startedAt: "asc",
      },
    });

    return sessions;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionsEnded = async (userId) => {
  try {
    const sessions = await prisma.workoutSession.findMany({
      where: {
        userId,
        endedAt: {
          not: null,
        },
      },
      orderBy: {
        startedAt: "asc",
      },
    });

    return sessions;
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
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        endedByService: true,
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
        endedAt: null,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        endedByService: true,
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
        endedByService: true,
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

const deleteWorkoutSession = async (sessionId) => {
  try {
    await prisma.workoutSession.delete({
      where: {
        id: sessionId,
      },
    });

    return;
  } catch (error) {
    logError(error);
  }
};

const getWorkoutHistory = async (
  userId,
  name,
  order = "desc",
  period = "all",
  status = "all"
) => {
  try {
    let dateFilter = {};
    const now = new Date();

    if (period === "last_month") {
      dateFilter.startedAt = { gte: startOfMonth(subMonths(now, 1)) };
    } else if (period === "last_3_months") {
      dateFilter.startedAt = { gte: startOfMonth(subMonths(now, 3)) };
    } else if (period === "last_year") {
      dateFilter.startedAt = { gte: startOfMonth(subYears(now, 1)) };
    }

    let statusFilter = {};
    if (status === "completed") {
      statusFilter.endedAt = { not: null };
    } else if (status === "in_progress") {
      statusFilter.endedAt = null;
    }

    const workoutHistory = await prisma.workoutSession.findMany({
      where: {
        userId: userId,
        workout: {
          name: {
            contains: name || "",
          },
        },
        ...dateFilter,
        ...statusFilter,
      },
      select: {
        id: true,
        startedAt: true,
        endedAt: true,
        endedByService: true,
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
        endedAt: order === "asc" ? "asc" : "desc",
      },
    });

    return workoutHistory;
  } catch (error) {
    logError(error);
    throw new Error("Erro ao buscar o histórico de treinos");
  }
};

const getWorkoutMonthAmmount = async (userId) => {
  try {
    const workoutMonthAmmount = await prisma.workoutSession.findMany({
      where: {
        userId: userId,
        startedAt: {
          gte: setSeconds(
            setMinutes(setHours(startOfMonth(new Date()), 0), 0),
            0
          ),
        },
      },
    });

    return workoutMonthAmmount.length;
  } catch (error) {
    logError(error);
  }
};

const getLastMonthWorkoutsAmmount = async (userId) => {
  try {
    const firstDayOfLastMonth = startOfMonth(subMonths(new Date(), 1));
    const lastDayOfLastMonth = endOfMonth(subMonths(new Date(), 1));

    const workouts = await prisma.workoutSession.findMany({
      where: {
        userId,
        startedAt: {
          gte: firstDayOfLastMonth,
          lte: lastDayOfLastMonth,
        },
      },
    });

    return workouts.length;
  } catch (error) {
    logError(error);
  }
};

export default {
  postWorkout,
  postWorkoutAI,
  getWorkouts,
  getWorkoutByID,
  postLikeWorkout,
  getWorkoutLikedByUser,
  postUnlikeWorkout,
  getExerciseByID,
  deleteWorkoutExercise,
  deleteWorkout,
  getWorkoutExerciseByID,
  getWorkoutExercises,
  postWorkoutSession,
  patchWorkoutSessionExercise,
  getWorkoutSessionByID,
  getWorkoutSessionExerciseById,
  getWorkoutSessionNotCompleted,
  getWorkoutSessionByWorkoutID,
  postCompleteWorkoutSession,
  getWorkoutHistory,
  deleteWorkoutSession,
  getWorkoutMonthAmmount,
  getLastMonthWorkoutsAmmount,
  getWorkoutSessions,
  getWorkoutSessionsEnded,
  getRecentsWorkoutsSessions,
  getVolumeWorkoutExercises,
};
