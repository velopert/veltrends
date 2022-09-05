/*
  Warnings:

  - You are about to alter the column `score` on the `ItemStats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CommentLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CommentLike" ("commentId", "createdAt", "id", "updatedAt", "userId") SELECT "commentId", "createdAt", "id", "updatedAt", "userId" FROM "CommentLike";
DROP TABLE "CommentLike";
ALTER TABLE "new_CommentLike" RENAME TO "CommentLike";
CREATE INDEX "CommentLike_commentId_idx" ON "CommentLike"("commentId");
CREATE UNIQUE INDEX "CommentLike_commentId_userId_key" ON "CommentLike"("commentId", "userId");
CREATE TABLE "new_ItemStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "score" REAL NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemStats_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ItemStats" ("clicks", "commentsCount", "id", "itemId", "likes", "score", "updatedAt") SELECT "clicks", "commentsCount", "id", "itemId", "likes", "score", "updatedAt" FROM "ItemStats";
DROP TABLE "ItemStats";
ALTER TABLE "new_ItemStats" RENAME TO "ItemStats";
CREATE UNIQUE INDEX "ItemStats_itemId_key" ON "ItemStats"("itemId");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT '',
    "link" TEXT,
    "thumbnail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "publisherId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("author", "body", "createdAt", "id", "link", "publisherId", "thumbnail", "title", "updatedAt", "userId") SELECT "author", "body", "createdAt", "id", "link", "publisherId", "thumbnail", "title", "updatedAt", "userId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_createdAt_idx" ON "Item"("createdAt" DESC);
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
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_mentionUserId_fkey" FOREIGN KEY ("mentionUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("createdAt", "deletedAt", "id", "itemId", "likes", "mentionUserId", "parentCommentId", "subcommentsCount", "text", "updatedAt", "userId") SELECT "createdAt", "deletedAt", "id", "itemId", "likes", "mentionUserId", "parentCommentId", "subcommentsCount", "text", "updatedAt", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE INDEX "Comment_deletedAt_idx" ON "Comment"("deletedAt");
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");
CREATE INDEX "Comment_parentCommentId_idx" ON "Comment"("parentCommentId");
CREATE TABLE "new_ItemLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemLike_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ItemLike" ("createdAt", "id", "itemId", "updatedAt", "userId") SELECT "createdAt", "id", "itemId", "updatedAt", "userId" FROM "ItemLike";
DROP TABLE "ItemLike";
ALTER TABLE "new_ItemLike" RENAME TO "ItemLike";
CREATE INDEX "ItemLike_itemId_idx" ON "ItemLike"("itemId");
CREATE UNIQUE INDEX "ItemLike_itemId_userId_key" ON "ItemLike"("itemId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
