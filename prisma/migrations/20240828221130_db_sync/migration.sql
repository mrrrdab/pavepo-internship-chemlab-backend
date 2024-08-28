/*
  Warnings:

  - You are about to drop the column `weightId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weight` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_newsItemId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_weightId_fkey";

-- DropIndex
DROP INDEX "Product_weightId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "weightId",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "NewsItem";

-- DropTable
DROP TABLE "Weight";

-- CreateTable
CREATE TABLE "PrimaryContact" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_newsItemId_fkey" FOREIGN KEY ("newsItemId") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;
