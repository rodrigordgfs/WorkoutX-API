import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import authService from "../services/auth.service.js";
import { ExperienceLevel, Goal } from "@prisma/client";

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

const postAuth = async (request, reply) => {
  try {
    const schemaBody = z.object({
      name: z.string({ required_error: "O nome do treino é obrigatório" }),
      userId: z.string({ required_error: "O ID do usuário é obrigatório" }),
      avatar: z.string({ required_error: "A URL do avatar é obrigatória" })
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const { avatar, name, userId } = validation.data;

    const user = await authService.postAuth(userId, name, avatar);

    reply.code(StatusCodes.CREATED).send(user);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const patchAuth = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do usuário é obrigatório" }),
    });

    const schemaBody = z.object({
      name: z.string({ required_error: "O nome do treino é obrigatório" }),
      avatar: z.string({ required_error: "A URL do avatar é obrigatória" }),
      goal: z
        .nativeEnum(Goal, { required_error: "O Objetivo é obrigatório" })
        .optional(),
      experience: z
        .nativeEnum(ExperienceLevel, {
          required_error: "A Experiência é obrigatória",
        })
        .optional(),
      height: z.number({ required_error: "A Altura é obrigatória" }).optional(),
      weight: z.number({ required_error: "O Peso é obrigatório" }).optional(),
      publicProfile: z
        .boolean({ required_error: "O Perfil público é obrigatório" })
        .optional(),
    });

    const validationBody = schemaBody.safeParse(request.body);
    const validationParams = schemaParams.safeParse(request.params);

    if (!validationBody.success) {
      throw validationBody.error;
    }

    if (!validationParams.success) {
      throw validationParams.error;
    }

    const {
      avatar,
      name,
      userId,
      experience,
      goal,
      height,
      publicProfile,
      weight,
    } = validationBody.data;
    const { id } = validationParams.data;

    const user = await authService.patchAuth(
      id,
      avatar,
      name,
      userId,
      experience,
      goal,
      height,
      publicProfile,
      weight
    );

    reply.code(StatusCodes.OK).send(user);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default { postAuth, patchAuth };
