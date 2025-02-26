// Miguel Rodriguez Rodriguez
// CODIGOS FRACTALES (DETERMINISTA Y NO DETERMINISTA)
// 26-02-2025

let nPoints
let select, slider, deterministaCB
let oldSelect, determinista = false

let helecho = {
    transformaciones: [
        {a:  0.00, b:  0.00, c:  0.00, d:  0.16, e:  0.00, f:  0.00, p: 0.01},
        {a:  0.85, b:  0.04, c: -0.04, d:  0.85, e:  0.00, f:  1.60, p: 0.85},
        {a:  0.20, b: -0.26, c:  0.23, d:  0.22, e:  0.00, f:  1.60, p: 0.07},
        {a: -0.15, b:  0.28, c:  0.26, d:  0.24, e:  0.00, f:  0.44, p: 0.07}
    ],
    size: 50,
    center: {x: 0, y: 0}
};

let sierpinski = {
    transformaciones: [
        {a:  0.5, b:  0.00, c:  0.00, d:  0.5, e:  0.00, f:  0.00, p: 0.333},
        {a:  0.5, b:  0.00, c:  0.00, d:  0.5, e:  0.50, f:  0.00, p: 0.333},
        {a:  0.5, b:  0.00, c:  0.00, d:  0.5, e:  0.25, f:  0.5,  p: 0.333},
    ],
    size: 350,
    center: {x: -600/3.5, y: 0}
}

let agujas = {
    transformaciones: [
        {a:  0.0, b:  -0.50, c:  0.50, d:  0.0, e:  0.50, f:  0.00, p: 0.333},
        {a:  0.0, b:  0.50, c:  -0.50, d:  0.0, e:  0.50, f:  0.50, p: 0.333},
        {a:  0.5, b:  0.00, c:  0.00, d:  0.5, e:  0.25, f:  0.5,  p: 0.333},
    ],
    size: 500,
    center: {x: -600/2.2, y: 0}
}

let laberinto = {
    transformaciones: [
        {a:  0.333, b:  0.00, c:  0.00, d:  0.333, e:  0.333, f:  0.666, p: 0.333},
        {a:  0.000, b:  0.333, c:  1.00, d:  0.0, e:  0.666, f:  0.0, p: 0.333},
        {a:  0.000, b:  -0.333, c:  1.00, d:  0.0, e:  0.333, f:  0.0,  p: 0.333},
    ],
    size: 500,
    center: {x: -600/2.2, y: 0}
}

let arbol = {
    transformaciones: [
        {a:  0.195, b:  -0.488, c:  0.34, d:  0.443, e:  0.4431, f:  0.2452, p: 0.2},
        {a:  0.462, b:  0.414, c:  -0.252, d:  0.361, e:  0.2511, f:  0.5692, p: 0.2},
        {a:  -0.058, b:  -0.07, c:  0.453, d:  -0.111, e:  0.5976, f:  0.0969,  p: 0.2},
        {a:  -0.035, b:  0.070, c:  -0.469, d:  -0.022, e:  0.4884, f:  0.5069, p: 0.2},
        {a:  -0.637, b:  0.0, c:  0.0, d:  0.501, e:  0.8562, f:  0.2513, p: 0.2}
    ],
    size: 500,
    center: {x: -600/2.2, y: 0}
}

let transformaciones

function setup(){
    createCanvas(600, 600);
    background(0);
    stroke(255); 
    select = createSelect();
    select.option('Helecho');
    select.option('Sierpinski');
    select.option('Agujas');
    select.option('Laberinto');
    select.option('Arbol');
    select.selected('Helecho');
    oldSelect = select.value();
    transformaciones = helecho;
    slider = createSlider(1000, 20000, 1000, 1000);
    nPoints = slider.value()
    slider.changed(dibujarFractal)
    deterministaCB = createCheckbox('Determinista', false);
    deterministaCB.changed(dibujarFractal);
    dibujarFractal();
}

function draw(){
    if(oldSelect != select.value()){
        oldSelect = select.value();
        if(oldSelect == 'Helecho'){
            transformaciones = helecho;
        }
        else if(oldSelect == 'Sierpinski'){
            transformaciones = sierpinski;
        }
        else if(oldSelect == 'Agujas'){
            transformaciones = agujas;
        }
        else if(oldSelect == 'Laberinto'){
            transformaciones = laberinto;
        }
        else if(oldSelect == 'Arbol'){
            transformaciones = arbol;
        }
        background(0);
        dibujarFractal();
    }
}

function dibujarFractal(){
    background(0);
    nPoints = slider.value();
    determinista = deterministaCB.checked();
    if(determinista) nPoints /= 50
    push()
    translate(width / 2, height);
    translate(transformaciones.center.x, transformaciones.center.y);
    if (determinista) {
        let puntos = [[0, 0]]; // Punto inicia
        for (let iter = 0; iter < Math.log2(nPoints); iter++) { // Controla el crecimiento exponencial
            let nuevosPuntos = [];
            for (let p of puntos) {
                for (let t of transformaciones.transformaciones) {
                    let xNew = t.a * p[0] + t.b * p[1] + t.e;
                    let yNew = t.c * p[0] + t.d * p[1] + t.f;
                    nuevosPuntos.push([xNew, yNew]);
                }
            }
            puntos = nuevosPuntos; // Actualizar el conjunto de puntos

            // Dibujar los puntos generados en esta iteración
            for (let p of puntos) {
                point(p[0] * transformaciones.size, -p[1] * transformaciones.size);
            }
        }
    }
    else {
        let x = 0, y = 0;
        for(let i = 0; i < nPoints; i++){
            let t = elegirElemento(transformaciones.transformaciones);

            //aplicar la transformación
            let xNew = t.a * x + t.b * y + t.e;
            let yNew = t.c * x + t.d * y + t.f;
            x = xNew;
            y = yNew;
            //dibujar el punto
            if(i > 500) point(x * transformaciones.size, -y * transformaciones.size);
        }
    }
    
    pop()
}

function elegirElemento(array) {
    let r = Math.random();
    let acumulado = 0;

    for (let i = 0; i < array.length; i++) {
        acumulado += array[i].p;
        if (r < acumulado) {
            return array[i];
        }
    }
    return array[array.length - 1];
}