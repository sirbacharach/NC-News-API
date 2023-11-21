const express = require("express")
const { getAllTopics, getAllArticles } = require("./db/controllers/topics.controller")
const { wrongPathError } = require("./errors")
const app = express()

app.get("/api/topics", getAllTopics)
app.get("/api/articles", getAllArticles)
app.get("*", wrongPathError)

module.exports = app