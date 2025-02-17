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
  };

  const statusCode =
    errorMessages[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode).send({
    error: error.message || "Ocorreu um erro interno",
  });
};

const postWorkout = async (request, reply) => {
  try {
    const schemaBody = z.object({
      name: z
        .string({ required_error: "O nome do treino é obrigatório" })
        .min(3, { message: "O nome do treino deve ter no mínimo 3 caracteres" })
        .max(255, {
          message: "O nome do treino deve ter no máximo 255 caracteres",
        }),
      visibility: z.nativeEnum(visibility).default(visibility.PUBLIC),
      userId: z.string({ required_error: "O ID do usuário é obrigatório" }),
      exercises: z
        .array(
          z.object({
            name: z
              .string({ required_error: "O nome do exercício é obrigatório" })
              .min(3, {
                message: "O nome do exercício deve ter no mínimo 3 caracteres",
              }),
            series: z
              .string({ required_error: "O número de séries é obrigatório" })
              .regex(/^\d+$/, {
                message: "O número de séries deve ser um número inteiro",
              }),
            repetitions: z.string({
              required_error: "O número de repetições é obrigatório",
            }),
            weight: z.string({ required_error: "O peso é obrigatório" }),
            restTime: z.string({
              required_error: "O tempo de descanso é obrigatório",
            }),
            videoUrl: z
              .string({ required_error: "A URL do vídeo é obrigatória" })
              .url({ message: "A URL do vídeo deve ser válida" }),
            instructions: z
              .string({ required_error: "As instruções são obrigatórias" })
              .min(3, {
                message: "As instruções devem ter pelo menos 3 caracteres",
              }),
          })
        )
        .min(1, { message: "A lista de exercícios não pode estar vazia" })
        .refine((val) => Array.isArray(val), {
          message: "O campo exercises deve ser uma lista de exercícios",
        }),
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const { userId, name, exercises, visibility } = validation.data;

    const workout = await workoutService.postWorkout(
      userId,
      name,
      visibility,
      exercises
    );

    reply.code(StatusCodes.CREATED).send(workout);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const postWorkoutAI = async (request, reply) => {
  try {
    const schemaBody = z.object({
      userId: z.string({ required_error: "O ID do usuário é obrigatório" }),
      objective: z.string({ required_error: "O objetivo é obrigatório" }),
      trainingTime: z.string({
        required_error: "O tempo de treino é obrigatório",
      }),
      experienceLevel: z.string({
        required_error: "O nível de experiência é obrigatório",
      }),
      frequency: z.string({ required_error: "A frequência é obrigatória" }),
      duration: z.string({ required_error: "A duração é obrigatória" }),
      location: z.string({ required_error: "O local é obrigatório" }),
      equipments: z.array(z.string()).default([]),
      hasPhysicalLimitations: z.boolean().default(false),
      limitationDescription: z.string().optional(),
      preferredTrainingStyle: z.string({
        required_error: "O estilo de treino é obrigatório",
      }),
      nutrition: z.string({ required_error: "A nutrição é obrigatória" }),
      sleepQuality: z.string({
        required_error: "A qualidade do sono é obrigatória",
      }),
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const {
      userId,
      objective,
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
      sleepQuality,
    } = validation.data;

    const workout = await workoutService.postWorkoutAI(
      userId,
      objective,
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

    reply.code(StatusCodes.CREATED).send(workout);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getWorkouts = async (request, reply) => {
  try {
    const schemaQuery = z.object({
      userId: z.string().optional(),
      visibility: z.nativeEnum(Visibility).optional(),
    });

    const validation = schemaQuery.safeParse(request.query);

    const { userId, visibility } = validation.data;

    const workouts = await workoutService.getWorkouts(userId, visibility);

    reply.send(workouts);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default { postWorkout, getWorkouts, postWorkoutAI };
