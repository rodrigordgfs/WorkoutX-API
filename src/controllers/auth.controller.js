import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import authService from "../services/auth.service.js";

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
      id: z.string({ required_error: "O ID do usuário é obrigatório" }),
      name: z.string({ required_error: "O nome é obrigatório" }),
      avatar: z.string({ required_error: "A URL do avatar é obrigatória" })
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const { id, name, avatar } = validation.data;

    const user = await authService.upsertUser(id, name, avatar);

    reply.code(StatusCodes.OK).send(user);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default { postAuth };
