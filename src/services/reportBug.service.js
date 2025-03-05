import reportBugRepository from "../repositories/reportBug.repository.js";
import AppError from "../utils/error.js";
import authRepository from "../repositories/auth.repository.js";
import { uploadImageToS3 } from "../utils/uploadImageToS3.js";

const postReportBug = async (userId, title, description, image) => {
  try {
    const user = await authRepository.getUserByID(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const imageUrl = await uploadImageToS3(
      `${userId}-${title}-bug-report-${Date.now()}`,
      image,
      "workoutx-bucket",
      "report-bugs/"
    );

    return await reportBugRepository.postReportBug(
      userId,
      title,
      description,
      imageUrl
    );
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  postReportBug,
};
