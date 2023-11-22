const db = require("../connection");

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
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((response) => {
      const article = response.rows[0];
      if (response.rows.length === 0)
        return Promise.reject({ status: 404, msg: "no records found" });
      return article;
    });
};

exports.selectAllArticles = () => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at;`
    )
    .then(({ rows }) => {
      return rows;
    });
};
