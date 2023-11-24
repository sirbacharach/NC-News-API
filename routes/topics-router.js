const { getAllTopics } = require("../db/controllers/topics.controller");
const topicsRouter = require("express").Router();

topicsRouter
.route("/")
.get(getAllTopics);

module.exports = topicsRouter