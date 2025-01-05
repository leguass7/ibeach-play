/*
  Warnings:

  - You are about to drop the `arena_classrooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "arena_classrooms" DROP CONSTRAINT "arena_classrooms_arenaId_fkey";

-- DropForeignKey
ALTER TABLE "arena_classrooms" DROP CONSTRAINT "arena_classrooms_coachId_fkey";

-- DropForeignKey
ALTER TABLE "arenas_classrooms_students" DROP CONSTRAINT "arenas_classrooms_students_classroomId_fkey";

-- DropTable
DROP TABLE "arena_classrooms";

-- CreateTable
CREATE TABLE "arenas_classrooms" (
    "id" SERIAL NOT NULL,
    "arenaId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "label" VARCHAR(254),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "arenas_classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arenas_classrooms_hours" (
    "id" TEXT NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "startHour" TIME NOT NULL,

    CONSTRAINT "arenas_classrooms_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arenas_classrooms_hours_classroomId_weekDay_startHour_key" ON "arenas_classrooms_hours"("classroomId", "weekDay", "startHour");

-- AddForeignKey
ALTER TABLE "arenas_classrooms" ADD CONSTRAINT "arenas_classrooms_arenaId_fkey" FOREIGN KEY ("arenaId") REFERENCES "arenas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arenas_classrooms" ADD CONSTRAINT "arenas_classrooms_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arenas_classrooms_hours" ADD CONSTRAINT "arenas_classrooms_hours_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "arenas_classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arenas_classrooms_students" ADD CONSTRAINT "arenas_classrooms_students_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "arenas_classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
