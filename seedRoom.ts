import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const room = await prisma.escapeRoom.create({
    data: {
      id: "default-room",
      title: "My First Escape Room",
      description: "This is the first room",
      createdAt: new Date("2025-12-08T10:00:00Z"),
      updatedAt: new Date("2025-12-08T10:00:00Z"),
    },
  });

  console.log("Inserted room:", room);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
