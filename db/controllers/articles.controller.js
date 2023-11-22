const {
  selectArticleById,
  selectAllArticles,
  updateArticleById,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  return selectAllArticles()
    .then((allArticles) => {
      res.status(200).send({ allArticles });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  return updateArticleById(article_id, inc_votes).then((updatedRecord) => {
    res.status(202).send({ updatedRecord });
  })
  .catch(next)
};
