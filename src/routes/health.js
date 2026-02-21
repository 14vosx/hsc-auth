export default async function healthRoutes(app) {
  app.get("/health", async () => {
    return {
      ok: true,
      service: "hsc-auth",
      env: process.env.NODE_ENV || null,
      baseUrl: process.env.BASE_URL || null,
      ts: new Date().toISOString(),
    };
  });
}