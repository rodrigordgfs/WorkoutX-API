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

const completeWorkout = async (workoutId) => {
  try {
    // Buscar a sessão em progresso para este workout
    const sessionInProgress = await workoutRepository.getWorkoutSessionInProgressByUserId(workoutId);
    
    if (!sessionInProgress) {
      throw new AppError("Nenhuma sessão em progresso encontrada para este treino");
    }

    // Finalizar a sessão do treino
    const completedSession = await workoutRepository.completeWorkoutSession(sessionInProgress.id);
    
    return completedSession;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const stopWorkout = async (workoutId) => {
  try {
    // Buscar a sessão em progresso para este workout
    const sessionInProgress = await workoutRepository.getWorkoutSessionInProgressByUserId(workoutId);
    
    if (!sessionInProgress) {
      throw new AppError("Nenhuma sessão em progresso encontrada para este treino");
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

export default {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  startWorkout,
  completeWorkout,
  stopWorkout,
  completeWorkoutSessionExercise,
};