/*
  Warnings:

  - You are about to drop the column `likesCount` on the `Comment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "subcommentsCount" INTEGER NOT NULL DEFAULT 0,
    "mentionUserId" INTEGER,
    "parentCommentId" INTEGER,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_mentionUserId_fkey" FOREIGN KEY ("mentionUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("createdAt", "deletedAt", "id", "itemId", "mentionUserId", "parentCommentId", "subcommentsCount", "text", "updatedAt", "userId") SELECT "createdAt", "deletedAt", "id", "itemId", "mentionUserId", "parentCommentId", "subcommentsCount", "text", "updatedAt", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE INDEX "Comment_deletedAt_idx" ON "Comment"("deletedAt");
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");
CREATE INDEX "Comment_parentCommentId_idx" ON "Comment"("parentCommentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
