/*
  Warnings:

  - You are about to drop the column `lastAcess` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastAcess",
ADD COLUMN     "lastAccess" TIMESTAMP(3);
