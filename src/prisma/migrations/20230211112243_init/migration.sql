/*
  Warnings:

  - Added the required column `bankId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "bankId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_CategoryToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTransaction_AB_unique" ON "_CategoryToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTransaction_B_index" ON "_CategoryToTransaction"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTransaction" ADD CONSTRAINT "_CategoryToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTransaction" ADD CONSTRAINT "_CategoryToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
