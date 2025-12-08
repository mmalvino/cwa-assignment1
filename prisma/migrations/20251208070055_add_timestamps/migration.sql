/*
  Warnings:

  - Added the required column `updatedAt` to the `EscapeRoomHotspot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EscapeRoomHotspot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "configId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EscapeRoomHotspot_configId_fkey" FOREIGN KEY ("configId") REFERENCES "EscapeRoomConfig" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EscapeRoomHotspot" ("answer", "configId", "id", "question", "x", "y") SELECT "answer", "configId", "id", "question", "x", "y" FROM "EscapeRoomHotspot";
DROP TABLE "EscapeRoomHotspot";
ALTER TABLE "new_EscapeRoomHotspot" RENAME TO "EscapeRoomHotspot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
