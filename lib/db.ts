import { PrismaClient } from "@prisma/client";

const db =
  (globalThis as any).db ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).db = db;
}

export default db;
