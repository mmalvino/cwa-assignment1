import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Get connection string from env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL in .env");
}

// Create adapter
const adapter = new PrismaBetterSqlite3({ url: connectionString });

// Instantiate PrismaClient with adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
