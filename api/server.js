const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get("/", (req, res) => {
  res.send(`<h1>BUILD WEEK BAYBAY</h1>`);
});

module.exports = server;
