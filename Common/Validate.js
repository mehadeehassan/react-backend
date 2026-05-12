//validator function section
const validate = (validations) => {
  return async (req, res, next) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          data: req.body,
          errors: result.array().map((error) => ({
            field: error.path,
            message: error.msg,
          })),
          metadata: {
            timestamps: new Date(),
          },
        });
      }
    }
    next();
  };
};
module.exports = validate;
