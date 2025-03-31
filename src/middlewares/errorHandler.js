// Centralized Error Handling

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    success: false,
    message: err.message || "Internal Server Error",
  });
};
// Export the error handler middleware
export default errorHandler;
