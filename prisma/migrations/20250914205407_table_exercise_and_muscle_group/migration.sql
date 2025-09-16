-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('WEIGHT_LOSS', 'MUSCLE_GAIN', 'MAINTENANCE', 'ENDURANCE', 'GENERAL_FITNESS', 'REHABILITATION', 'ATHLETIC_PERFORMANCE', 'STRESS_RELIEF', 'PERFORMANCE', 'MOBILITY', 'COMPETITION', 'ENERGY_BOOST', 'STRENGTH', 'MUSCLE_DEFINITION', 'OUTDOOR_PREP', 'MENTAL_HEALTH');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL', 'ATHLETE', 'CASUAL', 'REHABILITATION', 'SENIOR');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "muscleGroupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscle_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "muscle_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
