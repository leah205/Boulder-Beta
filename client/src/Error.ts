import type { ValidationError } from "express-validator";

class CustomValidationError extends Error {
  validation_errors: string[];
  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.validation_errors = errors.map((error) => error.msg);
  }
}

export { CustomValidationError };
