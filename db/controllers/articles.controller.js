const { insertCommentsByArticleId } = require("../models/articles.model");

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentToInsert = req.body;
  return insertCommentsByArticleId(article_id, commentToInsert)
    .then((addedComments) => {
      res.status(201).send({ addedComments });
    })
    .catch(next);
};
