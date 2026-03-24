import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "./layout/Sidebar";
import SidebarRight from "./layout/SidebarRight";
import MainContent from "./layout/MainContent";
import authHooks from "./hooks/useAuth";
import { AUTH_KEYS } from "./constants";
import Navbar from "./layout/Navbar";
import AuthLoading from "./components/Shared/AuthLoading";

const App = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { isCheckingAuth, isAuthenticated } = authHooks.useUser();

  // Global logout event listener
  // Axios interceptor fires this when all tokens expire
  useEffect(() => {
    const handleLogout = () => {
      console.log("Global logout event received");
      // Clear user data in cache
      queryClient.setQueryData([AUTH_KEYS.CURRENT_USER], null);
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [queryClient]);

  const isMessagesPage = location.pathname === "/messages";
  const isStudyHelperPage = location.pathname === "/study-helper";

  if (isCheckingAuth) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <MainContent />
      </div>
    );
  }

  return (
    <div className="grid h-screen grid-cols-[15rem_1fr_auto] overflow-hidden">
      <div className="h-full overflow-y-auto bg-gray-50">
        <Sidebar />
      </div>

      <div className="h-full overflow-y-auto">
        <div
          className={
            isMessagesPage || isStudyHelperPage ? "mx-5" : "mx-auto w-[750px]"
          }
        >
          <div className="sticky top-0 z-50 hidden">
            <Navbar />
          </div>
          <div className="space-y-5 py-5">
            <MainContent />
          </div>
        </div>
      </div>

      <div className="hidden h-full w-75 overflow-y-auto border-l border-gray-500 bg-white">
        <SidebarRight />
      </div>
    </div>
  );
};

export default App;
