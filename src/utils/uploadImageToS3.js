import Jimp from "jimp";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import aws from "../libs/aws.js";

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

export const uploadImageToS3 = async (
  name,
  base64Image,
  bucketName,
  baseFolder
) => {
  try {
    const image = await processBase64Image(base64Image);
    const fileName = `${baseFolder}${String(name)
      .replaceAll(" ", "-")
      .toLowerCase()}.png`;

    try {
      await aws.send(
        new HeadObjectCommand({ Bucket: bucketName, Key: baseFolder })
      );
    } catch (err) {
      if (err.name !== "NotFound") {
        throw err;
      }
    }

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: image,
      ContentType: "image/png",
    };

    await aws.send(new PutObjectCommand(uploadParams));

    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao fazer upload da imagem para o S3");
  }
};

export const deleteImageFromS3 = async (imageUrl, bucketName) => {
  try {
    const key = imageUrl.split(".com/")[1];

    if (!key) {
      throw new Error("Caminho da imagem inválido.");
    }

    await aws.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
    console.log(`Imagem removida do S3: ${imageUrl}`);
  } catch (error) {
    console.error("Erro ao deletar imagem do S3:", error);
    throw new Error("Erro ao deletar imagem do S3.");
  }
};
