/*
  Warnings:

  - You are about to drop the column `Stage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Stage",
ADD COLUMN     "link" TEXT,
ADD COLUMN     "stage" "Process" NOT NULL DEFAULT 'PRELAUNCH';
