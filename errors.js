exports.wrongPathError = (req, res) => {
  res.status(404).send({ msg: "path not found" });
};

exports.psqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid input" });
  } else next(err);
};

exports.customErrors = (err, req, res, next) => {
  if (err) {
    const { status, msg } = err;
    res.status(status).send({msg: msg})
  }
};