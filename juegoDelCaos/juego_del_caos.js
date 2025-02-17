//Miguel Rodriguez Rodriguez
//JUEGO DEL CAOS, APROXIMACION DEL TRIANGULO DE SIERPINSKY
//https://editor.p5js.org

let p1, p2, p3
let q0 
let q1

function setup() {
  createCanvas(600, 600);
  p1 = createVector(0, 1)
  p2 = createVector(1, 1)
  p3 = createVector(1/2, 1-sqrt(3)/2)
  q0 = createVector(random(), random())
  background(220);
  stroke(0)
  strokeWeight(2)
  point(p1.x*width, p1.y*width)
  point(p2.x*width, p2.y*width)
  point(p3.x*width, p3.y*width)
}

function draw() {
  for(let i = 0; i < 100; i++){
    let r = Math.random()
    if(r < 0.33){
      q1 = createVector((q0.x+p1.x)/2, (q0.y+p1.y)/2)
    }
    else if(r < 0.66){
      q1 = createVector((q0.x+p2.x)/2, (q0.y+p2.y)/2)
    }
    else{
      q1 = createVector((q0.x+p3.x)/2, (q0.y+p3.y)/2)
    }
    stroke(Math.random()*255, 100, 100)
    point(q1.x*width, q1.y*width)
    q0 = q1.copy()
  }
  
}