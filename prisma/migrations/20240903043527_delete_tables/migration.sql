/*
  Warnings:

  - You are about to drop the `Accessory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Advantage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessPremiseContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DepartmentContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExtensionPhoneNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `License` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderPassPhoneNumber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrimaryContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Spec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transportation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accessory" DROP CONSTRAINT "Accessory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Advantage" DROP CONSTRAINT "Advantage_productId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessPremiseContact" DROP CONSTRAINT "BusinessPremiseContact_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ExtensionPhoneNumber" DROP CONSTRAINT "ExtensionPhoneNumber_departmentContactId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_imageId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_productId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_newsItemId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "License" DROP CONSTRAINT "License_imageId_fkey";

-- DropForeignKey
ALTER TABLE "OrderPassPhoneNumber" DROP CONSTRAINT "OrderPassPhoneNumber_businessPremiseContactId_fkey";

-- DropForeignKey
ALTER TABLE "Spec" DROP CONSTRAINT "Spec_productId_fkey";

-- DropForeignKey
ALTER TABLE "Transportation" DROP CONSTRAINT "Transportation_productId_fkey";

-- DropTable
DROP TABLE "Accessory";

-- DropTable
DROP TABLE "Advantage";

-- DropTable
DROP TABLE "BusinessPremiseContact";

-- DropTable
DROP TABLE "DeliveryOption";

-- DropTable
DROP TABLE "DepartmentContact";

-- DropTable
DROP TABLE "ExtensionPhoneNumber";

-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "License";

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "OrderPassPhoneNumber";

-- DropTable
DROP TABLE "PrimaryContact";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Spec";

-- DropTable
DROP TABLE "Transportation";
