const express = require("express");
const { getAllTopics } = require("./db/controllers/topics.controller");
const { wrongPathError } = require("./errors");
const { getArticleById } = require("./db/controllers/articles.controller");
const { psqlErrors } = require("./errors");
const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("*", wrongPathError);

app.use(psqlErrors)

module.exports = app;
