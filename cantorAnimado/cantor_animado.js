/*
Miguel Rodriguez Rodriguez
CONJUNTO DE CANTOR
Es no vacio
Es compacto
Tiene longitud 0
Es no numerable
Es un conjunto perfecto y totalmente desconectado
Es autosemejante

https://editor.p5js.org/miguelrr11/sketches/z1e41njOs
*/

let level = 1

function setup() {
  createCanvas(600, 100);
  background(0);
  stroke(255)
  strokeWeight(1.5)
  cantor(10)
}

function draw(){
  background(0);
  if(frameCount % 2 == 0) level++
  if(level > 10) level = 1
  cantor(level)
}

function cantor(n){
  drawSegment(0, width, 1, n)
}

function drawSegment(start, long, step, stop){
  let y = height/2
  if(step == stop){
    line(start, y, start+long/3, y)
    line(start+(long/3)*2, y, start+long, y)
    return
  }
  drawSegment(start, long/3, step+1, stop)
  drawSegment(start+(long/3)*2, long/3, step+1, stop)
}