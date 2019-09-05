const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const server = express();
const db = require("./database/dbConfig");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get("/", (req, res) => {
  res.send(`<h1>BUILD WEEK BAYBAY</h1>`);
});

server.get("/test", async (req, res) => {
  const users = await db("users");

  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = server;
