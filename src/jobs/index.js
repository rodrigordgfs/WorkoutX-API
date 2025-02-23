import { startUpdateWorkoutSessionEndedAtJob } from "./updateWorkoutSessionEndedAt.job.js"

export const startJobs = () => {
    startUpdateWorkoutSessionEndedAtJob();
}