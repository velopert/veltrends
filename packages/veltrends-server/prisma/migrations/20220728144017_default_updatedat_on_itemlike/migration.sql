-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ItemLike" ("createdAt", "id", "itemId", "updatedAt", "userId") SELECT "createdAt", "id", "itemId", "updatedAt", "userId" FROM "ItemLike";
DROP TABLE "ItemLike";
ALTER TABLE "new_ItemLike" RENAME TO "ItemLike";
CREATE UNIQUE INDEX "ItemLike_itemId_userId_key" ON "ItemLike"("itemId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
