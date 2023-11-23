const db = require("../../db/connection");

exports.selectAllTopics = (topic) => {
  const validTopics = ["mitch", "cats", "paper"];
  let queryString = `SELECT * FROM topics `;
  const queryValue = [];
  if (topic && !validTopics.includes(topic)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  } else if (topic && validTopics.includes(topic)) {
    queryValue.push(topic);
    queryString += `WHERE slug = $1 `;
  }
  return db.query(queryString, queryValue).then((results) => {
    return results.rows;
  });
};
