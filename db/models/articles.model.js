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
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "not found" });
      return rows;
    });
};
