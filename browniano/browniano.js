//Miguel Rodríguez Rodríguez
//MOVIMIENTO BROWNIANO FRACCIONARIO
//26-02-2025

let points = []
let res = 11
let level = 1
let H = .5
let maxRoughness = 65
let roughness = maxRoughness

function setup(){
    createCanvas(500, 500)
    points.push({x: 0, y: height/2},
                {x: width, y: height/2}
    )
    let slider = createSlider(0, 1, H, .01)
    slider.changed(() => {
        H = slider.value()
        generate()
    })
}

function mouseClicked(){
    generate()
}

function generate(){
    points = []
    points.push({x: 0, y: height/2},
                {x: width, y: height/2}
    )
    level = 1
    roughness = maxRoughness
    loop()
}

function draw(){
    background(0)
    stroke(255)
    for(let i = 0; i < points.length - 1; i++){
        line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    }
    let newPoints = []
    for(let i = 0; i < points.length - 1; i++){
        newPoints.push(points[i])
        let d = (1/Math.pow(Math.pow(2, H), (level)))*random(-roughness, roughness)
        newPoints.push({x: (points[i].x + points[i + 1].x) / 2, y: points[i].y + d})
    }
    newPoints.push(points[points.length - 1])
    level++
    points = newPoints
    if(level == res){
        noLoop()
    }
}