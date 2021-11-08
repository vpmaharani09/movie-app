const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";

  if (err.name === "NOTFOUND") {
    code = 404;
    msg = err.msg;
  } else if (err.name === "FORBIDDEN") {
    code = 403;
    msg = err.msg;
  } else if (err.name === "NOTAUTHORIZED") {
    code = 401;
    msg = err.msg;
  } else if (err.name === "BADREQUEST") {
    code = 400;
    msg = err.msg;
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((el) => {
      return el.message;
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "Username is already exists";
  }
  res.status(code).json({ msg });
};

module.exports = { errorHandler };
