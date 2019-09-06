const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const activityRouter = require('../activities/activity-router');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();
const db = require("../database/dbConfig");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/activities', activityRouter);
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

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
