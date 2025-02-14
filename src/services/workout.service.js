import workoutRepository from "../repositories/workout.repository.js";
import AppError from "../utils/error.js";

const postWorkout = async (userId, name, visibility, exercises) => {
  try {
    const workout = await workoutRepository.postWorkout(
      userId,
      name,
      visibility,
      exercises
    );
    return workout;
  } catch (error) {
    throw new AppError(error.message);
  }
};

const getWorkouts = async (userId, visibility) => {
  try {
    const workouts = await workoutRepository.getWorkouts(userId, visibility);
    return workouts;
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  postWorkout,
  getWorkouts,
};
