const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.use(express.json());

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASS,
  },
});

transport.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("transport verified");
  }
});

router.get("/", (req, res) => {
  const message = process.env.MESSAGE || "localHost";
  res.status(200).json({ api: "winning", message });
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const mail = {
      from: email,
      to: "danny.kyman@gmail.com",
      subject: "Portfolio Inbox",
      text: `
      NAME: ${name}

      EMAIL: ${email}

      MESSAGE: ${message}`,
    };

    transport.sendMail(mail, (err, data) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(200).json({ message: "email successful" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
