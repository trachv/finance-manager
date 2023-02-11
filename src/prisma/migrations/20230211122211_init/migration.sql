/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bank" ADD COLUMN     "mfo" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "balance" DROP NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Bank_id_key" ON "Bank"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
