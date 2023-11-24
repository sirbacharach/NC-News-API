const { getAllUsers } = require("../db/controllers/users.controller");
const usersRouter = require("express").Router();

usersRouter
.route("/")
.get(getAllUsers)

module.exports = usersRouter