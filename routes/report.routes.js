const mongoose = require("mongoose");
const express = require("express");
const { postPres } = require("../controllers/report.controller");

const reportRouter = express.Router();

reportRouter.post("/post", postPres);

module.exports = { reportRouter };
