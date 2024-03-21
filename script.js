function crearMatrices() {
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);

  if (isNaN(filas) || isNaN(columnas)) {
    alert("Por favor, ingrese valores numéricos para filas y columnas.");
    return;
  }

  var html = "";
  for (var i = 0; i < 2; i++) {
    html += `<h2>Ingrese los datos para la Matriz ${i + 1}</h2>`;
    for (var j = 0; j < filas; j++) {
      for (var k = 0; k < columnas; k++) {
        html += `<input type="number" id="m${
          i + 1
        }_${j}_${k}" placeholder="Fila ${j + 1}, Columna ${k + 1}">`;
      }
      html += "<br>";
    }
  }
  html += '<button onclick="sumarMatrices()">Sumar Matrices</button>';
  document.getElementById("matrices").innerHTML = html;
}

function sumarMatrices() {
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);

  var matriz1 = [];
  var matriz2 = [];

  for (var i = 0; i < filas; i++) {
    matriz1[i] = [];
    matriz2[i] = [];
    for (var j = 0; j < columnas; j++) {
      matriz1[i][j] = parseFloat(document.getElementById(`m1_${i}_${j}`).value);
      matriz2[i][j] = parseFloat(document.getElementById(`m2_${i}_${j}`).value);
    }
  }

  // Enviar datos al servidor para realizar la suma de matrices
  fetch("http://localhost:3000/sumar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matriz1: matriz1, matriz2: matriz2 }),
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarResultado(data.resultado);
      console.log(data.message); // Muestra el mensaje recibido del servidor
    })
    .catch((error) => console.error("Error:", error));
}

function mostrarResultado(resultado) {
  var html = "<h2>Matriz Resultante</h2>";
  resultado.forEach((fila, i) => {
    fila.forEach((valor, j) => {
      html += `<input type="text" value="${valor}" readonly>`;
    });
    html += "<br>";
  });
  document.getElementById("matrices").innerHTML = html;
}
