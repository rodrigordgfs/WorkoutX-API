/*
  Warnings:

  - You are about to drop the `muscle_group_exercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "muscle_group_exercises" DROP CONSTRAINT "muscle_group_exercises_muscleGroupId_fkey";

-- DropTable
DROP TABLE "muscle_group_exercises";
