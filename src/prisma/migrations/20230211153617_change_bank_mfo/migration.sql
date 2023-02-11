/*
  Warnings:

  - A unique constraint covering the columns `[mfo]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bank_mfo_key" ON "Bank"("mfo");
