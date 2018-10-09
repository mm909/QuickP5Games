// Mikian Musser
// Code Central - Game Dev Night: Pong
// https://p5js.org/reference/

var ball;
var paddle;

function setup(){
  createCanvas(500,500);
  ball = new Ball();
  paddle = new Paddle();
}

function draw(){
  background(151,50);
  noStroke();
  ball.show();
  ball.move();
  ball.bounce();
  paddle.show();
  paddle.check();
  paddle.bounceBall();
}

// Paddle Object!
function Paddle() {
  // location
  this.x = width / 2;
  this.y = height - 50;
  // width
  this.width = 150;
  // height
  this.height = 25;
  // Speed
  this.speed = 10;
  // score
  this.score = 0;

  // Show
  this.show = function() {
    rect(this.x,this.y,this.width,this.height);
    text(this.score, 25, this.y + this.height)
  }
  // moveLeft
  this.moveLeft = function() {
    this.x -= this.speed;
  }
  // move right
  this.moveRight = function() {
    this.x += this.speed;
  }
  // check key
  this.check = function() {
    if(keyIsDown(RIGHT_ARROW)){
      this.moveRight();
    }
    if(keyIsDown(LEFT_ARROW)){
      this.moveLeft();
    }
  }
  // Bounce Ball
  this.bounceBall = function() {
    var hit = collideRectCircle(this.x,this.y,this.width,this.height,ball.x,ball.y,ball.size);
    if(hit) {
      ball.ySpeed *= -1;
      this.score++;
      ball.ySpeed += random(-1,1)
      ball.xSpeed += random(-1,1)
    }
  }
}

// Ball Object!
function Ball() {
  // location
  this.x = width / 2;
  this.y = height / 2;
  // Size (D)
  this.size = 20;
  // Speed NOTE: Make these random later
  this.xSpeed = random(3,5);
  this.ySpeed = random(3,5);
  // Color

  // Show
  this.show = function() {
    var temp1 = map(this.x, 0, width, 0,255)
    var temp2 = map(this.y, 0, height, 0,255)
    fill(0,temp1,temp2)
    ellipse(this.x,this.y,this.size,this.size);
  }
  // Move
  this.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  // Bounce
  this.bounce = function() {
    if(this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
      ball.xSpeed += random(-1,1)
      ball.ySpeed += random(-1,1)
    }
    if(this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
      ball.xSpeed += random(-1,1)
      ball.ySpeed += random(-1,1)
    }
    if(this.y > height) {
      paddle.score = 0;
    }
  }
}
