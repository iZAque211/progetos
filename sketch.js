let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;
let ballSpeedX = 5;
let ballSpeedY = 5;

function setup() {
  createCanvas(800, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);
  
  leftPaddle.show();
  leftPaddle.update();
  rightPaddle.show();
  rightPaddle.update();
  
  ball.show();
  ball.update();
  ball.checkPaddleCollision(leftPaddle);
  ball.checkPaddleCollision(rightPaddle);
  ball.checkEdges();
  
  displayScores();
}

function displayScores() {
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rightPaddle.move(-10);
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.move(10);
  }

  if (key === 'w' || key === 'W') {
    leftPaddle.move(-10);
  } else if (key === 's' || key === 'S') {
    leftPaddle.move(10);
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    rightPaddle.move(0);
  }

  if (key === 'w' || key === 'W' || key === 's' || key === 'S') {
    leftPaddle.move(0);
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 20;
    this.h = 100;
    this.y = height / 2 - this.h / 2;
    if (isLeft) {
      this.x = 0;
    } else {
      this.x = width - this.w;
    }
    this.ySpeed = 0;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.ySpeed;
    this.y = constrain(this.y, 0, height - this.h);
  }

  move(steps) {
    this.ySpeed = steps;
  }
}

class Ball {
  constructor() {
    this.size = 20;
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += ballSpeedX;
    this.y += ballSpeedY;
  }

  checkEdges() {
    if (this.y <= 0 || this.y >= height) {
      ballSpeedY *= -1;
    }

    if (this.x <= 0) {
      rightScore++;
      this.reset();
    } else if (this.x >= width) {
      leftScore++;
      this.reset();
    }
  }

  checkPaddleCollision(paddle) {
    if (this.x - this.size / 2 <= paddle.x + paddle.w &&
      this.x + this.size / 2 >= paddle.x &&
      this.y >= paddle.y &&
      this.y <= paddle.y + paddle.h) {
      ballSpeedX *= -1;
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    ballSpeedX *= random() > 0.5 ? 1 : -1;
    ballSpeedY *= random() > 0.5 ? 1 : -1;
  }
}