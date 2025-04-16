-- CreateTable
CREATE TABLE "Prelaunch" (
    "_id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prelaunch_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Prelaunch" ADD CONSTRAINT "Prelaunch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
