import { ServerError } from "@/utils/Error";
import ErrorWrapper from "./ErrorWrapper";
import type React from "react";

interface ErrorMessageProps {
  error: Error | ServerError;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (error instanceof ServerError) {
    return (
      <ErrorWrapper>
        {error.status}: {error.message}
      </ErrorWrapper>
    );
  } else {
    return <ErrorWrapper>{error.message}</ErrorWrapper>;
  }
}
