import axios from "axios";
import workoutRepository from "../repositories/workout.repository.js";
import authRepository from "../repositories/auth.repository.js";
import muscleGroupRepository from "../repositories/muscleGroup.repository.js";
import AppError from "../utils/error.js";
import openai from "../libs/openai.js";
import { v4 as uuidv4 } from "uuid";
import {
  isSameDay,
  subDays,
  differenceInMinutes,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";
import { Visibility } from "@prisma/client";
import { uploadImageToS3 } from "../utils/uploadImageToS3.js";

const postWorkout = async (userId, name, visibility, exercises) => {
  try {
    const workout = await workoutRepository.postWorkout(
      userId,
      name,
      visibility,
      exercises
    );
    return workout;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const generatePrompt = async (
  objective,
  muscleGroup,
  trainingTime,
  experienceLevel,
  frequency,
  duration,
  location,
  equipments = [],
  hasPhysicalLimitations,
  limitationDescription,
  preferredTrainingStyle,
  nutrition,
  sleepQuality
) => {
  const exercises = await workoutRepository.getExercise();

  const formattedEquipments = Array.isArray(equipments)
    ? equipments.join(", ")
    : "Nenhum";

  const prompt = `
    Gere um treino personalizado em português (Brasil) com base nas informações abaixo:
  
    **Dados do usuário:**
    - Objetivo: ${objective}
    - Grupo muscular: ${muscleGroup}
    - Tempo disponível para treino: ${trainingTime}
    - Nível de experiência: ${experienceLevel}
    - Frequência semanal: ${frequency}
    - Duração do treino: ${duration}
    - Local de treino: ${location}
    - Equipamentos disponíveis: ${formattedEquipments}
    - Possui limitações físicas: ${hasPhysicalLimitations ? "Sim" : "Não"}
    - Descrição das limitações físicas: ${limitationDescription}
    - Estilo de treino preferido: ${preferredTrainingStyle}
    - Nutrição: ${nutrition}
    - Qualidade do sono: ${sleepQuality}

    **Exercícios disponíveis:**
    Os treinos devem ser compostos por exercícios que trabalhem o grupo muscular ${muscleGroup}. Abaixo, a lista de exercícios disponíveis:
    ${exercises
      .map((exercise) => `ID ${exercise.id} | Nome - ${exercise.name}`)
      .join(" --- ")}
  
    **Geração do treino:**
    Retorne uma lista com os IDs dos exercícios que compõem o treino, juntamente com o número de séries, repetições, peso (Em kilos ou Corporal) e o tempo de descanso para cada exercício.

    **Quantidade de exercícios por treino**
    Deve conter no minimo 8 exercícios.

    **Formato do retorno**
    Retorne direto o JSON com os exercícios, sem perguntar nada ao usuário ou textos.
    O JSON deve seguir o seguinte formato:
    [
      {
        "id": "ID do exercício",
        "series": "Número de séries (Número inteiro)",
        "repetitions": "Número de repetições (Número inteiro)",
        "weight": "Peso (Em kilos ou Corporal)",
        "restTime": "Tempo de descanso (Em segundos)"
        "name": "Nome do exercício"
      },
      ...
    ]
  `;

  return prompt;
};

const postWorkoutAI = async (
  userId,
  objective,
  muscleGroup,
  trainingTime,
  experienceLevel,
  frequency,
  duration,
  location,
  equipments,
  hasPhysicalLimitations,
  limitationDescription,
  preferredTrainingStyle,
  nutrition,
  sleepQuality
) => {
  try {
    const prompt = await generatePrompt(
      objective,
      muscleGroup,
      trainingTime,
      experienceLevel,
      frequency,
      duration,
      location,
      equipments,
      hasPhysicalLimitations,
      limitationDescription,
      preferredTrainingStyle,
      nutrition,
      sleepQuality
    );

    const response = await openai.chat.completions.create({
      model: "mistral-tiny",
      messages: [
        {
          role: "system",
          content:
            "Você é um personal trainer especializado em treinos personalizados. Gere um treino para o cliente com base nas informações fornecidas. Retorne estritamente um JSON válido, sem explicações ou formatação extra.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;

    const normalizedContent = content.normalize("NFC");

    let exercises = JSON.parse(normalizedContent);

    const workout = {
      name: `Treino Personalizado de ${muscleGroup} - IA`,
      exercises: exercises.map((exercise) => ({
        exerciseId: exercise.id,
        series: exercise.series,
        repetitions: exercise.repetitions,
        weight: exercise.weight,
        restTime: exercise.restTime,
      })),
    };

    await workoutRepository.postWorkoutAI(userId, workout);

    return workout;
  } catch (error) {
    console.error("Erro ao chamar Mistral AI:", error);
    throw new AppError(error.message);
  }
};

const getWorkouts = async (userId, visibility, likes, exercises) => {
  try {
    const workouts = await workoutRepository.getWorkouts(
      userId,
      visibility,
      likes,
      exercises
    );
    return workouts;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const postLikeWorkout = async (idWorkout, idUser) => {
  try {
    const workout = await workoutRepository.getWorkoutByID(idWorkout);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    const user = await authRepository.getUserByID(idUser);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const like = await workoutRepository.getWorkoutLikedByUser(
      idWorkout,
      idUser
    );

    if (like) {
      await workoutRepository.postUnlikeWorkout(idWorkout, idUser);
      return { message: "Descurtido com sucesso" };
    }

    await workoutRepository.postLikeWorkout(idWorkout, idUser);
    return { message: "Curtido com sucesso" };
  } catch (error) {
    throw new AppError(error.message);
  }
};

const deleteWorkoutExercise = async (idWorkout, idExercise) => {
  try {
    const exercise = await workoutRepository.getWorkoutExerciseByID(
      idWorkout,
      idExercise
    );

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    await workoutRepository.deleteWorkoutExercise(idWorkout, idExercise);
  } catch (error) {
    throw new AppError(error.message);
  }
};

const copyWorkout = async (id, newUserId) => {
  try {
    const workout = await workoutRepository.getWorkoutByID(id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    const exercises = workout.exercises.map((exercise) => ({
      ...exercise,
      id: uuidv4(),
    }));

    const copiedWorkout = await workoutRepository.postWorkout(
      newUserId,
      workout.name,
      Visibility.PRIVATE,
      exercises
    );

    return copiedWorkout;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const deleteWorkout = async (id) => {
  try {
    const workout = await workoutRepository.getWorkoutByID(id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    await workoutRepository.deleteWorkout(id);
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkoutSession = async (sessionId) => {
  try {
    const session = await workoutRepository.getWorkoutSessionByID(sessionId);

    if (!session) {
      throw new AppError("Sessão de treino não encontrada", 404);
    }

    return session;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const postWorkoutSession = async (userId, workoutId) => {
  try {
    const user = await authRepository.getUserByID(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const workout = await workoutRepository.getWorkoutByID(workoutId);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    const workoutSessionsNotCompleted =
      await workoutRepository.getWorkoutSessionNotCompleted(userId);

    if (workoutSessionsNotCompleted?.length > 0) {
      throw new AppError(
        "Você já possui uma sessão de treino em andamento",
        400
      );
    }

    const session = await workoutRepository.postWorkoutSession(
      userId,
      workoutId,
      workout.exercises
    );

    return session;
  } catch (error) {
    throw new AppError(error.message);
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
    const session = await workoutRepository.getWorkoutSessionByID(sessionId);

    if (!session) {
      throw new AppError("Sessão de treino não encontrada", 404);
    }

    const exercise = await workoutRepository.getWorkoutSessionExerciseById(
      exerciseId
    );

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    const workoutSession = await workoutRepository.patchWorkoutSessionExercise(
      sessionId,
      exerciseId,
      completed,
      weight,
      repetitions,
      series
    );

    return workoutSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const deleteWorkoutSession = async (sessionId) => {
  try {
    const session = await workoutRepository.getWorkoutSessionByID(sessionId);

    if (!session) {
      throw new AppError("Sessão de treino não encontrada", 404);
    }

    await workoutRepository.deleteWorkoutSession(sessionId);
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkoutSessionByWorkoutID = async (workoutId) => {
  try {
    const workout = await workoutRepository.getWorkoutByID(workoutId);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    const session = await workoutRepository.getWorkoutSessionByWorkoutID(
      workoutId
    );

    return session;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const postCompleteWorkoutSession = async (sessionId) => {
  try {
    const session = await workoutRepository.getWorkoutSessionByID(sessionId);

    if (!session) {
      throw new AppError("Sessão de treino não encontrada", 404);
    }

    if (session.endedAt !== null) {
      throw new AppError("Sessão de treino já finalizada", 400);
    }

    const workoutSession = await workoutRepository.postCompleteWorkoutSession(
      sessionId
    );

    return workoutSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkoutHistory = async (userId, name, order, period, status) => {
  try {
    const user = await authRepository.getUserByID(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const workoutHistory = await workoutRepository.getWorkoutHistory(
      userId,
      name,
      order,
      period,
      status
    );

    const formattedHistory = workoutHistory.map((session) => {
      const duration =
        session.endedAt && session.startedAt
          ? Math.round(
              (new Date(session.endedAt).getTime() -
                new Date(session.startedAt).getTime()) /
                60000
            )
          : "Em andamento";

      const completedExercises = session.exercises.filter(
        (ex) => ex.completed
      ).length;
      const totalExercises = session.exercises.length;
      const completionRate =
        totalExercises > 0
          ? Math.round((completedExercises / totalExercises) * 100)
          : 0;

      return {
        id: session.id,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        duration: duration,
        workout: {
          name: session.workout.name,
          visibility: session.workout.visibility,
          createdAt: session.workout.createdAt,
        },
        exercises: session.exercises.map((ex) => ({
          id: ex.id,
          name: ex.name,
          series: ex.series,
          repetitions: ex.repetitions,
          weight: ex.weight,
          restTime: ex.restTime,
          completed: ex.completed,
        })),
        stats: {
          totalExercises,
          completedExercises,
          completionRate: `${completionRate}%`,
        },
      };
    });

    return formattedHistory;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getAllWorkoutSessionExercises = async (userId) => {
  try {
    const workoutSessions = await workoutRepository.getWorkoutSessions(userId);

    if (workoutSessions.length === 0) {
      return [];
    }

    const exercises = workoutSessions
      .map((session) => session.exercises)
      .flat();

    if (exercises.length === 0) {
      return [];
    }

    const exerciseCount = exercises.reduce((acc, sessionExercise) => {
      const exerciseId = sessionExercise.exerciseId;
      if (acc[exerciseId]) {
        acc[exerciseId].count += 1;
      } else {
        acc[exerciseId] = {
          exercise: sessionExercise,
          count: 1,
        };
      }
      return acc;
    }, {});

    const mostPerformedExercises = Object.values(exerciseCount);

    mostPerformedExercises.sort((a, b) => b.count - a.count);

    // Retorna apenas os 10 mais realizados
    return mostPerformedExercises.slice(0, 10);
  } catch (error) {
    throw new AppError(error.message);
  }
};

const calculatePercentageDifference = (
  currentMonthWorkouts,
  lastMonthWorkouts
) => {
  if (lastMonthWorkouts === 0) {
    return currentMonthWorkouts === 0 ? 0 : 100;
  }
  const difference =
    ((currentMonthWorkouts - lastMonthWorkouts) / lastMonthWorkouts) * 100;
  return difference === 0 ? 0 : difference.toFixed(2);
};

const getConsecutiveWorkoutDays = async (userId) => {
  const workoutSessions = await workoutRepository.getWorkoutSessions(userId);

  if (workoutSessions.length === 0) {
    return 0;
  }

  let maxConsecutiveDays = 1;
  let currentConsecutiveDays = 1;

  for (let i = 1; i < workoutSessions.length; i++) {
    const previousSessionDate = workoutSessions[i - 1].startedAt;
    const currentSessionDate = workoutSessions[i].startedAt;

    if (isSameDay(subDays(currentSessionDate, 1), previousSessionDate)) {
      currentConsecutiveDays++;
    } else {
      maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);
      currentConsecutiveDays = 1;
    }
  }

  maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);

  return maxConsecutiveDays;
};

const getAverageWorkoutDuration = async (userId) => {
  const workoutSessions = await workoutRepository.getWorkoutSessionsEnded(
    userId
  );

  if (workoutSessions.length === 0) {
    return 0;
  }

  let totalDuration = 0;
  workoutSessions.forEach((session) => {
    totalDuration += differenceInMinutes(session.endedAt, session.startedAt);
  });

  const averageDuration = totalDuration / workoutSessions.length;

  return averageDuration;
};

const getCompletionRate = async (userId) => {
  const workoutSessions = await workoutRepository.getWorkoutSessions(userId);

  const totalSessions = workoutSessions.length;

  if (totalSessions === 0) {
    return 0;
  }

  const completedSessions = workoutSessions.filter(
    (session) => session.endedAt !== null
  ).length;

  const completionRate = (completedSessions / totalSessions) * 100;

  return completionRate.toFixed(2);
};

const getRecentActivities = async (userId) => {
  const workoutSessions = await workoutRepository.getRecentsWorkoutsSessions(
    userId
  );

  if (workoutSessions.length === 0) {
    return [];
  }

  const workoutSessionsWithDuration = workoutSessions
    .slice(0, 10)
    .map((session) => {
      if (session.endedAt === null) {
        return {
          ...session,
          duration: null,
        };
      }
      const startedAt = new Date(session.startedAt);
      const endedAt = new Date(session.endedAt);

      const durationMinutes = differenceInMinutes(endedAt, startedAt);

      return {
        ...session,
        duration: durationMinutes,
      };
    });

  return workoutSessionsWithDuration;
};

const getVolumeWorkoutExercises = async (userId) => {
  try {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    const workoutSession = await workoutRepository.getVolumeWorkoutExercises(
      userId,
      startDate,
      endDate
    );

    const volumeByDay = {};

    workoutSession.forEach((session) => {
      const sessionDate = format(session.startedAt, "yyyy-MM-dd");
      if (!volumeByDay[sessionDate]) {
        volumeByDay[sessionDate] = 0;
      }

      session.exercises.forEach((exercise) => {
        const weight = parseFloat(exercise.weight) || 0;
        const repetitions = parseInt(exercise.repetitions) || 0;
        const series = parseInt(exercise.series) || 0;
        volumeByDay[sessionDate] += weight * repetitions * series;
      });
    });

    return volumeByDay;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message);
  }
};

const getWorkoutDashboard = async (userId) => {
  try {
    const user = await authRepository.getUserByID(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const workoutMonthAmmount = await workoutRepository.getWorkoutMonthAmmount(
      userId
    );
    const lastMonthWorkoutsAmmount =
      await workoutRepository.getLastMonthWorkoutsAmmount(userId);
    const workoutPercentageChange = calculatePercentageDifference(
      workoutMonthAmmount,
      lastMonthWorkoutsAmmount
    );
    const consecutiveWorkoutDays = await getConsecutiveWorkoutDays(userId);
    const averageWorkoutDuration = await getAverageWorkoutDuration(userId);
    const completionRate = await getCompletionRate(userId);
    const workoutExercises = await getAllWorkoutSessionExercises(userId);
    const recentActivities = await getRecentActivities(userId);
    const volumeWorkoutExercises = await getVolumeWorkoutExercises(userId);

    return {
      workoutMonthAmmount,
      workoutPercentageChange,
      consecutiveWorkoutDays,
      averageWorkoutDuration,
      completionRate,
      workoutExercises,
      recentActivities,
      volumeWorkoutExercises,
    };
  } catch (error) {
    throw new AppError(error.message);
  }
};

const postExercise = async (
  name,
  muscleGroupId,
  series,
  repetitions,
  weight,
  restTime,
  videoUrl,
  image,
  instructions
) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(
      muscleGroupId
    );

    if (!muscleGroup) {
      throw new AppError("Grupo muscular não encontrado", 404);
    }

    // const imageUrl = await uploadImageToS3(
    //   name,
    //   image,
    //   "workoutx-bucket",
    //   "exercises/"
    // );

    const exercise = await workoutRepository.postExercise(
      name,
      muscleGroupId,
      series,
      repetitions,
      weight,
      restTime,
      videoUrl,
      image,
      instructions
    );
    return exercise;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getExercises = (muscleGroupId, muscleGroup) => {
  try {
    const exercises = workoutRepository.getExercise(muscleGroupId, muscleGroup);
    return exercises;
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  postWorkout,
  postWorkoutAI,
  getWorkouts,
  postLikeWorkout,
  deleteWorkoutExercise,
  copyWorkout,
  deleteWorkout,
  postWorkoutSession,
  patchWorkoutSessionExercise,
  getWorkoutSession,
  getWorkoutSessionByWorkoutID,
  postCompleteWorkoutSession,
  getWorkoutHistory,
  deleteWorkoutSession,
  getWorkoutDashboard,
  postExercise,
  getExercises,
};
