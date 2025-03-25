/*
  Warnings:

  - The primary key for the `tournaments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tournaments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `tournamentId` on the `tournament_stages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "tournament_stages" DROP CONSTRAINT "tournament_stages_tournamentId_fkey";

-- AlterTable
ALTER TABLE "tournament_stages" DROP COLUMN "tournamentId",
ADD COLUMN     "tournamentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "tournament_stages" ADD CONSTRAINT "tournament_stages_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
