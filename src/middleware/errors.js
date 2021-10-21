export const catchAsync =
  (handler) =>
  (...args) =>
    handler(...args).catch(args[2]);

export const InternalServerError = (err, req, res, next) => {
  if (!err.status) {
    console.log(err.stack);
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
};
