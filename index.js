document.addEventListener("DOMContentLoaded", () => {
  // Select the table and ball elements
  let table = document.getElementById("ping-pong-table");
  let ball = document.getElementById("ball");

  // Initial ball position (X, Y)
  let ballX = 50;
  let ballY = 50;

  // Speed of ball movement (dx for horizontal, dy for vertical)
  let dx = 2;
  let dy = 2;

  // Set ball's initial position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Start the game loop (updates ball movement every 10ms)
  setInterval(() => {
    // Move the ball by adding dx & dy
    ballX += dx;
    ballY += dy;

    // Apply new position to the ball
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    /*
      Bounce logic:
      - If the ball hits left or right wall → reverse dx
      - If the ball hits top or bottom wall → reverse dy
      - We subtract ball.offsetWidth/offsetHeight so the ball 
        bounces before going outside the container
    */

    // Bounce horizontally (left/right walls)
    if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) {
      dx *= -1; // reverse horizontal direction
    }

    // Bounce vertically (top/bottom walls)
    if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) {
      dy *= -1; // reverse vertical direction
    }
  }, 10); // repeat every 10 milliseconds
});
