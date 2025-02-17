// ALFOMBRA DE SIERPINSKY random
// Miguel Rodríguez Rodríguez
// https://editor.p5js.org/miguelrr11/sketches/iUvFKGq4o

let level = 1
let r 
let rVal

function setup() {
  createCanvas(600, 600);
  background(0)
  fill(255, 80)
  noStroke()
  frameRate(8)
  r = createSlider(0, 1, 0.5, 0.05)
}

function mouseClicked(){
  background(0)
  level = 1
  loop()
}

function draw() {
  rVal = r.value()
  carpet(level)
  if(level % 2 == 0) fill(247, 37, 133, 255)
  else fill(100, 223, 223, 255)
  level++
  if(level == 8) noLoop()
}

function carpet(n){
  drawCarpet(0, 0, 1, n, 600)
}

function drawCarpet(x, y, step, stop, w){
  if(step == stop){
    rect(x, y, w, w)
    return
  }
    let off = w/3
    if(Math.random() < rVal) drawCarpet(x, y, step+1, stop, off) //0,0
    if(Math.random() < rVal) drawCarpet(x+off, y, step+1, stop, off) //1,0
    if(Math.random() < rVal) drawCarpet(x+(2*off), y, step+1, stop, off) //2,0
    
    if(Math.random() < rVal) drawCarpet(x, y+off, step+1, stop, off) //0,1
    if(Math.random() < rVal) drawCarpet(x+off, y+off, step+1, stop, off) //1,1
    if(Math.random() < rVal) drawCarpet(x+(off*2), y+off, step+1, stop, off) //2,1
    
    if(Math.random() < rVal) drawCarpet(x, y+(off*2), step+1, stop, off) //0,2
    if(Math.random() < rVal) drawCarpet(x+off, y+(off*2), step+1, stop, off) //1,2
    if(Math.random() < rVal) drawCarpet(x+(off*2), y+(off*2), step+1, stop, off) //2,2
    
}