-- CreateIndex
CREATE INDEX "ItemStats_score_itemId_idx" ON "ItemStats"("score" DESC, "itemId" DESC);

-- CreateIndex
CREATE INDEX "ItemStats_likes_itemId_idx" ON "ItemStats"("likes" DESC, "itemId" DESC);
