var ball;
var paddle;

function setup() {
  createCanvas(500, 500);
  ball = new Ball();
  paddle = new Paddle();
}

function draw() {
  background(151);
  ball.update();
  ball.bounce();
  ball.show();
  paddle.show();
  paddle.update();
  paddle.bounceBall();
}

function Paddle() {
  this.x = width / 2;
  this.y = height - 50;
  this.width = 150;
  this.height = 20;
  this.speed = 10;

  this.show = function() {
    rect(this.x, this.y, this.width, this.height);
  }

  // left 37
  // right 39

  this.update = function() {
    if (keyIsDown(37)) {
      paddle.moveLeft();
    }
    if (keyIsDown(39)) {
      paddle.moveRight();
    }
  }

  this.moveLeft = function() {
    this.x = this.x - this.speed;
  }

  this.moveRight = function() {
    this.x = this.x + this.speed;
  }

  this.bounceBall = function() {
    var hit = collideRectCircle(this.x, this.y, this.width, this.height, ball.x, ball.y, ball.size);
    if (hit) {
      ball.yv = ball.yv * -1;
    }
  }
}

function Ball() {
  this.x = width / 2;
  this.y = height / 2;
  this.size = 20;
  this.xv = random(3, 4);
  this.yv = random(-2, -3);

  this.show = function() {
    ellipse(this.x, this.y, this.size, this.size);
  }

  this.update = function() {
    this.x = this.x + this.xv;
    this.y = this.y + this.yv;
  }

  this.bounce = function() {
    if (this.x > width) {
      this.xv = this.xv * -1;
    }
    if (this.y > height) {
      this.yv = this.yv * -1;
    }
    if (this.x < 0) {
      this.xv = this.xv * -1;
    }
    if (this.y < 0) {
      this.yv = this.yv * -1;
    }
  }
}