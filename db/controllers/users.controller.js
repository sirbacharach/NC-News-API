const { selectAllUsers } = require("../models/users.model");


exports.getAllUsers = (req, res, next) =>{
    console.log("you are in controller")
    return selectAllUsers()
    .then((allUsers) => {
        console.log(allUsers)
    })
    .catch(next)
};