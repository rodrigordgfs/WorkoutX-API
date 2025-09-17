import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import exerciseService from "../services/exercise.service.js";

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
    "Exercício não encontrado": StatusCodes.NOT_FOUND,
  };

  const statusCode =
    errorMessages[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode).send({
    error: error.message || "Ocorreu um erro interno",
  });
};

const createExercise = async (request, reply) => {
  try {
    const schemaBody = z.object({
      name: z.string({ required_error: "O nome do exercício é obrigatório" }),
      description: z.string({ required_error: "A descrição é obrigatória" }),
      image: z.string().optional(),
      videoUrl: z.string().optional(),
      muscleGroupId: z.string({ required_error: "O ID do grupo muscular é obrigatório" }),
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const { name, description, image, videoUrl, muscleGroupId } = validation.data;

    const newExercise = await exerciseService.createExercise(
      name,
      description,
      image,
      videoUrl,
      muscleGroupId
    );

    reply.code(StatusCodes.CREATED).send(newExercise);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getExercises = async (request, reply) => {
  try {
    const schemaQuery = z.object({
      muscleGroupId: z.string().optional(),
      name: z.string().optional(),
    });

    const validation = schemaQuery.safeParse(request.query);

    if (!validation.success) {
      throw validation.error;
    }

    const { muscleGroupId, name } = validation.data;

    const exercises = await exerciseService.getExercises(muscleGroupId, name);

    reply.code(StatusCodes.OK).send(exercises);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getExerciseById = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do exercício é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    const exercise = await exerciseService.getExerciseById(id);

    reply.code(StatusCodes.OK).send(exercise);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const updateExercise = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do exercício é obrigatório" }),
    });

    const schemaBody = z.object({
      name: z.string({ required_error: "O nome do exercício é obrigatório" }),
      description: z.string({ required_error: "A descrição é obrigatória" }),
      image: z.string().optional(),
      videoUrl: z.string().optional(),
      muscleGroupId: z.string({ required_error: "O ID do grupo muscular é obrigatório" }),
    });

    const validationParams = schemaParams.safeParse(request.params);
    const validationBody = schemaBody.safeParse(request.body);

    if (!validationParams.success) {
      throw validationParams.error;
    }

    if (!validationBody.success) {
      throw validationBody.error;
    }

    const { id } = validationParams.data;
    const { name, description, image, videoUrl, muscleGroupId } = validationBody.data;

    const updatedExercise = await exerciseService.updateExercise(
      id,
      name,
      description,
      image,
      videoUrl,
      muscleGroupId
    );

    reply.code(StatusCodes.OK).send(updatedExercise);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const deleteExercise = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do exercício é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    await exerciseService.deleteExercise(id);

    reply.code(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
};