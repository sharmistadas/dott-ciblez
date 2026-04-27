/**
 * Validation middleware factory
 * Accepts a schema object with field validators and returns Express middleware
 */
const validate = (schema) => {
  return (req, _res, next) => {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors.push(`${field} is required`);
        continue;
      }

      if (value && rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }

      if (value && rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} must not exceed ${rules.maxLength} characters`);
      }

      if (value && rules.isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push(`${field} must be a valid email`);
        }
      }
    }

    if (errors.length > 0) {
      const error = new Error(errors.join(', '));
      error.statusCode = 400;
      return next(error);
    }

    next();
  };
};

module.exports = { validate };
