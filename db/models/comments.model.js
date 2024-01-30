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
        return Promise.reject({ status: 404, msg: "not found SelComId" });
    });
};

exports.updateCommentsByCommentId = (comment_id, inc_votes) => {
  return db
    .query(
      `UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING *`,
      [inc_votes, comment_id]
    )
    .then(({rows}) => {
      // if (!rows.length) return Promise.reject({status:404, msg: "not found UpdComId"})
      return rows;
    });
};
