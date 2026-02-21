import { buildServer } from "./src/server.js";

const port = Number(process.env.PORT || 3000);
const host = "::"; // em vez de "0.0.0.0"

const server = await buildServer();

try {
	app.listen(port, host, () => {
    console.log(`[hsc-auth] listening on http://[${host}]:${port}`);
  });
} catch (err) {
	console.error(err);
	process.exit(1);
}
