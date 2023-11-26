const express = require("express");
const { wrongPathError, psqlErrors, customErrors } = require("./errors");
const apiRouter = require("./routes/api-router");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);
app.get("*", wrongPathError);
app.use(psqlErrors);
app.use(customErrors);

module.exports = app;
