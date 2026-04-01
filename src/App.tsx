import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MobileNav from "./layout/MobileNav";
import Sidebar from "./layout/Sidebar";
import SidebarRight from "./layout/SidebarRight";
import MainContent from "./layout/MainContent";
import authHooks from "./hooks/useAuth";
import { AUTH_KEYS } from "./constants";
import AuthLoading from "./components/Shared/AuthLoading";

const App = () => {
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
      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Desktop Sidebar */}
      <div className="hidden h-full overflow-y-auto bg-gray-50 md:block">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <div className="mx-4 max-w-full md:mx-auto md:w-[750px]">
          <div className="space-y-5 border py-4 md:py-5">
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
