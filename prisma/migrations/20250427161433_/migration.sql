/*
  Warnings:

  - A unique constraint covering the columns `[walletId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "walletId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletId_key" ON "User"("walletId");
