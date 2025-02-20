-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workout_likes" DROP CONSTRAINT "workout_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "workout_likes" DROP CONSTRAINT "workout_likes_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_userId_fkey";

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_likes" ADD CONSTRAINT "workout_likes_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_likes" ADD CONSTRAINT "workout_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
