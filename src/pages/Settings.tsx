import { FaSignOutAlt } from "react-icons/fa";
import authHooks from "../hooks/useAuth";
import AccountSettings from "../components/Settings/AccountSettings";
import PrivacySettings from "../components/Settings/PrivacySettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
import AppearanceSettings from "../components/Settings/AppearanceSettings";
import SupportSettings from "../components/Settings/SupportSettings";

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
      <div className="w-fit rounded-lg bg-white shadow-sm">
        <button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="flex cursor-pointer items-center space-x-3 p-5 text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
        >
          <FaSignOutAlt />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      <div className="hidden space-y-5">
        <AccountSettings />
        <PrivacySettings />
        <NotificationSettings />
        <AppearanceSettings />
        <SupportSettings />
      </div>
    </>
  );
};

export default Settings;
