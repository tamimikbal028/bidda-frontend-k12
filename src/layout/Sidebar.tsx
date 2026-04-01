import { NavLink, useLocation } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaComments,
  FaTrophy,
  FaUniversity,
  FaGraduationCap,
  FaChevronDown,
  FaChevronUp,
  FaCompass,
  FaTimes,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import authHooks from "../hooks/useAuth";
import { useState } from "react";
import { FEATURE_FLAGS } from "../constants";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, meta } = authHooks.useUser();

  // Dynamic profile path - uses username
  const profilePath = user?.userName ? `/profile/${user.userName}` : "/profile";

  // State for expandable menus
  const [isInstitutionOpen, setIsInstitutionOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  // Checks for memberships
  const institution = meta?.institution;
  const department = meta?.department;

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
      icon: FaUniversity,
      display: FEATURE_FLAGS.INSTITUTIONS,
      label: "Institutions",
      isExpandable: true,
      isOpen: isInstitutionOpen,
      setOpen: setIsInstitutionOpen,
      subItems: [
        {
          label: "My Institution",
          path: institution
            ? `/institutions/${institution._id}`
            : "/my-institution",
          icon: FaUniversity,
          active:
            institution &&
            location.pathname.startsWith(`/institutions/${institution._id}`),
        },
        {
          label: "Discovery",
          path: "/institutions",
          icon: FaCompass,
          active: location.pathname === "/institutions",
        },
      ],
      active: location.pathname.startsWith("/institutions"),
    },
    {
      icon: FaGraduationCap,
      display: FEATURE_FLAGS.DEPARTMENTS,
      label: "Departments",
      isExpandable: true,
      isOpen: isDepartmentOpen,
      setOpen: setIsDepartmentOpen,
      subItems: [
        {
          label: "My Department",
          path: department
            ? `/departments/${department._id}`
            : "/my-department",
          icon: FaGraduationCap,
          active:
            department &&
            location.pathname.startsWith(`/departments/${department._id}`),
        },
        {
          label: "Discovery",
          path: "/departments",
          icon: FaCompass,
          active: location.pathname === "/departments",
        },
      ],
      active: location.pathname.startsWith("/departments"),
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

            if (item.isExpandable) {
              return (
                <div key={index} className="space-y-1">
                  <button
                    onClick={() => item.setOpen(!item.isOpen)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      item.active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-blue-100 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-colors ${
                          item.active ? "text-blue-600" : "text-gray-500"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.isOpen ? (
                      <FaChevronUp className="h-3 w-3" />
                    ) : (
                      <FaChevronDown className="h-3 w-3" />
                    )}
                  </button>

                  {item.isOpen && item.subItems && (
                    <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                      {item.subItems.map((sub, subIdx) => (
                        <NavLink
                          key={subIdx}
                          to={sub.path}
                          onClick={isMobile && onClose ? onClose : undefined}
                          className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            sub.active
                              ? "bg-blue-50 font-semibold text-blue-600"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <sub.icon
                            className={`mr-3 h-4 w-4 ${
                              sub.active ? "text-blue-600" : "text-gray-400"
                            }`}
                          />
                          <span>{sub.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
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

      {/* Profile & Logout Section */}
      {FEATURE_FLAGS.PROFILE && (
        <div className="border-t border-gray-300 pt-3">
          <div className="flex items-center gap-2">
            <NavLink
              to={profilePath}
              onClick={isMobile && onClose ? onClose : undefined}
              className={({ isActive }) =>
                `group flex flex-1 items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FaUser className="mr-3 h-5 w-5" />
              <span>Profile</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
