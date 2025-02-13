import workouteController from '../controllers/workout.controller.js';

const workout = async (fastify) => {
    fastify.post('/workout', workouteController.postWorkout);
};

export default workout; 