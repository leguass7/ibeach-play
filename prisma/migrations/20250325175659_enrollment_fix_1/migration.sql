/*
  Warnings:

  - The primary key for the `tournament_stages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tournament_stages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `stageId` on the `enrollments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stageId` on the `groups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stageId` on the `matches` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stageId` on the `teams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_stageId_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_stageId_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_stageId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_stageId_fkey";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "stageId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "stageId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "stageId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "stageId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tournament_stages" DROP CONSTRAINT "tournament_stages_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tournament_stages_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "tournament_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "tournament_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "tournament_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "tournament_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
