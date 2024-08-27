-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ANALYTICAL_EQUIPMENT', 'BIOCHEMISTRY_BIOTECHNOLOGY', 'CLINIC_DIAGNOSTICS', 'CONSUMABLES', 'COSMECEUTICALS', 'LAB_EQUIPMENT', 'LIFE_SCIENCE_EQUIPMENT', 'MICROELECTRONICS', 'PHARMACEUTICALS', 'REAGENTS_STANDARTS', 'SPECIAL_OFFERS', 'SUPPLIERS', 'VETERINARY', 'WAREHOUSE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "productType" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "originCountries" TEXT[],
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "weightId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weight" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "measurementUnit" TEXT NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advantage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spec" (
    "id" SERIAL NOT NULL,
    "spec" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "measurementUnit" TEXT,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Accessory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transportation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "measurementUnit" TEXT,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Transportation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPremiseContact" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "BusinessPremiseContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPassPhoneNumber" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "businessPremiseContactId" INTEGER NOT NULL,

    CONSTRAINT "OrderPassPhoneNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentContact" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "DepartmentContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtensionPhoneNumber" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "departmentContactId" INTEGER NOT NULL,

    CONSTRAINT "ExtensionPhoneNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOption" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DeliveryOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tax" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "productId" INTEGER,
    "newsItemId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_weightId_key" ON "Product"("weightId");

-- CreateIndex
CREATE UNIQUE INDEX "File_imageId_key" ON "File"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPremiseContact_imageId_key" ON "BusinessPremiseContact"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "License_imageId_key" ON "License"("imageId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_weightId_fkey" FOREIGN KEY ("weightId") REFERENCES "Weight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advantage" ADD CONSTRAINT "Advantage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessory" ADD CONSTRAINT "Accessory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transportation" ADD CONSTRAINT "Transportation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPremiseContact" ADD CONSTRAINT "BusinessPremiseContact_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPassPhoneNumber" ADD CONSTRAINT "OrderPassPhoneNumber_businessPremiseContactId_fkey" FOREIGN KEY ("businessPremiseContactId") REFERENCES "BusinessPremiseContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionPhoneNumber" ADD CONSTRAINT "ExtensionPhoneNumber_departmentContactId_fkey" FOREIGN KEY ("departmentContactId") REFERENCES "DepartmentContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_newsItemId_fkey" FOREIGN KEY ("newsItemId") REFERENCES "NewsItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
