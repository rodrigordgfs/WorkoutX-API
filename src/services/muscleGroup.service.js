import Jimp from "jimp";
import muscleGroupRepository from "../repositories/muscleGroup.repository.js";
import AppError from "../utils/error.js";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import aws from "../libs/aws.js";

const BUCKET_NAME = "workoutx-bucket";
const BASE_FOLDER = "muscle-groups/";
const IMAGE_CONTENT_TYPE = "image/png";

const getMuscleGroup = async () => {
  try {
    return await muscleGroupRepository.getMuscleGroup();
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getMuscleGroupById = async (id) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(id);

    if (!muscleGroup) {
      throw new AppError("Grupo Muscular não encontrado");
    }

    return muscleGroup;
  } catch (error) {
    throw new AppError(error.message);
  }
};

async function processBase64Image(base64String) {
  try {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const image = await Jimp.read(imageBuffer);

    if (typeof image.resize !== "function") {
      throw new Error("A função resize() não está disponível no Jimp.");
    }

    image.resize(800, Jimp.AUTO).quality(80);

    const pngBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    return pngBuffer;
  } catch (error) {
    console.error("Erro ao processar imagem:", error);
    throw new Error("Falha ao processar a imagem.");
  }
}

const uploadImageToS3 = async (name, base64Image) => {
  try {
    const image = await processBase64Image(base64Image);
    const fileName = `${BASE_FOLDER}${String(name)
      .replaceAll(" ", "-")
      .toLowerCase()}.png`;

    try {
      await aws.send(
        new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: BASE_FOLDER })
      );
    } catch (err) {
      if (err.name !== "NotFound") {
        throw err;
      }
    }

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: image,
      ContentType: IMAGE_CONTENT_TYPE,
    };

    await aws.send(new PutObjectCommand(uploadParams));

    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.log(error);
    throw new AppError("Erro ao fazer upload da imagem para o S3");
  }
};

const deleteImageFromS3 = async (imageUrl) => {
  try {
    const key = imageUrl.split(".com/")[1];

    if (!key) {
      throw new Error("Caminho da imagem inválido.");
    }

    await aws.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
    console.log(`Imagem removida do S3: ${imageUrl}`);
  } catch (error) {
    console.error("Erro ao deletar imagem do S3:", error);
    throw new AppError("Falha ao deletar imagem do S3");
  }
};

const postMuscleGroup = async (name, description, image) => {
  try {
    const imageUrl = await uploadImageToS3(name, image);

    return await muscleGroupRepository.postMuscleGroup(
      name,
      description,
      imageUrl
    );
  } catch (error) {
    throw new AppError(error.message);
  }
};

const deleteMuscleGroup = async (id) => {
  try {
    const muscleGroup = await muscleGroupRepository.getMuscleGroupById(id);

    if (!muscleGroup) {
      throw new AppError("Grupo Muscular não encontrado");
    }

    if (muscleGroup.exercises.length > 0) {
      throw new AppError(
        "Não é possível deletar um Grupo Muscular com exercícios associados"
      );
    }

    if (muscleGroup.imageUrl) {
      await deleteImageFromS3(muscleGroup.imageUrl);
    }

    await muscleGroupRepository.deleteMuscleGroup(id);
    console.log(`Grupo muscular deletado: ${id}`);
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  getMuscleGroup,
  getMuscleGroupById,
  postMuscleGroup,
  deleteMuscleGroup,
};
