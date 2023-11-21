const { selectArticleComments } = require("../models/articles.model");

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticleComments(article_id)
    .then((articleComments) => {
      res.status(200).send({ articleComments });
    })
    .catch(next);
};
