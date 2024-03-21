const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Manejar solicitudes de tipo OPTIONS
app.options("/sumar", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Permitir el encabezado Content-Type
  res.sendStatus(200);
});

app.post("/sumar", (req, res) => {
  const matriz1 = req.body.matriz1;
  const matriz2 = req.body.matriz2;

  const resultado = sumarMatrices(matriz1, matriz2);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ resultado: resultado, message: "Matrices sumadas exitosamente" });
});

function sumarMatrices(matriz1, matriz2) {
  const filas = matriz1.length;
  const columnas = matriz1[0].length;
  const resultado = [];

  for (let i = 0; i < filas; i++) {
    resultado[i] = [];
    for (let j = 0; j < columnas; j++) {
      resultado[i][j] = matriz1[i][j] + matriz2[i][j];
    }
  }
  return resultado;
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
