import cron from "node-cron";
import { prisma } from "../libs/prisma.js";

const updateWorkoutSessionEndedAt = async () => {
  console.log("updateWorkoutSessionEndedAt job started");

  try {
    const workoutSession = await prisma.workoutSession.updateMany({
      where: {
        endedAt: null,
      },
      data: {
        endedAt: new Date(),
      },
    });

    console.log(`${workoutSession.count} workout sessions ended`);
  } catch (error) {
    console.error("updateWorkoutSessionEndedAt job failed", error);
  } finally {
    console.log("updateWorkoutSessionEndedAt job finished");
  }
};

export const startUpdateWorkoutSessionEndedAtJob = () => {
  cron.schedule("0 0 * * *", updateWorkoutSessionEndedAt, {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  });

  console.log("updateWorkoutSessionEndedAt job scheduled");
};
