import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FaBars } from "react-icons/fa";
import Sidebar from "./layout/Sidebar";
import SidebarRight from "./layout/SidebarRight";
import MainContent from "./layout/MainContent";
import authHooks from "./hooks/useAuth";
import { AUTH_KEYS } from "./constants";
import AuthLoading from "./components/Shared/AuthLoading";

const App = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const isStudyHelperPage = location.pathname === "/study-helper";

  if (isCheckingAuth) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4">
        <MainContent />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden md:grid md:grid-cols-[15rem_1fr_auto]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-600 shadow-md hover:bg-gray-100 md:hidden"
        aria-label="Open menu"
      >
        <FaBars className="h-5 w-5" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden h-full overflow-y-auto bg-gray-50 md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-72 bg-white shadow-xl">
            <Sidebar isMobile onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <div
          className={
            isStudyHelperPage
              ? "mx-4 md:mx-5"
              : "mx-4 max-w-full md:mx-auto md:w-[750px]"
          }
        >
          <div className="space-y-5 py-4 md:py-5">
            <MainContent />
          </div>
        </div>
      </div>

      <div className="hidden h-full w-75 overflow-y-auto border-l border-gray-500 bg-white xl:block">
        <SidebarRight />
      </div>
    </div>
  );
};

export default App;
