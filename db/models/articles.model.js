const db = require("../connection");
const { formatArticle, convertTimestampToDate } = require("../seeds/utils");
const format = require("pg-format")

exports.insertCommentsByArticleId = (article_id, commentToInsert) => {
  const body = commentToInsert.body;
  const author = commentToInsert.author;
  return db
    .query(
      `INSERT INTO comments
    (body, article_id, author)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [body, article_id, author]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticleComments = (article_id) => {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id
    FROM articles
    JOIN comments ON articles.article_id = comments.article_id
    WHERE comments.article_id = $1 ORDER BY created_at;
`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows;
    });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id, comments.article_id`,
      [article_id]
    )

    .then(({ rows }) => {
      console.log(rows)
      const article = rows;
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "not found" });

      return article;
    });
};

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectAllArticles = (topic, sort_by = "created_at", order = "ASC") => {
  const validQueries = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const validOrders = ["ASC", "DESC"];

  if (!validQueries.includes(sort_by) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  let queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id `;
  const queryValue = [];
  if (topic) {
    queryValue.push(topic);
    queryString += `WHERE topic = $1 `;
  }

  queryString += `GROUP BY articles.article_id `;

  if (sort_by && order && validOrders.includes(order)) {
    queryString += `ORDER BY ${sort_by} ${order} `;
  }

  return db.query(queryString, queryValue).then(({ rows }) => {
    return rows;
  });
};

exports.selectCommentsById = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments
WHERE article_id = $1`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    });
};

exports.insertArticle = (articleToPost) => {
  const formattedArticle = formatArticle(articleToPost)
  return db.query(format('INSERT INTO articles (author, title, body, topic) VALUES %L RETURNING *', [formattedArticle]))

.then(({rows})=>{
  return rows
})
};