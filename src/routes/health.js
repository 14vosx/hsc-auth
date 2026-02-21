export default async function healthRoutes(app) {
	app.get("/health", async () => {
		return { ok: true, service: "hsc-auth", ts: new Date().toISOString() };
	});
}
