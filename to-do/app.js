const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JSON parse error handler
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     return res.status(400).json({
//       status: false,
//       message: 'Invalid JSON payload'
//     });
//   }
//   next();
// });

// Database pool
const pool = new Pool({
  connectionString: process.env.DB_CONNECTING_STR,
});

// Routes
app.get('/', (req, res) => {
  const q = "SELECT * FROM todo;";
  pool.query(q, (error, result) => {
    if (error) {
      console.error("Error while fetching:", error);
      return res.status(500).json({
        status: false,
        data: "Internal Server Error"
      });
    }
    return res.status(200).json({
      status: true,
      data: result.rows
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error while running the server:", error);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});
