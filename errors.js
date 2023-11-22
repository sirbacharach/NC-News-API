exports.wrongPathError = (req, res) => {
  res.status(404).send({ msg: "path not found" });
};

exports.psqlErrors = (err, req, res, next) => {
  if (err.code === "23503" || err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
};
