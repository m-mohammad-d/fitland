/*
  Warnings:

  - You are about to drop the column `alley` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - Added the required column `fullAddress` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `plaque` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "alley",
DROP COLUMN "city",
DROP COLUMN "province",
DROP COLUMN "street",
ADD COLUMN     "details" TEXT,
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "plaque" SET NOT NULL;
