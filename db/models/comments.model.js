const db = require("../connection");

exports.deleteSelectedComment = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments
WHERE comment_id = $1
RETURNING *`,
      [comment_id]
    )
    .then(() => {
      return { status: 204, msg: "not found" };
    });
};

exports.selectCommentById = (comment_id) => {
  return db
    .query(
      `SELECT comment_id FROM comments
 WHERE comment_id = $1`,
      [comment_id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "not found" });
    });
};
