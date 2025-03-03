/*
  Warnings:

  - Added the required column `repetitions` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restTime` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_exercises" ADD COLUMN     "repetitions" TEXT NOT NULL,
ADD COLUMN     "restTime" TEXT NOT NULL,
ADD COLUMN     "series" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;
