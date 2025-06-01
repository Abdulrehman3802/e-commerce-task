const apiResponse = {
  success: (res, data = {}, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, error = "Something went wrong", statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message: typeof error === "string" ? error : error.message || "Error",
      error: error?.stack || null,
    });
  },
};

module.exports = apiResponse;