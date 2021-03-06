var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height - 30;
var radius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickWidth = 75;
var brickHeight = 20;
var brickColumnCount = 5;
var brickRowCount = 3;
var brickOffsetLeft = 30;
var brickOffsetTop = 30
var brickPadding = 10;
var score = 0;

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r = 0; r<brickRowCount; r++) {
		bricks[c][r] = {x:0, y:0, status:1}
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "blue";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function drawBall() {
	//drawing code
	ctx.beginPath();
	ctx.arc(x , y , radius, 0, Math.PI*2, false);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						alert("YOU WIN, CONGRATULATIONS!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Score : "+score, 8, 20);
	ctx.fill();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();

	if(y + dy < radius ) {
		dy = -dy;
	}else if(y + dy > canvas.height - radius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else{
			alert("GAME OVER");
			document.location.reload();
		}
	}
	if(x + dx < radius || x + dx > canvas.width - radius) {
		dx = -dx;
	}

	if(rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	x += dx;
	y += dy;
}

setInterval(draw, 10);
