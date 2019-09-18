const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const activityRouter = require("../activities/activity-router");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const commentsRouter = require("../comments/comments.js");

const server = express();
const db = require("../database/dbConfig");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/activities", activityRouter);
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/activities", commentsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>BUILD WEEK BAYBAY</h1>`);
});

module.exports = server;
