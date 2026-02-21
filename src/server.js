import Fastify from "fastify";
import view from "@fastify/view";
import ejs from "ejs";

import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./routes/auth.js";

export async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(view, {
    engine: { ejs },
    root: new URL("./views/", import.meta.url).pathname,
    includeViewExtension: true
  });

  await app.register(healthRoutes);
  await app.register(authRoutes);

  return app;
}