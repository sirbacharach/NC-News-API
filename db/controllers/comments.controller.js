const deleteSelectedComment = require("../models/comments.model")

exports.deleteCommentById = () => {
    console.log("in controller")
console.log(deleteSelectedComment())
}