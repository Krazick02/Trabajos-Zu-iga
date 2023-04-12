var colord = '#FF0000'

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  ddarect(50,50,20,20);

  if (colision(mouseX - 10, mouseY - 10, 20, 20, 50, 50, 20, 20)) {
    colord = '#FF0000'
  } else {
    colord = '#000000'
  }
  ddarect(mouseX - 10, mouseY - 10, 20, 20);
}

function ddarect(x1, y1, width, height) {
  // verticales
  ddaLine(x1,y1,x1+width,y1);
  ddaLine(x1,y1+height,x1+width,y1+height);
  //horizontales
  ddaLine(x1,y1,x1,y1+height);
  ddaLine(x1+width,y1,x1+width,y1+height);
}

function ddaLine(x1, y1, x2, y2) {
  // Validar si la línea es vertical
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
  
  stroke(colord);
  strokeWeight(2);
  
  point(x1, y1);
  
  let x = x1;
  let y = y1;
  while (x < x2) {
    x = x + 1;
    y = y + m;
    point(x, y);
  }
  
  point(x2, y2);
}

function colision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 &&
         x1 + w1 > x2 &&
         y1 < y2 + h2 &&
         y1 + h1 > y2;
}
