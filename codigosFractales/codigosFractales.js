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

let listaTransformaciones = new Map()
listaTransformaciones.set('Helecho', helecho)
listaTransformaciones.set('Sierpinski', sierpinski)
listaTransformaciones.set('Agujas', agujas)
listaTransformaciones.set('Laberinto', laberinto)
listaTransformaciones.set('Arbol', arbol)

let transformaciones
let inputs, semillasTexto
let semillas = [[0, 0]]

function setup(){
    createCanvas(600, 600);
    background(0);
    stroke(255); 
    select = createSelect();
    select.position(620, 10);
    select.option('Helecho');
    select.option('Sierpinski');
    select.option('Agujas');
    select.option('Laberinto');
    select.option('Arbol');
    select.selected('Helecho');
    select.changed(() => {setInputs()})
    oldSelect = select.value();
    transformaciones = helecho;
    let tx = createP('Número de puntos')
    tx.position(620, 265);
    slider = createSlider(1000, 20000, 10000, 1000);
    slider.position(620, 305);
    nPoints = slider.value()
    slider.changed(dibujarFractal)
    deterministaCB = createCheckbox('Determinista', false);
    deterministaCB.changed(dibujarFractal);
    deterministaCB.position(620, 330);
    dibujarFractal();

    //create a 7x5 grid of inputs
    //modify its positions so they form a grid
    inputs = [];
    for(let i = 0; i < 7; i++){
        inputs.push([]);
        for(let j = 0; j < 5; j++){
            let inp = createInput()
            inp.size(40)
            inputs[i].push(inp);
            inp.position(620 + 40 * i, 40 * j + 50);
        }
    }
    //write a, b, c, d, e, f, p in a sentence above the inputs
    let labels = ['a', 'b', 'c', 'd', 'e', 'f', 'p'];
    for(let i = 0; i < 7; i++){
        let label = createP(labels[i]);
        label.position(640 + 40 * i, 10);
    }
    let clearInputsButton = createButton('Borrar SFI');
    clearInputsButton.mousePressed(clearInputs);
    clearInputsButton.position(620, 250);
    let dibujarFromInputsButton = createButton('Dibujar desde inputs');
    dibujarFromInputsButton.mousePressed(dibujarFromInputs);
    dibujarFromInputsButton.position(790, 250);
    let guardarTransfomracionButton = createButton('Guardar SFI');
    guardarTransfomracionButton.mousePressed(guardarTransformaciones);
    guardarTransfomracionButton.position(700, 250);

    let offsestXSlider = createSlider(-800, 600, 0, 1);
    offsestXSlider.position(620, 350);
    offsestXSlider.changed(() => {transformaciones.center.x = offsestXSlider.value(); dibujarFractal()});
    let offsestYSlider = createSlider(-600, 300, 0, 1);
    offsestYSlider.position(620, 370);
    offsestYSlider.changed(() => {transformaciones.center.y = offsestYSlider.value(); dibujarFractal()});
    tx = createP('Mover en la X')
    tx.position(760, 335);
    tx = createP('Mover en la Y')
    tx.position(760, 355);
    let sizeSlider = createSlider(0, 1000, 500, 1);
    sizeSlider.position(620, 390);
    sizeSlider.changed(() => {transformaciones.size = sizeSlider.value(); dibujarFractal()});
    tx = createP('Tamaño')
    tx.position(760, 375);

    tx = createP('Semillas:')
    tx.position(620, 410);
    semillasTexto = createP('');
    semillasTexto.position(620, 430);
    setSemillasTexto()
    tx = createP('Añadir semilla:')
    tx.position(620, 470);
    let addSemillaInputX = createInput('x');
    addSemillaInputX.size(40);
    addSemillaInputX.position(620, 510);
    let addSemillaInputY = createInput('y');
    addSemillaInputY.size(40);
    addSemillaInputY.position(670, 510);
    let addSemillaButton = createButton('Añadir');
    addSemillaButton.position(720, 510);
    addSemillaButton.mousePressed(() => {
        let x = parseFloat(addSemillaInputX.value());
        let y = parseFloat(addSemillaInputY.value());
        if(x != undefined && y != undefined) semillas.push([x, y]);
        setSemillasTexto();
    });
    let clearSemillasButton = createButton('Borrar semillas');
    clearSemillasButton.position(620, 535);
    clearSemillasButton.mousePressed(() => {semillas = [[0, 0]]; setSemillasTexto();});

    for(let i = 0; i < 5; i++){
        tx = createP('Transformación ' + (i + 1))
        tx.position(920, 35 + 40 * i);
    }

    setInputs()
}

function setInputs(){
    let transformaciones = listaTransformaciones.get(select.value());
    for(let i = 0; i < 5; i++){
        let t = transformaciones.transformaciones[i];
        if(t == undefined){
            for(let j = 0; j < 7; j++){
                inputs[j][i].value('');
            }
            continue;
        }
        inputs[0][i].value(t.a);
        inputs[1][i].value(t.b);
        inputs[2][i].value(t.c);
        inputs[3][i].value(t.d);
        inputs[4][i].value(t.e);
        inputs[5][i].value(t.f);
        inputs[6][i].value(t.p);
    }
}

function setSemillasTexto(){
    tx = '';
    for(let s of semillas){
        tx += '(' + s[0] + ', ' + s[1] + ') ';
    }
    semillasTexto.html(tx);
}

function guardarTransformaciones(){
    let transformacionesInp = [];
    for(let i = 0; i < 5; i++){
        let a = parseFloat(inputs[0][i].value());
        let b = parseFloat(inputs[1][i].value());
        let c = parseFloat(inputs[2][i].value());
        let d = parseFloat(inputs[3][i].value());
        let e = parseFloat(inputs[4][i].value());
        let f = parseFloat(inputs[5][i].value());
        let p = parseFloat(inputs[6][i].value());
        if(a != undefined && b != undefined && c != undefined && 
            d != undefined && e != undefined && f != undefined && p != undefined 
            && p >= 0 && p <= 1) transformacionesInp.push({a: a, b: b, c: c, d: d, e: e, f: f, p: p});
    }
    let newTransformaciones = {transformaciones: transformacionesInp, size: 100, center: {x: -600/2.2, y: 0}};
    let n = select.elt.length;
    select.option('SFI ' + n);
    listaTransformaciones.set('SFI ' + n, newTransformaciones);
    select.selected('SFI ' + n);
}

function clearInputs(){
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 5; j++){
            inputs[i][j].value('');
        }
    }
}

function dibujarFromInputs(){
    let transformacionesInp = [];
    for(let i = 0; i < 5; i++){
        let a = parseFloat(inputs[0][i].value());
        let b = parseFloat(inputs[1][i].value());
        let c = parseFloat(inputs[2][i].value());
        let d = parseFloat(inputs[3][i].value());
        let e = parseFloat(inputs[4][i].value());
        let f = parseFloat(inputs[5][i].value());
        let p = parseFloat(inputs[6][i].value());
        if(a != undefined && b != undefined && c != undefined && 
            d != undefined && e != undefined && f != undefined && p != undefined 
            && p >= 0 && p <= 1) transformacionesInp.push({a: a, b: b, c: c, d: d, e: e, f: f, p: p});
    }
    transformaciones = {transformaciones: transformacionesInp, size: 100, center: {x: -600/2.2, y: 0}};
    dibujarFractal();
}

function draw(){
    if(oldSelect != select.value()){
        oldSelect = select.value();
        transformaciones = listaTransformaciones.get(select.value());
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
    strokeWeight(2)
    if (determinista) {
        let puntos = JSON.parse(JSON.stringify(semillas));
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