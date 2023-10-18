// Create a middleware for error handling
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Determine the status code based on the type of error
  let statusCode = 500;
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Handle JSON parsing error
    statusCode = 400;
  }

  // Send the error response
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};

module.exports = errorHandler;
