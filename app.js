const express = require("express");
const { getAllTopics } = require("./db/controllers/topics.controller");
const {
  getArticleById,
  getAllArticles,
  patchArticleById,
} = require("./db/controllers/articles.controller");
const { wrongPathError } = require("./errors");
const { psqlErrors, customErrors } = require("./errors");
const { getEndpoints } = require("./db/controllers/api.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getEndpoints);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("*", wrongPathError);

app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
