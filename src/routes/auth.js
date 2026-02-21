export default async function authRoutes(app) {
	app.get("/login", async (req, reply) => {
		const returnUrl =
			typeof req.query.returnUrl === "string" ? req.query.returnUrl : "/";
		return reply.view("login", { returnUrl });
	});

	app.get("/login/sent", async (req, reply) => {
		return reply.view("sent");
	});
}
