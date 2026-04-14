import { NavLink, useLocation } from "react-router-dom";
import {
  FaCog,
  FaTrophy,
  FaComments,
  FaTimes,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FEATURE_FLAGS } from "@/constants";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      icon: FaTrophy,
      display: FEATURE_FLAGS.COMPETITION,
      label: "Competition",
      path: "/gaming",
      active: location.pathname.startsWith("/gaming"),
    },
    {
      icon: FaComments,
      display: FEATURE_FLAGS.OPEN_DISCUSSION,
      label: "Open Discussion",
      path: "/open-discussion",
      active: location.pathname.startsWith("/open-discussion"),
    },
    {
      icon: BsStars,
      display: FEATURE_FLAGS.STUDY_HELPER,
      label: "Study Helper",
      path: "/study-helper",
      active: location.pathname.startsWith("/study-helper"),
    },
    {
      icon: FaCog,
      display: FEATURE_FLAGS.SETTINGS,
      label: "Settings",
      path: "/settings",
      active: location.pathname.startsWith("/settings"),
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-1 p-3">
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="flex items-center justify-between border-b border-gray-300 px-2 pb-3">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Logo/Brand - Click to go Home */}
      {!isMobile && (
        <NavLink
          to="/"
          className="flex items-center gap-3 border-b border-gray-300 px-2 pb-3"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-md">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">
              SocialHub
            </span>
            <span className="text-sm text-gray-500">Connect & Learn</span>
          </div>
        </NavLink>
      )}

      {/* Navigation Menu */}
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {navigationItems.map((item, index) => {
            if (!item.display) {
              return null;
            }

            return (
              <NavLink
                key={index}
                to={item.path || "#"}
                onClick={isMobile && onClose ? onClose : undefined}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      item.active
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-gray-900"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
