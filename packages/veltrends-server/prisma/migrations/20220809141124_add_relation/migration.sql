-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemStats_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemStats" ("clicks", "id", "itemId", "likes", "score", "updatedAt") SELECT "clicks", "id", "itemId", "likes", "score", "updatedAt" FROM "ItemStats";
DROP TABLE "ItemStats";
ALTER TABLE "new_ItemStats" RENAME TO "ItemStats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
