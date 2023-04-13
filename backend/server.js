// create express web server for backend
const express = require("express");
const app = express();

// cors to allow backend and frontend to communicate
const cors = require("cors");
// HTTP request logger middleware for node.js
const morgan = require("morgan");

// require env variables
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// importing userRoutes
const userRoutes = require("./routes/userRoutes");
// routes
app.use("/api/v1/auth", userRoutes);

// server listening
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
