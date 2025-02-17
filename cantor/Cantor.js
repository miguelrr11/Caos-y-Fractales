/*
Miguel Rodriguez Rodriguez
CONJUNTO DE CANTOR
Es no vacio
Es compacto
Tiene longitud 0
Es no numerable
Es un conjunto perfecto y totalmente desconectado
Es autosemejante

https://editor.p5js.org/miguelrr11/sketches/vjefG97ta
*/

function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255)
  strokeWeight(4)
  line(0, 0, width, 0)
  cantor(20)
}

function cantor(n){
  drawSegment(0, width, 1, n)
}

function drawSegment(start, long, step, stop){
  if(step == stop) return
  let y = step * 25
  strokeWeight(map(step, 0, stop, 4, .25))
  line(start, y, start+long/3, y)
  line(start+(long/3)*2, y, start+long, y)
  drawSegment(start, long/3, step+1, stop)
  drawSegment(start+(long/3)*2, long/3, step+1, stop)
}