 //variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteWidth = 10;
let raqueteHeight = 90;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variaveis oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let trilha;
let ponto;
let raquetada;

//chances de errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound ("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificaColisaoraquete();
  colisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  calculaChanceDeErrar();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPontos()
  bolinhaNaoFicaPresa()
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteWidth, raqueteHeight)
  }

function movimentaRaquete() {
    if (keyIsDown(UP_ARROW)){
      yRaquete -= 10
    }
   if (keyIsDown(DOWN_ARROW)){
      yRaquete += 10 
  }
}  

function verificaColisaoraquete(){
    if (xBolinha - raio < xRaquete + raqueteWidth 
       && yBolinha - raio < yRaquete + raqueteHeight &&
       yBolinha + raio > yRaquete) {
      velocidadeXBolinha *= -1
    }
}

function colisaoRaquete (x,y) {
  
  colidiu =  
    collideRectCircle(x, y, raqueteWidth, raqueteHeight, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1
    raquetada.play()
  }
}

function movimentaRaqueteOponente() {
  
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteHeight / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 30){
    chanceDeErrar = 35
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 30){
    chanceDeErrar = 30
    }
  }
}

function incluiPlacar () {
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255,140, 0))
  rect(150, 10, 40, 20)
  fill(255)
  text (meusPontos, 170, 26)
  fill(color(255,140, 0))
  rect(450, 10, 40, 20)
  fill(255);
  text(pontosDoOponente, 470, 26)
}

function marcaPontos () {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play()
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}