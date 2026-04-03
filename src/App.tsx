import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ui/ErrorFallback";
import SkeletonGrid from "@/components/ui/SkeletonGrid";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
    },
  },
});

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-lavender py-8 px-4 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-5 w-28 bg-muted rounded mb-6" />
        <div className="h-24 gradient-header rounded-t-xl" />
        <div className="bg-card rounded-b-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4 md:w-2/5">
              <div className="w-48 h-48 rounded-full bg-muted" />
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="flex gap-6">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={(props) => <ErrorFallback {...props} />}>
              <ListPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <ErrorBoundary fallback={(props) => <ErrorFallback {...props} />}>
              <Suspense fallback={<DetailSkeleton />}>
                <DetailPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
