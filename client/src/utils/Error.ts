import type { ValidationError } from "express-validator";

class CustomValidationError extends Error {
  validation_errors: string[];
  constructor(message: string, errors: string[]) {
    super(message);
    console.log(errors);
    this.validation_errors = errors;
  }
}

class ServerError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export { CustomValidationError, ServerError };
