/*
  Warnings:

  - You are about to drop the column `discountedPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discountedPrice",
ADD COLUMN     "brand" TEXT NOT NULL DEFAULT 'Unknown';
