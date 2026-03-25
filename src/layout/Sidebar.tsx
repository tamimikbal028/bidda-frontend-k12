import { NavLink, useLocation } from "react-router-dom";
import { FaComments, FaTrophy } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import authHooks from "../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const { user } = authHooks.useUser();

  const navigationItems = [
    {
      icon: FaTrophy,
      display: import.meta.env.VITE_COMPETITION === "true",
      label: "Competition",
      path: "/gaming",
      active: location.pathname.startsWith("/gaming"),
    },
    {
      icon: FaComments,
      display: import.meta.env.VITE_OPEN_DISCUSSION === "true",
      label: "Open Discussion",
      path: "/open-discussion",
      active: location.pathname.startsWith("/open-discussion"),
    },
    {
      icon: BsStars,
      display: import.meta.env.VITE_STUDY_HELPER === "true",
      label: "Study Helper AI",
      path: "/study-helper",
      active: location.pathname.startsWith("/study-helper"),
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-1 p-3">
      {/* Logo/Brand - Click to go Home */}
      <NavLink
        to="/"
        className="flex items-center gap-3 border-b border-gray-300 px-2 pb-3"
      >
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-teal-500 shadow-md">
          <span className="text-2xl font-bold text-white">O</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">
            Open Study
          </span>
        </div>
      </NavLink>

      {/* Navigation Menu */}
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        <nav className="space-y-1 py-4">
          {navigationItems.map((item, index) => {
            if (!item.display) {
              return null;
            }

            return (
              <NavLink
                key={index}
                to={item.path}
                className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-blue-50 font-semibold text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    item.active ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info (Minimal) */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <span className="text-xs font-bold">
              {user?.fullName?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex flex-col truncate">
            <span className="truncate text-sm font-medium text-gray-900">
              {user?.fullName || "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
