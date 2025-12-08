/*
  Warnings:

  - You are about to drop the `EscapeRoomConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EscapeRoomHotspot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EscapeRoomConfig";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EscapeRoomHotspot";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EscapeRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "backgroundImage" TEXT NOT NULL DEFAULT '/escape-room-bg.jpg',
    "timerSeconds" INTEGER NOT NULL DEFAULT 60
);

-- CreateTable
CREATE TABLE "Hotspot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "Hotspot_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "EscapeRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
