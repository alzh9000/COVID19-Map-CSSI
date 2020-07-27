// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, background, ellipse, random, width, height,
   rect, line, text, rectMode, CENTER, mouseX, mouseY, windowWidth, windowHeight, fill, collidePointCircle, strokeWeight,
   point, createButton, textSize*/

let backgroundColor,
  spherePosition,
  rectPosition,
  squareCircleDist,
  mouseCircleDist,
  H, numberOfObstacles,
  obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9, obstacle10, hit, winHit,
    gameOver, button;

function setup() {
  // Canvas & color settings
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  // colorMode(RGB);
  rectMode(CENTER);
  // backgroundColor = (0, 100, 100);
  // This variable contains a JSON object
  spherePosition = {
    x: 100,
    y: 100
  };
  rectPosition = { x: 150, y: 200 };
  H = 0;
  
  hit = false;
  gameOver= false;
  winHit= false;
  
  obstacle1 = new obstacles();
  obstacle2= new obstacles();
  obstacle3 = new obstacles();
  obstacle4= new obstacles();
  obstacle5 = new obstacles();
  obstacle6= new obstacles();
  obstacle7 = new obstacles();
  obstacle8= new obstacles();
  obstacle9 = new obstacles();
  obstacle10= new obstacles();
  
    // backgroundColor = (
    // 4 * (100 - 100 * sigmoid((4 * mouseCircleDist) / (width + height))));
  gameOver = false;
}

function draw() {
  background((backgroundColor),
    100,
    100
  );
  
  if (!gameOver)  {
  backgroundColor = (
    4 * (100 - 100 * sigmoid((4 * mouseCircleDist) / (width + height))));
  strokeWeight(0);
  fill(backgroundColor, 100, 100);
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  rect(rectPosition.x, rectPosition.y, 20, 20);
  line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  squareCircleDist = calculateDistance(spherePosition, rectPosition);

  fill(0);
  text(
    `the distance between the square and circle is ${squareCircleDist}`,
    5,
    15
  );

  let mousePosition = { x: mouseX, y: mouseY };
  mouseCircleDist = calculateDistance(spherePosition, mousePosition);
  text(
    `the distance between the mouse and circle is ${mouseCircleDist}`,
    5,
    30
  );
  
  obstacle1.show();
  obstacle2.show();
  obstacle3.show();
  obstacle4.show(); 
  obstacle5.show();
  obstacle6.show();
  obstacle7.show(); 
  obstacle8.show();
  obstacle9.show();
  obstacle10.show();
  
  strokeWeight(10);
  point(mouseX,mouseY);
  
  collisions();
  
  }
}

function mousePressed() {
  spherePosition.x = random(width);
  spherePosition.y = random(height);
}

function calculateDistance(coordinate1, coordinate2) {
  let dist = Math.sqrt(
    (coordinate1.x - coordinate2.x) ** 2 + (coordinate1.y - coordinate2.y) ** 2
  );
  dist = Math.round(dist);
  return dist;
}


function sigmoid(t) {
  return 1 / (1 + Math.pow(Math.E, -t));
}
  

class obstacles  {
  constructor()  {
    this.x = random(width);
    this.y = random(height);
    this.s = random(2, 20);
  }
  
  show()  {
    fill(220, 80, 80);
    ellipse(this.x, this.y, this.s);
   
    hit = collidePointCircle(mouseX,mouseY,this.x,this.y,this.s)
   
    if (hit)  {
      gameOver=true;
    }
     
    if (gameOver==true){
      background(100);
      textSize(20);
      fill(0);
      text("Game Over", width/2, height/2);
      button = createButton('Try again!');
      button.position(100, 100);
      button.mousePressed(gameOver = false);
    }
  }
}

function collisions()  {
  winHit=collidePointCircle(mouseX,mouseY,spherePosition.x,spherePosition.y,20);
  if (winHit)  {
    background(100);
    textSize(30);
    text("You found the circle!", width/2, height/2);
    fill(0);
    ellipse(spherePosition.x, spherePosition.y, 20, 20);
  }
}