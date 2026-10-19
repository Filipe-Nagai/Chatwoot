const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Verificação realizada pela Meta
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  }

  console.log("Falha na verificação do webhook");
  return res.sendStatus(403);
});

// Recebimento dos eventos
app.post("/", (req, res) => {
  const timestamp = new Date().toISOString();

  console.log(`Webhook recebido em ${timestamp}`);
  console.log(JSON.stringify(req.body, null, 2));

  return res.sendStatus(200);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
