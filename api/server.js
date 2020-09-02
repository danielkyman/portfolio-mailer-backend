const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
// require("dotenv").config();
// const nodemailer = require("nodemailer");

const mailerRouter = require("../routes/mailer-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/mailer", mailerRouter);

server.get("/", (req, res) => {
  res.json({ api: "winning" });
});

module.exports = server;
