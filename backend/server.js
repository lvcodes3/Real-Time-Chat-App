// create express web server for backend
const express = require("express");
const app = express();

// cors to allow backend and frontend to communicate
const cors = require("cors");

// require env variables
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());

// server listening
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
