const { deleteCommentById } = require("../db/controllers/comments.controller");
const commentsRouter = require("express").Router();

commentsRouter
.route("/:comment_id")
.delete(deleteCommentById)

module.exports = commentsRouter