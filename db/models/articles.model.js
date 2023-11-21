const db = require("../connection");

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
