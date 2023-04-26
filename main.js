let alto;
let largo;
let numCuts = 0;
let contenedor = document.getElementById('canvas')


let centerX1 =0;
let centerY1 =0;
let centerX2 =0;
let centerY2 =0;
let centerX3 =0;
let centerY3 =0;
let radius = 0;

function setup() {

  var canvas = createCanvas(contenedor.offsetWidth, contenedor.offsetHeight);
  canvas.parent(contenedor);

  largo = contenedor.offsetWidth/6
  alto = contenedor.offsetHeight/2

  centerX1 =largo;
  centerY1 =alto;
  centerX2 =largo*3;
  centerY2 =alto;
  centerX3 =largo*5;
  centerY3 =alto;
  radius = largo-(largo*.3);

}

function draw() {
  background(220);
  textSize(30);
  drawCirclePoints(centerX1,centerY1,radius);
  text("Punto pediente", centerX1*.7, centerY1+(radius*1.5));
  drawCirclePoints(centerX2,centerY2,radius);
  text("DDA", centerX2*.6+centerX1, centerY2+(radius*1.5));
  drawCirclePoints(centerX3,centerY3,radius);
  text("Bersenham", centerX2+centerX1*1.8, centerY3+(radius*1.5));


  if (numCuts > 1) {
    for (let i = 0; i < numCuts; i++) {
      const angulo = TWO_PI * i / numCuts;
      const x2 = centerX1 + radius * cos(angulo);
      const y2 = centerY1 + radius * sin(angulo);
      ppRecta(centerX1, centerY1, x2, y2);
    }

    for (let i = 0; i < numCuts; i++) {
      const angulo = TWO_PI * i / numCuts;
      const x2 = centerX2 + radius * cos(angulo);
      const y2 = centerY2 + radius * sin(angulo);
      ddaLine(centerX2, centerY2, x2, y2);
    }

    for (let i = 0; i < numCuts; i++) {
      const angulo = TWO_PI * i / numCuts;
      const x2 = centerX3 + radius * cos(angulo);
      const y2 = centerY3 + radius * sin(angulo);
        bresenhamLine(Math.round(centerX3), Math.round(centerY3), Math.round(x2), Math.round(y2));
    }
  }
}

function drawCirclePoints(xc, yc, r) {
  let x = 0;
  let y = r;
  let p = 5/4 - r;

  stroke(0);
  strokeWeight(2);
  point(xc, yc + r); 

  while (x < y) {
    x++;
    if (p < 0) {
      p += 2*x + 1;
    } else {
      y--;
      p += 2*x + 1 - 2*y;
    }
    point(xc + x, yc + y);
    point(xc - x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc - y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc - x);
  }
}

function windowResized() {
  resizeCanvas(document.getElementById('canvas').clientWidth, document.getElementById('canvas').clientHeight);
}

function bresenhamLine(x1, y1, x2, y2) {
  let dx = abs(x2 - x1);
  let dy = abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  let prevX = x1;
  let prevY = y1;

  point(x1, y1);

  while (x1 !== x2 || y1 !== y2) {
    let e2 = err * 2;

    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }

    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }

    if (x1 !== prevX || y1 !== prevY) {
      point(x1, y1);
      prevX = x1;
      prevY = y1;
    }
  }
}

function ddaLine(x1, y1, x2, y2) {

  if (x1 > x2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
  }

  if (x1 === x2) {
    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }

    for (let y = y1; y <= y2; y++) {
      point(x1, y);
    }

    return;
  }

  let dx = x2 - x1;
  let dy = y2 - y1;
  let m = dy / dx;
  point(x1, y1);

  let x = x1;
  let y = y1;

  if (m === Infinity || m === -Infinity) {
    while (y <= y2) {
      y++;
      point(x, y);
    }
  } else {
    while (x < x2) {
      x = x + 1;
      y = y + m;
      point(x, y);
    }
  }
  point(x2, y2);
}


function ppRecta(x1, y1, x2, y2) {
  if (x1 === x2) { 
    for (let y = y1; y <= y2; y += 1) {
      let x = x1; 
      point(x, y);
    }
  } else if (x1 <= x2) { 
    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;
    for (let x = x1; x <= x2; x += 1) {
      let y = m * x + b;
      point(x, y);
    }
  } else { 
    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;
    for (let x = x1; x >= x2; x -= 1) {
      let y = m * x + b;
      point(x, y);
    }
  }
}

const cutButton = document.getElementById('cut');
cutButton.addEventListener('click', function(event) {
  const cutsInput = document.getElementById('cuts');
  const cutsValue = parseInt(cutsInput.value);

  numCuts = cutsValue;

  event.preventDefault();
});
