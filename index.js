 document.addEventListener("DOMContentLoaded", () => {
      let table = document.getElementById("ping-pong-table");
      let ball = document.getElementById("ball");
      let paddle = document.getElementById("paddle");

      // Ball setup
      let ballX = 50, ballY = 50;
      let dx = 2, dy = 2;

      // Paddle setup
      let paddleY = 0;
      let dpy = 20;

      // Initial positions
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;
      paddle.style.top = `${paddleY}px`;

      // 🎯 Ball movement loop
      setInterval(() => {
        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
       if (
  ballX + ball.offsetWidth > paddle.offsetLeft &&
  ballX < paddle.offsetLeft + paddle.offsetWidth &&
  ballY + ball.offsetHeight > paddle.offsetTop &&
  ballY < paddle.offsetTop + paddle.offsetHeight
) {
  dx *= -1; 
}


        if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1;
        if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1;
      }, 10);

      // 🎯 Paddle movement
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault(); // stop page scrolling
          paddleY = Math.max(0, paddleY - dpy);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          paddleY = Math.min(
            table.offsetHeight - paddle.offsetHeight,
            paddleY + dpy
          );
        }
        paddle.style.top = `${paddleY}px`;
      });

  const paddleHeight = paddle.offsetHeight;

       // Track mouse movement inside the table
  table.addEventListener("mousemove", (event) => {
    // Get mouse Y relative to table
    const tableRect = table.getBoundingClientRect();
    let mouseY = event.clientY - tableRect.top;

    // Center paddle on mouse
    let paddleY = mouseY - paddleHeight / 2;

    // Keep paddle inside table
    paddleY = Math.max(0, Math.min(table.offsetHeight - paddleHeight, paddleY));

    // Apply position
    paddle.style.top = `${paddleY}px`;
  });

    });