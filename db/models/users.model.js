const db = require("../connection");

exports.selectAllUsers = () => {
  return db
    .query(`SELECT username, name, avatar_url FROM users`)
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectUserByUsername = (username) => {
  return db
    .query(
      `SELECT username, avatar_url, name FROM users
WHERE username = $1`,
      [username]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};
