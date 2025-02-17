import axios from "axios";
import workoutRepository from "../repositories/workout.repository.js";
import AppError from "../utils/error.js";
import openai from "../libs/openai.js";
import { Visibility } from "@prisma/client";
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
    Gere um treino personalizado com base nas informações abaixo:
  
  - **Objetivo:** ${objective}
  - **Tempo disponível para treino:** ${trainingTime}
  - **Nível de experiência:** ${experienceLevel}
  - **Frequência semanal:** ${frequency}
  - **Duração do treino:** ${duration}
  - **Local de treino:** ${location}
  - **Equipamentos disponíveis:** ${formattedEquipments}
  - **Possui limitações físicas:** ${hasPhysicalLimitations ? "Sim" : "Não"}
  - **Descrição das limitações físicas:** ${limitationDescription}
  - **Estilo de treino preferido:** ${preferredTrainingStyle}
  - **Nutrição:** ${nutrition}
  - **Qualidade do sono:** ${sleepQuality}

  1. **Nome do treino**  
  2. **Divisão semanal** (Ex: ABC, ABCD, ABCDE)  
  3. **Exercícios para cada dia**, incluindo:
     - Nome do exercício  
     - Instruções em formato de texto
     - Peso
     - Repetições
     - Series
     - Tempo de descanso entre as séries // Em segundos ex: 90s

   **Formato de resposta esperado:**  
   [
    {
      "name": "",
      "exercises": [
        {
          "name": "",
          "series": "",
          "repetitions": "",
          "weight": "",
          "restTime": "",
          "videoUrl": "",
          "instructions": ""
        },
        {
          ...
        }
      ]
    }
  ]
  `;

  return prompt;
};

const buscVideoYoutube = async (exerciseName) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `Como fazer o exercício ${exerciseName} - academia`,
          maxResults: 1,
          key: process.env.YOUTUBE_API_KEY,
          type: "video",
          videDuration: "medium",
        },
      }
    );

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
      temperature: 0.7,
    });

    let workouts = JSON.parse(response.choices[0].message.content);

    for (const workout in workouts) {
      workouts[workout].id = uuidv4();
      workouts[workout].userId = userId;

      const exercices = workouts[workout].exercises;

      for (const exercise in exercices) {
        exercices[exercise].id = uuidv4();
        exercices[exercise].videoUrl = await buscVideoYoutube(
          exercices[exercise].name
        );
      }
    }

    await workoutRepository.postWorkoutAI(userId, workouts);

    return workouts;
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

export default {
  postWorkout,
  postWorkoutAI,
  getWorkouts,
};
