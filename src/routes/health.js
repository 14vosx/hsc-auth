export async function healthRoutes(app) {
  app.get("/health", async (_req, reply) => {
    return reply.send({ ok: true, service: "hsc-auth", ts: new Date().toISOString() });
  });
}