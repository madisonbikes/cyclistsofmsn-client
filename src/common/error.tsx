import { useErrorBoundary, FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error }: FallbackProps) => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
      <pre>{error.stack}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
};
