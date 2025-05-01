/*
  Warnings:

  - You are about to drop the column `variantId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "variantId",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "size" TEXT;
