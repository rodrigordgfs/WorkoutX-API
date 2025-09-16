-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'NOT_STARTED');

-- AlterTable
ALTER TABLE "public"."workout_exercises" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "public"."workouts" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'NOT_STARTED';
