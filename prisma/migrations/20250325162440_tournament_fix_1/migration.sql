-- AlterTable
ALTER TABLE "enrollments" ALTER COLUMN "weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tournament_stages" ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tournaments" ALTER COLUMN "updatedAt" DROP NOT NULL;
