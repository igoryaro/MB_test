const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/registration", (req, res) => {
  res.send("API de Cadastro disponível.");
});

app.post("/registration", (req, res) => {
  const data = req.body;

  // Validação básica dos campos
  if (!data.email || !data.tipoCadastro || !data.senha) {
    return res
      .status(400)
      .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  return res.status(200).json({ message: "Cadastro realizado com sucesso!" });
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
