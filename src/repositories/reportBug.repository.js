import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const postReportBug = async (userId, title, description, imageUrl) => {
  try {
    return await prisma.reportBug.create({
      data: {
        userId,
        description,
        title,
        imageUrl,
      },
    });
  } catch (error) {
    logError(error);
  }
};

export default {
  postReportBug,
};
