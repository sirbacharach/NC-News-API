const { selectAllUsers } = require("../models/users.model");

exports.getAllUsers = (req, res, next) => {
  return selectAllUsers()
    .then((allUsers) => {
      res.status(200).send({ allUsers: allUsers });
    })
    .catch(next);
};
