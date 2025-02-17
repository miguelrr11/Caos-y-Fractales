/*
KOCH
Miguel Rodríguez Rodríguez

https://editor.p5js.org/miguelrr11/sketches/Gj2CIyEGH
*/

let axiom = 'F'
let rules, len
//---------
let nGen = 1
//---------
let desiredSize = 400;  // desired side length of the triangle
let angle = 60

function setup() {
  createCanvas(400, 300);
  rules = createRulesFromString('F=F-F++F-F')
  frameRate(10)
}

function draw() {
  nGen++
  if(nGen > 6) nGen = 1
  len = desiredSize / Math.pow(3, nGen);
  axiom = 'F'
  for(let i = 0; i < nGen; i++) generate()
  drawKoch()
}

function drawKoch(){
    push()
    translate(width/2-200, height*0.66)
    rotate(radians(-90))
    background(0)
    stroke(255)
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