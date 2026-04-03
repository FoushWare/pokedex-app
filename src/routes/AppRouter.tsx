import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ui/ErrorFallback";
import DetailSkeleton from "@/components/skeletons/DetailSkeleton";

// Lazy loading pages for better splitting
const ListPage = lazy(() => import("@/pages/ListPage"));
const DetailPage = lazy(() => import("@/pages/DetailPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={(props) => <ErrorFallback {...props} />}>
              <Suspense fallback={<div className="min-h-screen bg-[#F8FBFF]" />}>
                <ListPage />
              </Suspense>
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
  );
}
