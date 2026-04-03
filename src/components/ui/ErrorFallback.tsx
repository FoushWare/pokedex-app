import { useQueryClient } from '@tanstack/react-query';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.resetQueries();
    resetErrorBoundary();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-8">
      <div className="text-5xl">😵</div>
      <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
      <p className="text-muted-foreground text-center max-w-md">
        {error.message || 'Please try again.'}
      </p>
      <button
        onClick={handleRetry}
        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Retry
      </button>
    </div>
  );
}
