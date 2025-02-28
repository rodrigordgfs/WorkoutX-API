import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import muscleGroupService from "../services/muscleGroup.service.js";

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
    "Grupo Muscular não encontrado": StatusCodes.NOT_FOUND,
  };

  const statusCode =
    errorMessages[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode).send({
    error: error.message || "Ocorreu um erro interno",
  });
};

const getMuscleGroup = async (request, reply) => {
  try {
    const muscleGroup = await muscleGroupService.getMuscleGroup();
    reply.code(StatusCodes.OK).send(muscleGroup);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getMuscleGroupById = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do Grupo Muscular é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    const muscleGroup = await muscleGroupService.getMuscleGroupById(id);

    reply.send(muscleGroup);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default { getMuscleGroup, getMuscleGroupById };
