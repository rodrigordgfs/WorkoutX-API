/*
  Warnings:

  - You are about to drop the column `workoutId` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleGroupId` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Made the column `videoUrl` on table `exercises` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutId_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "workoutId",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "muscleGroupId" TEXT NOT NULL,
ALTER COLUMN "videoUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ExerciseToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToWorkout_B_index" ON "_ExerciseToWorkout"("B");

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "muscle_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkout" ADD CONSTRAINT "_ExerciseToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
