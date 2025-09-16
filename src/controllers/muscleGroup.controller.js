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
    "Não é possível excluir o grupo muscular pois existem exercícios vinculados a ele": StatusCodes.CONFLICT,
  };

  const statusCode =
    errorMessages[error.message] || StatusCodes.INTERNAL_SERVER_ERROR;
  reply.code(statusCode).send({
    error: error.message || "Ocorreu um erro interno",
  });
};

const postMuscleGroup = async (request, reply) => {
  try {
    const schemaBody = z.object({
      name: z.string({
        required_error: "O nome do Grupo Muscular é obrigatório",
      }),
      description: z.string({
        required_error: "A descrição do Grupo Muscular é obrigatória",
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

    const { name, description, image } = validation.data;

    const muscleGroup = await muscleGroupService.postMuscleGroup(
      name,
      description,
      image
    );

    reply.code(StatusCodes.CREATED).send(muscleGroup);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const getMuscleGroup = async (request, reply) => {
  try {
    const schemaParams = z.object({
      name: z.string().optional(),
    });
    

    const validation = schemaParams.safeParse(request.query);

    if (!validation.success) {
      throw validation.error;
    }

    const { name } = validation.data;

    const muscleGroup = await muscleGroupService.getMuscleGroup(name);
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

const updateMuscleGroup = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do Grupo Muscular é obrigatório" }),
    });

    const schemaBody = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      image: z
        .string()
        .regex(
          /^data:image\/(png|jpeg|jpg);base64,/,
          "Formato de imagem inválido"
        )
        .optional(),
    });

    const paramsValidation = schemaParams.safeParse(request.params);
    const bodyValidation = schemaBody.safeParse(request.body);

    if (!paramsValidation.success) {
      throw paramsValidation.error;
    }

    if (!bodyValidation.success) {
      throw bodyValidation.error;
    }

    const { id } = paramsValidation.data;
    const { name, description, image } = bodyValidation.data;

    const muscleGroup = await muscleGroupService.updateMuscleGroup(
      id,
      name,
      description,
      image
    );

    reply.code(StatusCodes.OK).send(muscleGroup);
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

const deleteMuscleGroup = async (request, reply) => {
  try {
    const schemaParams = z.object({
      id: z.string({ required_error: "O ID do Grupo Muscular é obrigatório" }),
    });

    const validation = schemaParams.safeParse(request.params);

    if (!validation.success) {
      throw validation.error;
    }

    const { id } = validation.data;

    await muscleGroupService.deleteMuscleGroup(id);

    reply.code(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    handleErrorResponse(error, reply);
  }
};

export default {
  postMuscleGroup,
  getMuscleGroup,
  getMuscleGroupById,
  updateMuscleGroup,
  deleteMuscleGroup,
};
