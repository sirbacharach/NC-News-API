const { selectArticleComments } = require("../models/articles.model");
const { selectCommentsById } = require("../models/comments.model");

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const checkCommentExists = selectCommentsById(article_id);
  const acquireArticleComments = selectArticleComments(article_id);

  return Promise.all([acquireArticleComments, checkCommentExists])
    .then((articleComments) => {
      res.status(200).send({ articleComments: articleComments[0] });
    })
    .catch(next);
};
