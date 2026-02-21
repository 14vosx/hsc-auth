console.log("BOOTING HSC-AUTH...");

import Fastify from "fastify";
import path from "node:path";
import view from "@fastify/view";
import ejs from "ejs";
import formbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";

import healthRoutes from "./src/routes/health.js";
import authRoutes from "./src/routes/auth.js";

const app = Fastify({ logger: true });

// Views
app.register(view, {
  engine: { ejs },
  root: path.join(process.cwd(), "views"),
  viewExt: "ejs",
});

app.register(formbody);

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
});

app.register(healthRoutes);
app.register(authRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen({ port: PORT, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});