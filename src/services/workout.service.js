import axios from "axios";
import workoutRepository from "../repositories/workout.repository.js";
import authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/error.js";
import openai from "../libs/openai.js";
import { v4 as uuidv4 } from "uuid";

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

const generatePrompt = (
  objective,
  trainingTime,
  experienceLevel,
  frequency,
  duration,
  location,
  equipments = [],
  hasPhysicalLimitations,
  limitationDescription,
  preferredTrainingStyle,
  nutrition,
  sleepQuality
) => {
  const formattedEquipments = Array.isArray(equipments)
    ? equipments.join(", ")
    : "Nenhum";

  const prompt = `
    Gere um treino personalizado em português (Brasil) com base nas informações abaixo:
  
    **Dados do usuário:**
    - Objetivo: ${objective}
    - Tempo disponível para treino: ${trainingTime}
    - Nível de experiência: ${experienceLevel}
    - Frequência semanal: ${frequency}
    - Duração do treino: ${duration}
    - Local de treino: ${location}
    - Equipamentos disponíveis: ${formattedEquipments}
    - Possui limitações físicas: ${hasPhysicalLimitations ? "Sim" : "Não"}
    - Descrição das limitações físicas: ${limitationDescription}
    - Estilo de treino preferido: ${preferredTrainingStyle}
    - Nutrição: ${nutrition}
    - Qualidade do sono: ${sleepQuality}
  
    **Geração do treino:**
    - Crie um nome para o treino, adequado ao objetivo e perfil do usuário.
    - Inclua pelo menos 8 exercícios no treino.
    - Para cada exercício, forneça:
      - Nome do exercício
      - Instruções detalhadas (em texto)
      - Peso sugerido (se aplicável)
      - Número de repetições
      - Número de séries
      - Tempo de descanso entre séries (em segundos, ex: 90)
      - Link para vídeo demonstrativo (se disponível)
  
    **Formato esperado da resposta (JSON):**
    [
      {
        "id": "", // deixar o id vazio ("") para que seja gerado automaticamente
        "name": "Nome do treino",
        "exercises": [
          {
            "id": "", // deixar o id vazio ("") para que seja gerado automaticamente
            "name": "Nome do exercício",
            "instructions": "Descrição detalhada",
            "weight": "Peso recomendado",
            "repetitions": "Número de repetições",
            "series": "Número de séries",
            "restTime": "Tempo de descanso em segundos",
            "videoUrl": "URL do vídeo demonstrativo"
          },
          ...
        ]
      }
    ]
  `;

  return prompt;
};

const buscaVideoYoutube = async (exerciseName) => {
  try {
    const response = await axios.get(process.env.YOUTUBE_BASE_URL, {
      params: {
        part: "snippet",
        q: `Como fazer o exercício ${exerciseName} - academia`,
        maxResults: 1,
        key: process.env.YOUTUBE_API_KEY,
        type: "video",
        videDuration: "medium",
      },
    });

    const video = response.data.items[0];
    return video ? `https://www.youtube.com/watch?v=${video.id.videoId}` : null;
  } catch (error) {
    console.error(`Erro ao buscar vídeo para ${exerciseName}:`, error);
    return null;
  }
};

const postWorkoutAI = async (
  userId,
  objective,
  trainingTime,
  experienceLevel,
  frequency,
  duration,
  location,
  equipments,
  hasPhysicalLimitations,
  limitationDescription,
  preferredTrainingStyle,
  nutrition,
  sleepQuality
) => {
  try {
    const prompt = generatePrompt(
      userId,
      objective,
      trainingTime,
      experienceLevel,
      frequency,
      duration,
      location,
      equipments,
      hasPhysicalLimitations,
      limitationDescription,
      preferredTrainingStyle,
      nutrition,
      sleepQuality
    );

    const response = await openai.chat.completions.create({
      model: "mistral-tiny",
      messages: [
        {
          role: "system",
          content:
            "Você é um personal trainer especializado em treinos personalizados. Gere um treino para o cliente com base nas informações fornecidas. Os textos devem ser em portugues do Brasil.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let workout = JSON.parse(response.choices[0].message.content);

    workout.id = uuidv4();
    workout.userId = userId;

    for (const exercise of workout.exercises) {
      exercise.id = uuidv4();
      exercise.videoUrl = await buscaVideoYoutube(exercise.name);
    }

    await workoutRepository.postWorkoutAI(userId, workout);

    return workout;
  } catch (error) {
    console.error("Erro ao chamar Mistral AI:", error);
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

const postLikeWorkout = async (idWorkout, idUser) => {
  try {
    const workout = await workoutRepository.getWorkoutByID(idWorkout);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    const user = await authRepository.getUserByID(idUser);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const like = await workoutRepository.getWorkoutLikedByUser(
      idWorkout,
      idUser
    );

    if (like) {
      await workoutRepository.postUnlikeWorkout(idWorkout, idUser);
      return { message: "Descurtido com sucesso" };
    }

    await workoutRepository.postLikeWorkout(idWorkout, idUser);
    return { message: "Curtido com sucesso" };
  } catch (error) {
    throw new AppError(error.message);
  }
};

const deleteExercise = async (id) => {
  try {
    const exercise = await workoutRepository.getExerciseByID(id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    await workoutRepository.deleteExercise(id);
  } catch (error) {
    throw new AppError(error.message);
  }
};

const copyWorkout = async (id, newUserId) => {
  try {
    const workout = await workoutRepository.getWorkoutByID(id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    const exercises = workout.exercises.map((exercise) => ({
      ...exercise,
      id: uuidv4(),
    }));

    const copiedWorkout = await workoutRepository.postWorkout(
      newUserId,
      workout.name,
      workout.visibility,
      exercises
    );

    return copiedWorkout;
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default {
  postWorkout,
  postWorkoutAI,
  getWorkouts,
  postLikeWorkout,
  deleteExercise,
  copyWorkout,
};
