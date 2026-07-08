import { ServerError } from "@/Error";
import ErrorWrapper from "./ErrorWrapper";
import type React from "react";

interface ErrorMessageProps {
  error: Error | ServerError;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (error instanceof ServerError) {
    console.log(error.status);
    console.log(error.message);
    return (
      <ErrorWrapper>
        {error.status}: {error.message}
      </ErrorWrapper>
    );
  }
}
