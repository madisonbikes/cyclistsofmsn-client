import { useErrorBoundary, FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error }: FallbackProps) => {
  const { resetBoundary } = useErrorBoundary();
  if (error instanceof Error) {
    return (
      <div role="alert">
        <p>Something went wrong: {error.message}</p>
        <pre>{error.stack}</pre>
        <button onClick={resetBoundary}>Try again</button>
      </div>
    );
  } else {
    return (
      <div role="alert">
        <p>Something went wrong: {error}</p>
        <button onClick={resetBoundary}>Try again</button>
      </div>
    );
  }
};
