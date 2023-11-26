const { deleteCommentById, patchCommentsByCommentId } = require("../db/controllers/comments.controller");
const commentsRouter = require("express").Router();

commentsRouter
.route("/:comment_id")
.delete(deleteCommentById)
.patch(patchCommentsByCommentId)

module.exports = commentsRouter