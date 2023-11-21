exports.wrongPathError = (req, res) => {
  res.status(404).send({ msg: "path not found" });
};

exports.psqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else next(err)
};

exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
}