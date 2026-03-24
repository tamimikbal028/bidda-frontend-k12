import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import { routes, getRouteByPath } from "../routes/routeConfig";
import PageLoader from "../pages/Fallbacks/PageLoader";
// Idle prefetch logic removed

const MainContent = () => {
  const location = useLocation();

  // Update document title based on current route
  useEffect(() => {
    const currentRoute = getRouteByPath(location.pathname);
    if (currentRoute?.title) {
      document.title = currentRoute.title;
    }
  }, [location.pathname]);

  // Idle prefetch logic removed

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map((route, idx) => {
          const { path, Component, requireAuth, display } = route;

          if (!display) {
            return null;
          }

          return (
            <Route
              key={idx}
              path={path}
              element={
                <ProtectedRoute requireAuth={requireAuth}>
                  <Component />
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default MainContent;
