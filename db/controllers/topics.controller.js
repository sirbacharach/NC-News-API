const { selectAllTopics, selectEndpoints } = require("../models/topics.model");

exports.getAllTopics = (req, res) => {
  return selectAllTopics().then((allTopics) => {
    res.status(200).send(allTopics);
  });
};

exports.getEndpoints = (req, res) => {
const endPoints = selectEndpoints();
 res.status(200).send(endPoints)
};