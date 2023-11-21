const express = require("express");
const { getAllTopics } = require("./db/controllers/topics.controller");
const { getArticleById, getAllArticles } = require("./db/controllers/articles.controller");
const { wrongPathError, customErrors } = require("./errors");
const { psqlErrors, customErrors} = require("./errors");
const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id", getArticleById);
app.get("*", wrongPathError);

app.use(psqlErrors)
app.use(customErrors)

module.exports = app;