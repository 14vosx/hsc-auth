import { getPool } from "../db/pool.js";

export default async function healthRoutes(app) {
  app.get("/health", async () => {
    const payload = {
      ok: true,
      service: "hsc-auth",
      env: process.env.NODE_ENV || null,
      baseUrl: process.env.BASE_URL || null,
      db: "skip",
      ts: new Date().toISOString(),
    };

    // Só testa DB se as env vars estiverem presentes
    const hasDb =
      process.env.DB_HOST &&
      process.env.DB_USER &&
      process.env.DB_PASSWORD &&
      process.env.DB_NAME;

    if (!hasDb) return payload;

    try {
      const pool = getPool();
      await pool.query("SELECT 1");
      payload.db = "ok";
      return payload;
    } catch (err) {
      payload.ok = false;
      payload.db = "fail";
      // não expor detalhes em produção
      return payload;
    }
  });
}