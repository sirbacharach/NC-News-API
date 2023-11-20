const db = require("../../db/connection");
const endPoints = require("../../endpoints.json")

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then((results) => {
    return results.rows;
  });
};

exports.selectEndpoints = () => {
  return endPoints
};