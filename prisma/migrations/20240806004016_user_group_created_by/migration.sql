/*
  Warnings:

  - Added the required column `createdBy` to the `users_access_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_access_groups" ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users_access_groups" ADD CONSTRAINT "users_access_groups_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
