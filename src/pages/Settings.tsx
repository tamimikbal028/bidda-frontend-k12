import { FaSignOutAlt } from "react-icons/fa";
import authHooks from "@/hooks/useAuth";

const Settings = () => {
  const { mutate: logout, isPending: isLoggingOut } = authHooks.useLogout();

  const handleSignOut = () => {
    logout();
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Logout Section */}
      <div className="w-fit rounded-lg bg-white p-3 shadow-sm">
        <button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="flex w-full cursor-pointer items-center space-x-3 rounded-lg border border-gray-200 px-3 py-2 text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
        >
          <FaSignOutAlt />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </>
  );
};

export default Settings;
