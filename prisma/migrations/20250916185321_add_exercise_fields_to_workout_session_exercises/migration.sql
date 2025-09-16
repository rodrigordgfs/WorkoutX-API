/*
  Warnings:

  - Added the required column `repetitions` to the `workout_session_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restTime` to the `workout_session_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `series` to the `workout_session_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `workout_session_exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."Status" ADD VALUE 'UNCOMPLETED';

-- AlterTable
ALTER TABLE "public"."workout_session_exercises" ADD COLUMN     "repetitions" TEXT,
ADD COLUMN     "restTime" TEXT,
ADD COLUMN     "series" TEXT,
ADD COLUMN     "weight" TEXT;

-- Update existing records with default values from workout_exercises
UPDATE "public"."workout_session_exercises" 
SET 
  "series" = we."series",
  "repetitions" = we."repetitions",
  "weight" = we."weight",
  "restTime" = we."restTime"
FROM "public"."workout_exercises" we
WHERE "workout_session_exercises"."workoutExerciseId" = we."id";

-- Make columns NOT NULL after updating existing records
ALTER TABLE "public"."workout_session_exercises" ALTER COLUMN "repetitions" SET NOT NULL;
ALTER TABLE "public"."workout_session_exercises" ALTER COLUMN "restTime" SET NOT NULL;
ALTER TABLE "public"."workout_session_exercises" ALTER COLUMN "series" SET NOT NULL;
ALTER TABLE "public"."workout_session_exercises" ALTER COLUMN "weight" SET NOT NULL;
