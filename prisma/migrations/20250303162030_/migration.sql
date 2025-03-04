/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `workout_session_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `workout_session_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `restTime` on the `workout_session_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `workout_session_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `workout_session_exercises` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "workout_session_exercises" DROP CONSTRAINT "workout_session_exercises_exerciseId_fkey";

-- AlterTable
ALTER TABLE "workout_session_exercises" DROP COLUMN "exerciseId",
DROP COLUMN "repetitions",
DROP COLUMN "restTime",
DROP COLUMN "series",
DROP COLUMN "weight",
ADD COLUMN     "workoutExercisesId" TEXT;

-- AddForeignKey
ALTER TABLE "workout_session_exercises" ADD CONSTRAINT "workout_session_exercises_workoutExercisesId_fkey" FOREIGN KEY ("workoutExercisesId") REFERENCES "workout_exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
