const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());  
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/matrix", (req, res) => {
  // Convert strings to numbers
  const grid = req.body.matrix.map(row =>
    row.map(Number)
  );

  const result = minPathSum(grid);

  res.json({
    grid,
    minPathSum: result
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  dp[0][0] = grid[0][0];

  for (let j = 1; j < n; j++)
    dp[0][j] = dp[0][j - 1] + grid[0][j];

  for (let i = 1; i < m; i++)
    dp[i][0] = dp[i - 1][0] + grid[i][0];

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}
