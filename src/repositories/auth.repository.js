import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const postAuth = async (id, name, avatar) => {
  try {
    return await prisma.user.create({
      data: {
        id,
        name,
        avatar,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        experience: true,
        publicProfile: true,
        goal: true,
        height: true,
        weight: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getUserByID = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        experience: true,
        publicProfile: true,
        goal: true,
        height: true,
        weight: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const patchAuth = async (
  id,
  avatar,
  name,
  userId,
  experience,
  goal,
  height,
  publicProfile,
  weight
) => {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
        name,
        userId,
        experience,
        goal,
        height,
        publicProfile,
        weight,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        experience: true,
        publicProfile: true,
        goal: true,
        height: true,
        weight: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

export default {
  postAuth,
  getUserByID,
  patchAuth,
};
