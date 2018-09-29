// Mikian Musser
// Code Central
// https://p5js.org/reference/

var frog;
var car = [];
var carCount = 10;

function setup() {
  createCanvas(500, 500);
  frog = new Frog();
  for (var i = 0; i < carCount; i++) {
    car[i] = new Car();
  }
}

function draw() {
  background(151);
  frog.collide();
  frog.show();
  for (var i = car.length - 1; i >= 0; i--) {
    car[i].show();
    car[i].update();
    car[i].bounds();
  }
}

function Car() {
  this.row = floor(random(3));
  this.x = 0;
  this.y = 0;
  this.width = random(20, 50);
  this.height = 20;
  this.dir = 0;
  this.speed = 5;
  this.x = random(0, width);
  this.y = height - floor((height / 2) / 20) * 20 - (80 * this.row);
  this.c = color(100, 100, 255);

  if (this.row == 0 || this.row == 2) this.dir = 1;
  else this.dir = -1;

  this.show = function() {
    fill(this.c);
    rect(this.x, this.y, this.width, this.height);
  }

  this.update = function() {
    this.x = this.x + this.speed * this.dir;
  }

  this.bounds = function() {
    if (this.x > width) this.x = 0 - this.width;
    if (this.x < 0 - this.width) this.x = width;
  }
}

function Frog() {
  this.size = 20;
  this.x = width / 2;
  this.y = height - this.size;
  this.c = color(100, 255, 100)

  this.show = function() {
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.size, this.size);
  }

  this.collide = function() {
    for (var i = 0; i < carCount; i++) {
      var hit = collideRectRect(this.x - 1, this.y - 1, this.size - 1, this.size - 1, car[i].x - 1, car[i].y - 1, car[i].width - 1, car[i].height - 1)
      if (hit) {
        this.c = color(255, 100, 100);
        this.y = this.y + this.size;
      } else {
        this.c = color(100, 255, 100);
      }
    }
  }
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    frog.x = frog.x - frog.size;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    frog.x = frog.x + frog.size;
  }
  if (keyIsDown(UP_ARROW)) {
    frog.y = frog.y - frog.size;
  }
  if (keyIsDown(DOWN_ARROW)) {
    frog.y = frog.y + frog.size;
  }
}