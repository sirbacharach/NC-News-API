const {
  selectArticleById,
  selectAllArticles,
  selectArticleComments,
  updateArticleById,
  insertCommentsByArticleId,
  selectCommentsById,
} = require("../models/articles.model");
const { selectArticleCommentCount } = require("../models/comments.model");
const { selectAllTopics } = require("../models/topics.model");

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentToInsert = req.body;
  return insertCommentsByArticleId(article_id, commentToInsert)
    .then((addedComments) => {
      res.status(201).send({ addedComments });
    })
    .catch(next);
};

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

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { query } = req.query;
  if (query === "comment_count" && article_id) {
    const promise1 = selectArticleCommentCount(article_id);
    const promise2 = selectArticleById(article_id);
    return Promise.all([promise1, promise2])
      .then((resultCount) => {
        res.status(200).send({ resultCount: resultCount[0] });
      })
      .catch(next);
  } else {
    return selectArticleById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
  }
};

exports.getAllArticles = (req, res, next) => {
  const { topic } = req.query;
  return selectAllTopics(topic)
    .then(() => {
      return selectAllArticles(topic);
    })
    .then((returnedPromise) => {
      res.status(200).send({ articles: returnedPromise });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  const updateArticle = updateArticleById(article_id, inc_votes);
  const checkIfArticleExists = selectArticleById(article_id);
  return Promise.all([updateArticle, checkIfArticleExists])
    .then((returnedPromise) => {
      const updatedRecord = returnedPromise[0];
      res.status(200).send({ updatedRecord });
    })
    .catch(next);
};
