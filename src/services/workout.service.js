import workoutRepository from "../repositories/workout.repository.js";
import AppError from "../utils/error.js";

const createWorkout = async (userId, name, privacy, exercises) => {
  try {
    // Verificar se o usuário existe
    const user = await workoutRepository.getUserById(userId);
    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    // Verificar se todos os exercícios existem
    const exerciseIds = exercises.map(ex => ex.id);
    const existingExercises = await workoutRepository.getExercisesByIds(exerciseIds);
    
    if (existingExercises.length !== exerciseIds.length) {
      throw new AppError("Um ou mais exercícios não foram encontrados");
    }

    // Criar o treino
    const workout = await workoutRepository.createWorkout(userId, name, privacy, exercises);

    return workout;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkouts = async (userId) => {
  try {
    const workouts = await workoutRepository.getWorkoutsByUserId(userId);
    return workouts;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkoutById = async (workoutId) => {
  try {
    // Primeiro verificar se existe uma sessão em progresso para este workout
    const sessionInProgress = await workoutRepository.getWorkoutSessionInProgressByWorkoutId(workoutId);
    
    if (sessionInProgress) {
      // Se existe sessão em progresso, retornar os dados da sessão
      return {
        type: "session",
        data: sessionInProgress
      };
    } else {
      // Se não existe sessão em progresso, retornar os dados do workout original
      const workout = await workoutRepository.getWorkoutById(workoutId);
      return {
        type: "workout",
        data: workout
      };
    }
  } catch (error) {
    throw new AppError(error.message);
  }
};

const startWorkout = async (workoutId) => {
  try {
    // Buscar o workout para obter o userId
    const workout = await workoutRepository.getWorkoutById(workoutId);

    if (!workout) {
      throw new AppError("Treino não encontrado");
    }

    // Verificar se o usuário já tem uma sessão em progresso
    const sessionInProgress = await workoutRepository.getWorkoutSessionInProgressByUserId(workout.userId);
    
    if (sessionInProgress) {
      throw new AppError("Usuário já possui um treino em progresso");
    }

    // Criar uma nova sessão do treino
    const workoutSession = await workoutRepository.createWorkoutSession(workout.userId, workoutId);
    
    // Buscar a sessão completa com os exercícios
    const fullSession = await workoutRepository.getWorkoutSessionById(workoutSession.id);
    
    return fullSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const completeWorkout = async (workoutId, userId, observation) => {
  try {
    // Buscar a sessão em progresso para este usuário
    const sessionInProgress = await workoutRepository.getWorkoutSessionInProgressByUserId(userId);
    
    if (!sessionInProgress) {
      throw new AppError("Nenhuma sessão em progresso encontrada para este treino");
    }

    // Verificar se a sessão pertence ao workout correto
    if (sessionInProgress.workoutId !== workoutId) {
      throw new AppError("Sessão em progresso não pertence a este treino");
    }

    // Finalizar a sessão do treino com observação
    const completedSession = await workoutRepository.completeWorkoutSession(sessionInProgress.id, observation);
    
    return completedSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const stopWorkout = async (workoutId, userId) => {
  try {
    // Buscar a sessão em progresso para este usuário
    const sessionInProgress = await workoutRepository.getWorkoutSessionInProgressByUserId(userId);
    
    if (!sessionInProgress) {
      throw new AppError("Nenhuma sessão em progresso encontrada para este treino");
    }

    // Verificar se a sessão pertence ao workout correto
    if (sessionInProgress.workoutId !== workoutId) {
      throw new AppError("Sessão em progresso não pertence a este treino");
    }

    // Buscar a sessão completa antes de deletar
    const fullSession = await workoutRepository.getWorkoutSessionById(sessionInProgress.id);
    
    // Deletar a sessão do treino (parar o treino)
    await workoutRepository.deleteWorkoutSession(sessionInProgress.id);
    
    return fullSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const completeWorkoutSessionExercise = async (sessionExerciseId, exerciseData) => {
  try {
    // Completar o exercício da sessão com os dados fornecidos
    const completedExercise = await workoutRepository.completeWorkoutSessionExercise(sessionExerciseId, exerciseData);
    
    if (!completedExercise) {
      throw new AppError("Exercício da sessão não encontrado");
    }

    return completedExercise.workoutSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkoutHistory = async (userId, filters = {}) => {
  try {
    const sessions = await workoutRepository.getWorkoutHistory(userId, filters);

    // Processar cada sessão para calcular duração e percentual de conclusão
    const processedSessions = sessions.map(session => {
      // Calcular duração do treino
      const startTime = new Date(session.startedAt);
      const endTime = session.endedAt ? new Date(session.endedAt) : new Date();
      const durationMs = endTime.getTime() - startTime.getTime();
      const durationMinutes = Math.round(durationMs / (1000 * 60));

      // Calcular percentual de exercícios concluídos
      const totalExercises = session.WorkoutSessionExercises.length;
      const completedExercises = session.WorkoutSessionExercises.filter(
        exercise => exercise.status === 'COMPLETED'
      ).length;
      const completionPercentage = totalExercises > 0 
        ? Math.round((completedExercises / totalExercises) * 100) 
        : 0;

      // Processar exercícios
      const exercises = session.WorkoutSessionExercises.map(sessionExercise => ({
        id: sessionExercise.id,
        name: sessionExercise.workoutExercise.exercise.name,
        image: sessionExercise.workoutExercise.exercise.image,
        videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
        description: sessionExercise.workoutExercise.exercise.description,
        muscleGroup: sessionExercise.workoutExercise.exercise.muscleGroup,
        series: sessionExercise.series,
        repetitions: sessionExercise.repetitions,
        weight: sessionExercise.weight,
        restTime: sessionExercise.restTime,
        status: sessionExercise.status,
        createdAt: sessionExercise.createdAt,
        updatedAt: sessionExercise.updatedAt
      }));

      return {
        id: session.id,
        workoutId: session.workoutId,
        workoutName: session.workout.name,
        workoutVisibility: session.workout.visibility,
        status: session.status,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        duration: durationMinutes, // duração em minutos
        completionPercentage: completionPercentage,
        observation: session.observation,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        exercises: exercises
      };
    });

    return processedSessions;
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  startWorkout,
  completeWorkout,
  stopWorkout,
  completeWorkoutSessionExercise,
  getWorkoutHistory,
  async getDashboard(userId) {
    try {
      const now = new Date();
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const [thisMonthSessions, lastMonthSessions] = await Promise.all([
        workoutRepository.getWorkoutSessionsByUserBetween(userId, startOfThisMonth, startOfNextMonth),
        workoutRepository.getWorkoutSessionsByUserBetween(userId, startOfLastMonth, startOfThisMonth),
      ]);

      const thisCount = thisMonthSessions.length;
      const lastCount = lastMonthSessions.length;
      const monthVariation = lastCount === 0 ? (thisCount > 0 ? 100 : 0) : Math.round(((thisCount - lastCount) / lastCount) * 100);

      const dates = Array.from(new Set(thisMonthSessions.map(s => new Date(s.startedAt.getFullYear(), s.startedAt.getMonth(), s.startedAt.getDate()).getTime()))).sort((a, b) => a - b);
      let bestStreak = 0;
      let currentStreak = 0;
      for (let i = 0; i < dates.length; i++) {
        if (i === 0) { currentStreak = 1; bestStreak = 1; continue; }
        const prev = dates[i - 1];
        const curr = dates[i];
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) currentStreak += 1; else if (diffDays > 1) currentStreak = 1;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
      }

      const durations = thisMonthSessions.filter(s => s.endedAt).map(s => (s.endedAt.getTime() - s.startedAt.getTime()) / (1000 * 60));
      const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

      const completedCount = thisMonthSessions.filter(s => s.status === 'COMPLETED').length;
      const completionRate = thisCount > 0 ? Math.round((completedCount / thisCount) * 100) : 0;

      // Atividades recentes (últimos 5 treinos)
      const lastSessions = await workoutRepository.getLastWorkoutSessionsByUser(userId, 5);
      const activities = lastSessions.map(s => ({
        id: s.id,
        title: s.workout?.name,
        exercises: s.WorkoutSessionExercises.length,
        durationMinutes: s.endedAt ? Math.round((s.endedAt.getTime() - s.startedAt.getTime()) / (1000 * 60)) : 0,
        status: s.status,
        startedAt: s.startedAt,
      }));

      // Volume semanal de exercícios (semana atual)
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // 0 = domingo, 1 = segunda, etc.
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDay);
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const weeklyVolume = await workoutRepository.getWeeklyExerciseVolume(userId, startOfWeek, endOfWeek);

      // Exercícios mais realizados
      const topExercises = await workoutRepository.getTopExercises(userId, 10);

      return {
        month: { count: thisCount, variation: monthVariation },
        streak: bestStreak,
        averageDurationMinutes: avgDuration,
        completionRate,
        activities,
        weeklyVolume,
        topExercises,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  },
};