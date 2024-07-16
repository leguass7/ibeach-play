-- CreateEnum
CREATE TYPE "BeachTennisCategory" AS ENUM ('PRO', 'A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('M', 'F', 'X');

-- CreateEnum
CREATE TYPE "ShirtSize" AS ENUM ('PP', 'P', 'M', 'G', 'GG', 'EG', 'EGG');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "nick" TEXT,
    "name" TEXT,
    "cpf" TEXT,
    "birday" DATE,
    "gender" "UserGender" DEFAULT 'M',
    "phone" TEXT,
    "imageUrl" TEXT,
    "cityId" INTEGER,
    "emailVerified" TIMESTAMP(3),
    "shirtSize" "ShirtSize" DEFAULT 'M',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "lastAcess" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_bt_profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "category" "BeachTennisCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "public" BOOLEAN DEFAULT true,

    CONSTRAINT "users_bt_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_access_groups" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_access_groups_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "access_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ufId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uf" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Uf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_bt_profiles_userId_key" ON "users_bt_profiles"("userId");

-- AddForeignKey
ALTER TABLE "users_bt_profiles" ADD CONSTRAINT "users_bt_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_access_groups" ADD CONSTRAINT "users_access_groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_access_groups" ADD CONSTRAINT "users_access_groups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "access_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_ufId_fkey" FOREIGN KEY ("ufId") REFERENCES "Uf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
