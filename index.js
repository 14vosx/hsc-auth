import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("views", new URL("./views", import.meta.url).pathname);

// Hostinger injeta PORT. Mantemos fallback local.
const port = Number(process.env.PORT || 3000);

// Health check (sem dependências)
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "hsc-auth", ts: new Date().toISOString() });
});

app.get("/login", (req, res) => {
  const returnUrl = typeof req.query.returnUrl === "string" ? req.query.returnUrl : "/";
  res.status(200).render("login", { returnUrl });
});

app.get("/login/sent", (_req, res) => {
  res.status(200).render("sent");
});

app.use(express.urlencoded({ extended: false }));

app.post("/auth/magic/request", (req, res) => {
  // PR1: placeholder — não envia e-mail ainda
  const returnUrl = typeof req.body.returnUrl === "string" ? req.body.returnUrl : "/";
  res.redirect(302, `/login/sent?returnUrl=${encodeURIComponent(returnUrl)}`);
});

app.get("/", (_req, res) => {
  res.status(200).send("HSC AUTH OK (Hostinger)");
});

// IMPORTANTE: escutar na interface pública
app.listen(port, "0.0.0.0", () => {
  console.log(`[hsc-auth] listening on http://0.0.0.0:${port}`);
});