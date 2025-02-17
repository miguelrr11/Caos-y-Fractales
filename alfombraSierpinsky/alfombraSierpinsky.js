// ALFOMBRA DE SIERPINSKY con opciones
// Miguel Rodríguez Rodríguez
// https://editor.p5js.org/miguelrr11/sketches/RHBsQf4wC

let level = 1
let cb = []

function setup() {
  createCanvas(600, 600);
  background(0)
  fill(255)
  noStroke()
  frameRate(8)
  for (let i = 0; i < 9; i++) {
    let bool = i !== 4
    cb.push(createCheckbox('', bool))

    let x = 10 + (i % 3) * 20
    let y = height + Math.floor(i / 3) * 20
    cb[i].position(x, y)
  }

}

function draw() {
  background(0)
  carpet(level)
  level++
  if(level == 8) level = 1
}

function carpet(n){
  drawCarpet(0, 0, 1, n, 600)
}

function drawCarpet(x, y, step, stop, w){
  if(step == stop){
    rect(x, y, w+1, w+1)
    return
  }
    let off = w/3
    if(cb[0].checked()) drawCarpet(x, y, step+1, stop, off) //0,0
    if(cb[1].checked()) drawCarpet(x+off, y, step+1, stop, off) //1,0
    if(cb[2].checked()) drawCarpet(x+(2*off), y, step+1, stop, off) //2,0
    
    if(cb[3].checked()) drawCarpet(x, y+off, step+1, stop, off) //0,1
    if(cb[4].checked()) drawCarpet(x+off, y+off, step+1, stop, off) //1,1
    if(cb[5].checked()) drawCarpet(x+(off*2), y+off, step+1, stop, off) //2,1
    
    if(cb[6].checked()) drawCarpet(x, y+(off*2), step+1, stop, off) //0,2
    if(cb[7].checked()) drawCarpet(x+off, y+(off*2), step+1, stop, off) //1,2
    if(cb[8].checked()) drawCarpet(x+(off*2), y+(off*2), step+1, stop, off) //2,2
    
}