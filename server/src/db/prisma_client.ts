import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "../config";

const connectionString = `${config.db_url}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log: ["error", "warn", "info", "query"],
});

export default prisma;
