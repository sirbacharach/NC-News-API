const express = require("express");
const { getAllTopics } = require("./db/controllers/topics.controller");
const { wrongPathError, psqlErrors } = require("./errors");
const { getArticleComments } = require("./db/controllers/articles.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("*", wrongPathError);

app.use(psqlErrors);

module.exports = app;
