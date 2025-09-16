import authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/error.js";

const upsertUser = async (id, name, avatar) => {
  try {
    const existingUser = await authRepository.getUserByID(id);

    if (existingUser) {
      return await authRepository.updateUser(id, name, avatar);
    }

    return await authRepository.createUser(id, name, avatar);
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  upsertUser,
};
