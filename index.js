import express from "express";

const app = express();
const port = Number(process.env.PORT || 3000);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "hsc-auth", ts: new Date().toISOString() });
});

app.get("/", (_req, res) => {
  res.status(200).send("HSC AUTH OK (Hostinger)");
});

// IMPORTANTE: 0.0.0.0 e PORT do ambiente
app.listen(port, "0.0.0.0", () => {
  console.log(`[hsc-auth] listening on http://0.0.0.0:${port}`);
});