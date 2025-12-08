-- CreateTable
CREATE TABLE "EscapeRoomConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timerMinutes" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EscapeRoomHotspot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "configId" INTEGER NOT NULL,
    CONSTRAINT "EscapeRoomHotspot_configId_fkey" FOREIGN KEY ("configId") REFERENCES "EscapeRoomConfig" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
