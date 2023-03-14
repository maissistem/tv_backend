const express = require("express");
const app = express();
const mysql = require("mysql2");

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: "185.169.96.240",
  user: "maissist_jk",
  password: "314159@Mais#",
  database: "maissist_jkastro",
});

// Rota para exibir todos os produtos
app.get("/produtos", (req, res) => {
  // Consulta ao banco de dados para buscar todos os produtos
  connection.query("SELECT * FROM produtos", (error, results) => {
    if (error) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.send(results);
    }
  });
});

// Rota para exibir informações de um produto específico por código
app.get("/produtos/:codigo", (req, res) => {
  // Consulta ao banco de dados para buscar o produto com o código especificado
  connection.query(
    "SELECT * FROM produtos WHERE codigo = ?",
    [req.params.codigo],
    (error, results) => {
      if (error) {
        res.status(500).send("Erro ao consultar o banco de dados");
      } else if (results.length === 0) {
        res.status(404).send("Produto não encontrado");
      } else {
        res.send(results[0]);
      }
    }
  );
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
