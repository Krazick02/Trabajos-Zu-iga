var colord = '#FF0000'

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  ddarect(50, 50, 20, 20);

  if (colision(mouseX - 10, mouseY - 10, 20, 20, 50, 50, 20, 20)) {
    colord = '#FF0000'
  } else {
    colord = '#000000'
  }
  ddarect(mouseX - 10, mouseY - 10, 20, 20);
}

function ddarect(x1, y1, width, height) {
  // verticales
  bresenhamLine(x1, y1, x1 + width, y1);
  bresenhamLine(x1, y1 + height, x1 + width, y1 + height);
  //horizontales
  bresenhamLine(x1, y1, x1, y1 + height);
  bresenhamLine(x1 + width, y1, x1 + width, y1 + height);
}

function bresenhamLine(x1, y1, x2, y2) {

  console.log('line '+x1+','+y1+' y '+x1+','+y1)

  let dx = abs(x2 - x1);
  let dy = -abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx + dy;
  stroke(colord);
  strokeWeight(2);
  point(x1, y1);
  while (x1 != x2 || y1 != y2) {
    let e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x1 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y1 += sy;
    }
    point(x1, y1);
  }
}

function colision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2;
}
