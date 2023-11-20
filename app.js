const express = require("express")
const { getAllTopics } = require("./db/controllers/topics.controller")
const { wrongPathError } = require("./errors")
const app = express()

app.get("/api/topics", getAllTopics)
app.get("*", wrongPathError)

module.exports = app