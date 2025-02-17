/*
KOCH ALEATORIO
Miguel Rodríguez Rodríguez

https://editor.p5js.org/miguelrr11/sketches/kxTmDly2N
*/

let axiom = 'F'
let rules, len
//---------
let nGen = 1
//---------
let desiredSize = 400; 
let angle = 60

function setup() {
  createCanvas(600, 400);
  rules = createRulesFromString('F=F-FrrF-F')
  frameRate(15)
}

function mouseClicked(){
  nGen = 1
  loop()
}

function draw() {
  nGen++
  if(nGen > 7){
    noLoop()
  }
  len = desiredSize / Math.pow(2, nGen);
  axiom = 'F'
  for(let i = 0; i < nGen; i++) generate()
  drawKoch()
  
  push()
  fill(255)
  stroke(0)
  text('Click to generate again', 15, height-15)
  pop()
}

function drawKoch(){
    push()
    translate(width/2, height*0.66)
    rotate(radians(-90))
    background(0)
    stroke(255, 50)
    strokeWeight(1.5)
    drawTreeFromRules(radians(angle), len)
    pop()
}

function drawTreeFromRules(angle, len){
    rotate(radians(90))
    for(let i = 0; i < axiom.length; i++){
        let c = axiom.charAt(i)

        switch (c){
            case '_':
                translate(len, 0)
                break
            case '+':
                rotate(angle)
                break
            case 'r':
                let dir = Math.random() < 0.5 ? 1 : -1
                rotate(angle*dir)
            case '-':
                rotate(-angle)
                break
            default:
                line(0, 0, len, 0)
                translate(len, 0)
                break
        }
    }
}

function generate(){
    
    let next = ''
    for(let i = 0; i < axiom.length; i++){
        let c = axiom.charAt(i)
        if (rules[c]) {
            next += rules[c];
        }
        else next += c;
    }
    axiom = next
}

function createRulesFromString(str) {
    let rules = {};
    let pairs = str.split(';');
    
    pairs.forEach(pair => {
        let [key, value] = pair.split('=');
        if (key && value) {
            rules[key.trim()] = value.trim();
        }
    });
    
    return rules;
}