const { selectAllUsers, selectUserByUsername } = require("../models/users.model");

exports.getAllUsers = (req, res, next) => {
  return selectAllUsers()
    .then((allUsers) => {
      res.status(200).send({ allUsers: allUsers });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res)=>{
const {username} = req.params
return selectUserByUsername(username)
.then((user)=>{
res.status(200).send({user: user[0]})
})
};