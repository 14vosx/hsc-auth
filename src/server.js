import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import view from "@fastify/view";
import ejs from "ejs";
import formbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";

import healthRoutes from "./routes/health.js";
import authRoutes from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({
	logger: true,
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Views (EJS)
app.register(view, {
	engine: { ejs },
	root: path.join(process.cwd(), "views"),
	viewExt: "ejs",
});

// Form parsing (para PR2, mas já habilita no PR1 sem custo)
app.register(formbody);

// Static files (/public)
app.register(fastifyStatic, {
	root: path.join(process.cwd(), "public"),
	prefix: "/public/",
});

// Rotas
app.register(healthRoutes);
app.register(authRoutes);

app.listen({ port: PORT, host: "0.0.0.0" }).catch((err) => {
	app.log.error(err);
	process.exit(1);
});
