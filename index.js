console.log("BOOTING HSC-AUTH...");

import express from "express";
import Fastify from "fastify";
import path from "node:path";
import view from "@fastify/view";
import ejs from "ejs";
import formbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";

import healthRoutes from "./src/routes/health.js";
import authRoutes from "./src/routes/auth.js";

const fastify = Fastify({ logger: true });

// Views
fastify.register(view, {
  engine: { ejs },
  root: path.join(process.cwd(), "views"),
  viewExt: "ejs",
});

fastify.register(formbody);

fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
});

fastify.register(healthRoutes);
fastify.register(authRoutes);

const app = express();

// Quando Fastify estiver pronto, encaminha tudo para o servidor interno dele
app.use(async (req, res) => {
  await fastify.ready();
  fastify.server.listeners("request")[0](req, res);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on :${PORT}`);
});