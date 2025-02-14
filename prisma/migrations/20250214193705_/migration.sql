-- CreateEnum
CREATE TYPE "visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "visibility" "visibility" NOT NULL DEFAULT 'PUBLIC';
