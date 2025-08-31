document.addEventListener("DOMContentLoaded", () => {
  let table = document.getElementById("ping-pong-table");
  let ball = document.getElementById("ball");
  let paddle = document.getElementById("paddle");   // left paddle
  let paddle2 = document.getElementById("paddle2"); // right paddle

  // Ball setup
  let ballX = 50, ballY = 50;
  let dx = 2, dy = 2;

  // Paddle setup
  let paddleY = 0;
  let paddle2Y = 150; // starting position for right paddle
  let dpy = 20;

  // Initial positions
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  paddle.style.top = `${paddleY}px`;
  paddle2.style.top = `${paddle2Y}px`;

  // 🎯 Ball movement loop
  setInterval(() => {
    ballX += dx;
    ballY += dy;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Collision with left paddle
    if (
      ballX <= paddle.offsetLeft + paddle.offsetWidth &&
      ballX >= paddle.offsetLeft &&
      ballY + ball.offsetHeight > paddle.offsetTop &&
      ballY < paddle.offsetTop + paddle.offsetHeight
    ) {
      dx *= -1;
    }

    // Collision with right paddle
    if (
      ballX + ball.offsetWidth >= paddle2.offsetLeft &&
      ballX <= paddle2.offsetLeft + paddle2.offsetWidth &&
      ballY + ball.offsetHeight > paddle2.offsetTop &&
      ballY < paddle2.offsetTop + paddle2.offsetHeight
    ) {
      dx *= -1;
    }

    // Wall collisions
    if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1;
    if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1;
  }, 10);

  // 🎯 Paddle movement
  document.addEventListener("keydown", (event) => {
    // Left paddle (Arrow keys)
    if (event.key === "ArrowUp") {
      event.preventDefault();
      paddleY = Math.max(0, paddleY - dpy);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      paddleY = Math.min(
        table.offsetHeight - paddle.offsetHeight,
        paddleY + dpy
      );
    }

    // Right paddle (W / S keys)
    if (event.key === "w" || event.key === "W") {
      event.preventDefault();
      paddle2Y = Math.max(0, paddle2Y - dpy);
    } else if (event.key === "s" || event.key === "S") {
      event.preventDefault();
      paddle2Y = Math.min(
        table.offsetHeight - paddle2.offsetHeight,
        paddle2Y + dpy
      );
    }

    // Update paddle positions
    paddle.style.top = `${paddleY}px`;
    paddle2.style.top = `${paddle2Y}px`;
  });

  // 🎯 Optional: Left paddle follows mouse
  const paddleHeight = paddle.offsetHeight;
  table.addEventListener("mousemove", (event) => {
    const tableRect = table.getBoundingClientRect();
    let mouseY = event.clientY - tableRect.top;

    let newPaddleY = mouseY - paddleHeight / 2;
    newPaddleY = Math.max(0, Math.min(table.offsetHeight - paddleHeight, newPaddleY));

    paddleY = newPaddleY;
    paddle.style.top = `${paddleY}px`;
  });
});
