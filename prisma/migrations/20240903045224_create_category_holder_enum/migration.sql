-- CreateTable
CREATE TABLE "EnumHolder" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "EnumHolder_pkey" PRIMARY KEY ("id")
);
