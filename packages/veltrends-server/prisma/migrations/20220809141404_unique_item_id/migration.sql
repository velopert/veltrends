/*
  Warnings:

  - A unique constraint covering the columns `[itemId]` on the table `ItemStats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ItemStats_itemId_key" ON "ItemStats"("itemId");
