const { getAllArticles, getArticleById, patchArticleById, getArticleComments, postCommentsByArticleId, postArticle } = require("../db/controllers/articles.controller");
const articlesRouter = require("express").Router();

articlesRouter
.route("/")
.get(getAllArticles)
.post(postArticle)

articlesRouter
.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById);

articlesRouter
.route("/:article_id/comments")
.get(getArticleComments)
.post(postCommentsByArticleId);

module.exports = articlesRouter;
