import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import Button from "@/components/Button";
import type React from "react";

export default function BoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="w-1/2 m-auto p-10" role="alert">
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
          <Button type="button" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </div>
      )}
      onError={(error, info) => {
        // Log the error to your error reporting service
      }}
      onReset={() => {
        // Reset any state that may have caused the error
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
