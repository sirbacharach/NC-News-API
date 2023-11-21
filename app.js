const express = require("express");
const { getAllTopics } = require("./db/controllers/topics.controller");
const { wrongPathError } = require("./errors");
const { getEndpoints } = require("./db/controllers/api.controller");
const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getEndpoints);
app.get("*", wrongPathError);

module.exports = app;
