import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import reportBugService from "../services/reportBug.service.js";

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
    "Bug não encontrado": StatusCodes.NOT_FOUND,
  };

  const statusCode =
    errorMessages[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode).send({
    error: error.message || "Ocorreu um erro interno",
  });
};

const postReportBug = async (request, reply) => {
  try {
    const schemaBody = z.object({
      userId: z.string({
        required_error: "O id do usuário é obrigatório",
      }),
      title: z.string({
        required_error: "O título do Bug é obrigatório",
      }),
      description: z.string({
        required_error: "A descrição do Bug é obrigatória",
      }),
      image: z
        .string({
          required_error: "A imagem em base64 é obrigatória",
        })
        .regex(
          /^data:image\/(png|jpeg|jpg);base64,/,
          "Formato de imagem inválido"
        ),
    });

    const validation = schemaBody.safeParse(request.body);

    if (!validation.success) {
      throw validation.error;
    }

    const { description, image, title, userId } = validation.data;

    reportBugService.postReportBug(userId, title, description, image);

    reply.code(StatusCodes.CREATED);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default {
  postReportBug,
};
