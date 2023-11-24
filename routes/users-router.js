const { getAllUsers, getUserByUsername } = require("../db/controllers/users.controller");
const usersRouter = require("express").Router();

usersRouter
.route("/")
.get(getAllUsers)

usersRouter
.route("/:username")
.get(getUserByUsername)

module.exports = usersRouter