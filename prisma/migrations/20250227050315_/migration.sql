/*
  Warnings:

  - Added the required column `repetitions` to the `muscle_group_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restTime` to the `muscle_group_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series` to the `muscle_group_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `muscle_group_exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "muscle_group_exercises" ADD COLUMN     "repetitions" TEXT NOT NULL,
ADD COLUMN     "restTime" TEXT NOT NULL,
ADD COLUMN     "series" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;
