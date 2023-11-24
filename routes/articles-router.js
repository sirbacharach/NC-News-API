const { getAllArticles, getArticleById, patchArticleById, getArticleComments, postCommentsByArticleId } = require("../db/controllers/articles.controller");
const articlesRouter = require("express").Router();
console.log("you are here")
articlesRouter
.route("/")
.get(getAllArticles);

articlesRouter
.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById);

articlesRouter
.route("/:article_id/comments")
.get(getArticleComments)
.post(postCommentsByArticleId);

module.exports = articlesRouter;
