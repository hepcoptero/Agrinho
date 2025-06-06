let farmColor, cityColor;
let truckX = 0;
let planeX; // Posição horizontal do avião

// Arrays para guardar dados fixos dos prédios
let buildingHeights = [];
let buildingColors = [];
let buildingPositions = [];

function setup() {
  createCanvas(800, 400);
  farmColor = color(100, 200, 100); // Verde campo
  cityColor = color(200, 100, 100); // Vermelho cidade
  planeX = width; // começa à direita, voando para a esquerda

  // Inicializa dados fixos dos prédios da cidade
  for (let x = width/2 + 20; x < width - 20; x += 60) {
    buildingPositions.push(x);
    buildingHeights.push(random(80, 150));
    buildingColors.push(color(random(50, 100)));
  }
}

function draw() {
  // Fundo com gradiente campo-cidade
  let bgColor = lerpColor(farmColor, cityColor, truckX / width);
  background(bgColor);
  
  drawFarm();  // Lado esquerdo (campo)
  drawCity();  // Lado direito (cidade)
  
  // Caminhão se move com sin() para efeito ondulado
  truckX += 1;
  let truckY = height/2 + sin(frameCount * 0.05) * 20;
  drawTruck(truckX, truckY);
  
  // Avião voando pela cidade (frente da lua)
  planeX -= 1.5;  // avião indo mais devagar
  if (planeX < width/2) planeX = width; // volta pra direita ao sair da tela
  drawPlane(planeX, height/4 - 30);
  
  // Reinicia ao chegar na cidade
  if (truckX > width) truckX = -50;
}

// ---- FUNÇÕES DE DESENHO ---- //
function drawFarm() {
  // Céu do campo (gradiente azul claro)
  for (let y = 0; y < height/2; y++) {
    let skyColor = lerpColor(color(135, 206, 235), color(255), y / (height/2));
    stroke(skyColor);
    line(0, y, width/2, y);
  }
  
  // Gramado (verde)
  fill(34, 139, 34);
  noStroke();
  rect(0, height/2, width/2, height/2);
  
  // Plantação (fileiras de "plantas")
  fill(0, 100, 0);
  for (let x = 20; x < width/2; x += 30) {
    for (let y = height/2 + 10; y < height - 20; y += 20) {
      triangle(x, y, x - 10, y + 20, x + 10, y + 20);
    }
  }
  
  // Celeiro (vermelho com telhado)
  fill(139, 0, 0);
  rect(width/4 - 40, height/2 - 60, 80, 60);
  fill(160, 82, 45);
  triangle(width/4 - 60, height/2 - 60, width/4 + 60, height/2 - 60, width/4, height/2 - 100);
  
  // Sol (amarelo com animação)
  fill(255, 255, 0);
  let sunY = height/4 + sin(frameCount * 0.02) * 10; // Flutua suavemente
  circle(width/6, sunY, 50);
}

function drawCity() {
  // Céu noturno (gradiente escuro)
  for (let y = 0; y < height/2; y++) {
    let nightColor = lerpColor(color(0, 0, 50), color(25, 25, 112), y / (height/2));
    stroke(nightColor);
    line(width/2, y, width, y);
  }
  // Lua (branca)
  fill(240);
  circle(width * 5/6, height/4, 40);
  
  // Estrada (cinza escuro)
  fill(50);
  rect(width/2, height/2 + 50, width/2, height/2 - 50);
  
  // Prédios (com dados fixos)
  for (let i = 0; i < buildingPositions.length; i++) {
    let x = buildingPositions[i];
    let buildingHeight = buildingHeights[i];
    fill(buildingColors[i]);
    rect(x, height/2 - buildingHeight, 40, buildingHeight);
    
    // Janelas (amarelas acesas)
    fill(255, 255, 150);
    for (let y = height/2 - buildingHeight + 10; y < height/2 - 10; y += 15) {
      rect(x + 5, y, 10, 8);
      rect(x + 25, y, 10, 8);
    }
  }
}

function drawTruck(x, y) {
  fill(200, 0, 0); // Vermelho
  rect(x, y, 60, 30); // Cabaça do caminhão
  fill(0);
  circle(x + 10, y + 30, 20); // Rodas
  circle(x + 50, y + 30, 20);
  fill(255);
  rect(x + 35, y - 10, 20, 10); // Carga (caixa branca)
}

function drawPlane(x, y) {
  noStroke();

  // Corpo principal (cinza claro)
  fill(180);
  rect(x, y, 50, 15, 5);

  // Bico do avião (triângulo mais pontudo na frente)
  fill(160);
  triangle(x + 50, y, x + 60, y + 7.5, x + 50, y + 15);

  // Janela do piloto (azul claro)
  fill(100, 180, 255);
  rect(x + 10, y + 3, 15, 8, 3);

  // Asa principal (triângulo em cima do corpo)
  fill(140);
  triangle(x + 15, y, x + 35, y, x + 25, y - 18);

  // Asa inferior pequena (triângulo embaixo do corpo)
  fill(130);
  triangle(x + 20, y + 15, x + 35, y + 15, x + 27, y + 28);

  // Estabilizador traseiro (cauda)
  fill(140);
  triangle(x, y, x, y + 15, x - 12, y + 7);

  // Sombras (leve escurecimento para dar volume)
  fill(150, 150);
  rect(x + 5, y + 10, 40, 5, 3);
}
