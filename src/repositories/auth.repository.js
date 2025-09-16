import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const createUser = async (id, name, avatar) => {
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
        avatar: true
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
        avatar: true
      },
    });
  } catch (error) {
    logError(error);
  }
};

const updateUser = async (id, name, avatar) => {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        avatar,
      },
      select: {
        id: true,
        name: true,
        avatar: true
      },
    });
  } catch (error) {
    logError(error);
  }
};

export default {
  createUser,
  getUserByID,
  updateUser,
};
