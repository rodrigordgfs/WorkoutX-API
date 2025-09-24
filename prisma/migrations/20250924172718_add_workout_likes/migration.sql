-- CreateTable
CREATE TABLE "public"."workout_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workout_likes_userId_workoutId_key" ON "public"."workout_likes"("userId", "workoutId");

-- AddForeignKey
ALTER TABLE "public"."workout_likes" ADD CONSTRAINT "workout_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workout_likes" ADD CONSTRAINT "workout_likes_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
