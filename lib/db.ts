import { Pool } from "pg";

let pool: Pool;

declare global {
  var _pgPool: Pool | undefined;
}

if (!global._pgPool) {
  global._pgPool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT) || 5432,
    ssl: { rejectUnauthorized: false }, // REQUIRED for Neon
  });

  global._pgPool.on("connect", () => console.log("✅ Connected to Neon PostgreSQL"));
  global._pgPool.on("error", (err: Error) => console.error("❌ PostgreSQL error:", err));
}

pool = global._pgPool;
export default pool;
