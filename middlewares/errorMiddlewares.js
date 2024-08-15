//When route is not found, then it will give us the error not found and the requested url.
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  //This one is for general purpose error. It sees what error is thrown by the server and converts it in strcutred format.
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  //we dont want stack if application is in production mode.
  module.exports = { notFound, errorHandler };