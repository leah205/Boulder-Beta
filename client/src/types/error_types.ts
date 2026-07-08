// export type ValidationErrorType = Error & {
//   validation_errors: string[];
// };

type ServerErrorType = Error & {
  status: number;
};

export type { ServerErrorType };
