-- CreateTable
CREATE TABLE "arena_classrooms" (
    "id" SERIAL NOT NULL,
    "arenaId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "arena_classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arenas_classrooms_students" (
    "id" TEXT NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "arenas_classrooms_students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arenas_classrooms_students_classroomId_studentId_key" ON "arenas_classrooms_students"("classroomId", "studentId");

-- AddForeignKey
ALTER TABLE "arena_classrooms" ADD CONSTRAINT "arena_classrooms_arenaId_fkey" FOREIGN KEY ("arenaId") REFERENCES "arenas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arena_classrooms" ADD CONSTRAINT "arena_classrooms_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arenas_classrooms_students" ADD CONSTRAINT "arenas_classrooms_students_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "arena_classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arenas_classrooms_students" ADD CONSTRAINT "arenas_classrooms_students_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
