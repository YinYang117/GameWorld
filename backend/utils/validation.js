const { validationResult } = require('express-validator');

// formatting errors from express-validator middleware
// to customize, use express-validator docs
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request: Validation Errors.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request: Validation Errors.';
    next(err);
  }
  next();
};

module.exports = { handleValidationErrors };