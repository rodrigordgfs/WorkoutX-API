import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import workoutService from "../services/workout.service.js";
import { Visibility } from "@prisma/client";

const handleErrorResponse = (error, reply) => {
  if (error instanceof z.ZodError) {
    return reply.code(StatusCodes.BAD_REQUEST).send({
      message: "Erro de validação",
      errors: error.errors.map((err) => ({
        field: err.path.length > 0 ? err.path.join(".") : "body",
        message: err.message,
      })),
    });
  }

  const errorMessages = {
    "Treino não encontrado": StatusCodes.NOT_FOUND,
    "Exercício não encontrado": StatusCodes.NOT_FOUND,
    "Usuário não encontrado": StatusCodes.NOT_FOUND,
    "Usuário já possui um treino em progresso": StatusCodes.CONFLICT,
  };

  const statusCode =
    errorMessages[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode).send({
    error: error.message || "Ocorreu um erro interno",
  });
};

const createWorkout = async (request, reply) => {
  try {
    const schemaBody = z.object({
      name: z.string({ required_error: "O nome do treino é obrigatório" }),
      privacy: z.nativeEnum(Visibility, { 
        required_error: "A privacidade é obrigatória",
        invalid_type_error: "Privacidade deve ser 'public' ou 'private'"
      }),
      userId: z.string({ required_error: "O ID do usuário é obrigatório" }),
      exercises: z.array(
        z.object({
          id: z.string({ required_error: "O ID do exercício é obrigatório" }),
          series: z.number({ 
            required_error: "O número de séries é obrigatório",
            invalid_type_error: "Séries deve ser um número"
          }).min(1, "Séries deve ser pelo menos 1"),
          repetitions: z.number({ 
            required_error: "O número de repetições é obrigatório",
            invalid_type_error: "Repetições deve ser um número"
          }).min(1, "Repetições deve ser pelo menos 1"),
          weight: z.number({ 
            required_error: "O peso é obrigatório",
            invalid_type_error: "Peso deve ser um número"
          }).min(0, "Peso deve ser maior ou igual a 0"),
          rest: z.number({ 
            required_error: "O tempo de descanso é obrigatório",
            invalid_type_error: "Tempo de descanso deve ser um número"
          }).min(0, "Tempo de descanso deve ser maior ou igual a 0"),
        })
      ).min(1, "Pelo menos um exercício é obrigatório"),
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const { name, privacy, exercises, userId } = validation.data;

    const workout = await workoutService.createWorkout(userId, name, privacy, exercises);

    // Transformar WorkoutExercises para exercises na resposta com a estrutura desejada
    const response = {
      id: workout.id,
      userId: workout.userId,
      name: workout.name,
      visibility: workout.visibility,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
      exercises: workout.WorkoutExercises.map(workoutExercise => ({
        id: workoutExercise.exercise.id,
        name: workoutExercise.exercise.name,
        image: workoutExercise.exercise.image,
        videoUrl: workoutExercise.exercise.videoUrl,
        description: workoutExercise.exercise.description,
        series: workoutExercise.series,
        repetitions: workoutExercise.repetitions,
        weight: workoutExercise.weight,
        restTime: workoutExercise.restTime,
        muscleGroup: workoutExercise.exercise.muscleGroup
      }))
    };

    reply.code(StatusCodes.CREATED).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getWorkouts = async (request, reply) => {
  try {
    const schemaQuery = z.object({
      userId: z.string({ required_error: "O ID do usuário é obrigatório" }),
    });

    const validation = schemaQuery.safeParse(request.query);

    if (!validation.success) {
      throw validation.error;
    }

    const { userId } = validation.data;

    const workouts = await workoutService.getWorkouts(userId);

    // Mapear array de workouts para a estrutura desejada
    const response = workouts.map(workout => {
      // Verificar se existe sessão em progresso
      const sessionInProgress = workout.WorkoutSessions && workout.WorkoutSessions.length > 0 ? workout.WorkoutSessions[0] : null;
      
      return {
        id: workout.id,
        userId: workout.userId,
        name: workout.name,
        visibility: workout.visibility,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        session: sessionInProgress ? {
          id: sessionInProgress.id,
          status: sessionInProgress.status,
          startedAt: sessionInProgress.startedAt,
          endedAt: sessionInProgress.endedAt,
          createdAt: sessionInProgress.createdAt,
          updatedAt: sessionInProgress.updatedAt,
               exercises: sessionInProgress.WorkoutSessionExercises.map(sessionExercise => ({
                 id: sessionExercise.id,
                 status: sessionExercise.status,
                 createdAt: sessionExercise.createdAt,
                 updatedAt: sessionExercise.updatedAt,
                 series: sessionExercise.series,
                 repetitions: sessionExercise.repetitions,
                 weight: sessionExercise.weight,
                 restTime: sessionExercise.restTime,
                 name: sessionExercise.workoutExercise.exercise.name,
                 image: sessionExercise.workoutExercise.exercise.image,
                 videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
                 description: sessionExercise.workoutExercise.exercise.description
               }))
        } : {},
        exercises: workout.WorkoutExercises.map(workoutExercise => ({
          id: workoutExercise.exercise.id,
          name: workoutExercise.exercise.name,
          image: workoutExercise.exercise.image,
          videoUrl: workoutExercise.exercise.videoUrl,
          description: workoutExercise.exercise.description,
          series: workoutExercise.series,
          repetitions: workoutExercise.repetitions,
          weight: workoutExercise.weight,
          restTime: workoutExercise.restTime,
          muscleGroup: workoutExercise.exercise.muscleGroup
        }))
      };
    });

    reply.code(StatusCodes.OK).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getWorkoutById = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do treino é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    const result = await workoutService.getWorkoutById(id);

    if (!result || !result.data) {
      return reply.code(StatusCodes.NOT_FOUND).send({
        error: "Treino não encontrado"
      });
    }

    // Sempre retornar dados do workout original com session (se existir)
    const workout = result.type === "session" ? result.data.workout : result.data;
    const session = result.type === "session" ? result.data : null;

    const response = {
      id: workout.id,
      userId: workout.userId,
      name: workout.name,
      visibility: workout.visibility,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
      session: session ? {
        id: session.id,
        status: session.status,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        exercises: session.WorkoutSessionExercises.map(sessionExercise => ({
          id: sessionExercise.id,
          status: sessionExercise.status,
          createdAt: sessionExercise.createdAt,
          updatedAt: sessionExercise.updatedAt,
          series: sessionExercise.series,
          repetitions: sessionExercise.repetitions,
          weight: sessionExercise.weight,
          restTime: sessionExercise.restTime,
          name: sessionExercise.workoutExercise.exercise.name,
          image: sessionExercise.workoutExercise.exercise.image,
          videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
          description: sessionExercise.workoutExercise.exercise.description
        }))
      } : {},
      exercises: workout.WorkoutExercises.map(workoutExercise => ({
        id: workoutExercise.exercise.id,
        name: workoutExercise.exercise.name,
        image: workoutExercise.exercise.image,
        videoUrl: workoutExercise.exercise.videoUrl,
        description: workoutExercise.exercise.description,
        series: workoutExercise.series,
        repetitions: workoutExercise.repetitions,
        weight: workoutExercise.weight,
        restTime: workoutExercise.restTime,
        muscleGroup: workoutExercise.exercise.muscleGroup
      }))
    };

    reply.code(StatusCodes.OK).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const startWorkout = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do treino é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    const workout = await workoutService.startWorkout(id);

    if (!workout) {
      return reply.code(StatusCodes.NOT_FOUND).send({
        error: "Treino não encontrado"
      });
    }

    // Retornar dados do workout original com session
    const response = {
      id: workout.workout.id,
      userId: workout.userId,
      name: workout.workout.name,
      visibility: workout.workout.visibility,
      createdAt: workout.workout.createdAt,
      updatedAt: workout.workout.updatedAt,
      session: {
        id: workout.id,
        status: workout.status,
        startedAt: workout.startedAt,
        endedAt: workout.endedAt,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        exercises: workout.WorkoutSessionExercises.map(sessionExercise => ({
          id: sessionExercise.id,
          status: sessionExercise.status,
          createdAt: sessionExercise.createdAt,
          updatedAt: sessionExercise.updatedAt,
          series: sessionExercise.series,
          repetitions: sessionExercise.repetitions,
          weight: sessionExercise.weight,
          restTime: sessionExercise.restTime,
          name: sessionExercise.workoutExercise.exercise.name,
          image: sessionExercise.workoutExercise.exercise.image,
          videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
          description: sessionExercise.workoutExercise.exercise.description
        }))
      },
      exercises: workout.workout.WorkoutExercises.map(workoutExercise => ({
        id: workoutExercise.exercise.id,
        name: workoutExercise.exercise.name,
        image: workoutExercise.exercise.image,
        videoUrl: workoutExercise.exercise.videoUrl,
        description: workoutExercise.exercise.description,
        series: workoutExercise.series,
        repetitions: workoutExercise.repetitions,
        weight: workoutExercise.weight,
        restTime: workoutExercise.restTime,
        muscleGroup: workoutExercise.exercise.muscleGroup
      }))
    };

    reply.code(StatusCodes.OK).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const completeWorkout = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do treino é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    const workout = await workoutService.completeWorkout(id);

    if (!workout) {
      return reply.code(StatusCodes.NOT_FOUND).send({
        error: "Treino não encontrado"
      });
    }

    // Retornar dados do workout original com session
    const response = {
      id: workout.workout.id,
      userId: workout.userId,
      name: workout.workout.name,
      visibility: workout.workout.visibility,
      createdAt: workout.workout.createdAt,
      updatedAt: workout.workout.updatedAt,
      session: {
        id: workout.id,
        status: workout.status,
        startedAt: workout.startedAt,
        endedAt: workout.endedAt,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        exercises: workout.WorkoutSessionExercises.map(sessionExercise => ({
          id: sessionExercise.id,
          status: sessionExercise.status,
          createdAt: sessionExercise.createdAt,
          updatedAt: sessionExercise.updatedAt,
          series: sessionExercise.series,
          repetitions: sessionExercise.repetitions,
          weight: sessionExercise.weight,
          restTime: sessionExercise.restTime,
          name: sessionExercise.workoutExercise.exercise.name,
          image: sessionExercise.workoutExercise.exercise.image,
          videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
          description: sessionExercise.workoutExercise.exercise.description
        }))
      },
      exercises: workout.workout.WorkoutExercises.map(workoutExercise => ({
        id: workoutExercise.exercise.id,
        name: workoutExercise.exercise.name,
        image: workoutExercise.exercise.image,
        videoUrl: workoutExercise.exercise.videoUrl,
        description: workoutExercise.exercise.description,
        series: workoutExercise.series,
        repetitions: workoutExercise.repetitions,
        weight: workoutExercise.weight,
        restTime: workoutExercise.restTime,
        muscleGroup: workoutExercise.exercise.muscleGroup
      }))
    };

    reply.code(StatusCodes.OK).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const stopWorkout = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do treino é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    const workout = await workoutService.stopWorkout(id);

    if (!workout) {
      return reply.code(StatusCodes.NOT_FOUND).send({
        error: "Treino não encontrado"
      });
    }

    // Retornar dados do workout original com session (antes de deletar)
    const response = {
      id: workout.workout.id,
      userId: workout.userId,
      name: workout.workout.name,
      visibility: workout.workout.visibility,
      createdAt: workout.workout.createdAt,
      updatedAt: workout.workout.updatedAt,
      session: {
        id: workout.id,
        status: workout.status,
        startedAt: workout.startedAt,
        endedAt: workout.endedAt,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        exercises: workout.WorkoutSessionExercises.map(sessionExercise => ({
          id: sessionExercise.id,
          status: sessionExercise.status,
          createdAt: sessionExercise.createdAt,
          updatedAt: sessionExercise.updatedAt,
          series: sessionExercise.series,
          repetitions: sessionExercise.repetitions,
          weight: sessionExercise.weight,
          restTime: sessionExercise.restTime,
          name: sessionExercise.workoutExercise.exercise.name,
          image: sessionExercise.workoutExercise.exercise.image,
          videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
          description: sessionExercise.workoutExercise.exercise.description
        }))
      },
      exercises: workout.workout.WorkoutExercises.map(workoutExercise => ({
        id: workoutExercise.exercise.id,
        name: workoutExercise.exercise.name,
        image: workoutExercise.exercise.image,
        videoUrl: workoutExercise.exercise.videoUrl,
        description: workoutExercise.exercise.description,
        series: workoutExercise.series,
        repetitions: workoutExercise.repetitions,
        weight: workoutExercise.weight,
        restTime: workoutExercise.restTime,
        muscleGroup: workoutExercise.exercise.muscleGroup
      }))
    };

    reply.code(StatusCodes.OK).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const completeWorkoutSessionExercise = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do treino é obrigatório" }),
      exerciseId: z.string({ required_error: "O ID do exercício é obrigatório" }),
    });

    const schemaBody = z.object({
      series: z.string({ required_error: "O número de séries é obrigatório" }),
      repetitions: z.string({ required_error: "O número de repetições é obrigatório" }),
      weight: z.string({ required_error: "O peso é obrigatório" }),
      restTime: z.string({ required_error: "O tempo de descanso é obrigatório" }),
    });

    const validationParams = schemaParams.safeParse(request.params);
    const validationBody = schemaBody.safeParse(request.body);

    if (!validationParams.success) {
      throw validationParams.error;
    }

    if (!validationBody.success) {
      throw validationBody.error;
    }

    const { exerciseId } = validationParams.data;
    const exerciseData = validationBody.data;

    const workout = await workoutService.completeWorkoutSessionExercise(exerciseId, exerciseData);

    if (!workout) {
      return reply.code(StatusCodes.NOT_FOUND).send({
        error: "Exercício da sessão não encontrado"
      });
    }

    // Retornar dados do workout original com session atualizada
    const response = {
      id: workout.workout.id,
      userId: workout.userId,
      name: workout.workout.name,
      visibility: workout.workout.visibility,
      createdAt: workout.workout.createdAt,
      updatedAt: workout.workout.updatedAt,
      session: {
        id: workout.id,
        status: workout.status,
        startedAt: workout.startedAt,
        endedAt: workout.endedAt,
        createdAt: workout.createdAt,
        updatedAt: workout.updatedAt,
        exercises: workout.WorkoutSessionExercises.map(sessionExercise => ({
          id: sessionExercise.id,
          status: sessionExercise.status,
          createdAt: sessionExercise.createdAt,
          updatedAt: sessionExercise.updatedAt,
          series: sessionExercise.series,
          repetitions: sessionExercise.repetitions,
          weight: sessionExercise.weight,
          restTime: sessionExercise.restTime,
          name: sessionExercise.workoutExercise.exercise.name,
          image: sessionExercise.workoutExercise.exercise.image,
          videoUrl: sessionExercise.workoutExercise.exercise.videoUrl,
          description: sessionExercise.workoutExercise.exercise.description
        }))
      },
      exercises: workout.workout.WorkoutExercises.map(workoutExercise => ({
        id: workoutExercise.exercise.id,
        name: workoutExercise.exercise.name,
        image: workoutExercise.exercise.image,
        videoUrl: workoutExercise.exercise.videoUrl,
        description: workoutExercise.exercise.description,
        series: workoutExercise.series,
        repetitions: workoutExercise.repetitions,
        weight: workoutExercise.weight,
        restTime: workoutExercise.restTime,
        muscleGroup: workoutExercise.exercise.muscleGroup
      }))
    };

    reply.code(StatusCodes.OK).send(response);
  } catch (error) {
    handleErrorResponse(error, reply);
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
