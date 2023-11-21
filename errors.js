exports.wrongPathError = (req, res) => {
res.status(404).send({ msg: "path not found"})
};

exports.psqlErrors = (err, req, res, next) => {
res.status(err.status).send({msg: err.msg})
};