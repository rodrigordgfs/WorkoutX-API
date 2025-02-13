import workoutRepository from "../repositories/workout.repository.js";
import AppError from "../utils/error.js";

const postWorkout = async (userId, name, exercises) => {
    try {
        const workout = await workoutRepository.postWorkout(userId, name, exercises);
        return workout;
    } catch (error) {
        throw new AppError(error.message)
    }
}

export default {
    postWorkout
};