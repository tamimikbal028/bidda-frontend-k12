import { NavLink, useLocation } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaBell,
  FaVideo,
  FaLayerGroup,
  FaFolder,
  FaStore,
  FaChalkboardTeacher,
  FaSchool,
  FaBriefcase,
  FaComments,
  FaUserFriends,
  FaSearch,
  FaTrophy,
  FaUniversity,
  FaGraduationCap,
  FaChevronDown,
  FaChevronUp,
  FaCompass,
  FaEnvelope,
} from "react-icons/fa";
import { CgMoreVerticalO } from "react-icons/cg";
import { BsStars } from "react-icons/bs";
import authHooks from "../hooks/useAuth";
import { useState } from "react";

const Sidebar = () => {
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
      display: import.meta.env.VITE_COMPETITION === "true",
      label: "Competition",
      path: "/gaming",
      active: location.pathname.startsWith("/gaming"),
    },
    {
      icon: FaComments,
      display: import.meta.env.VITE_OPEN_DISCUSSION === "true",
      label: "Open Study",
      path: "/open-discussion",
      active: location.pathname.startsWith("/open-discussion"),
    },
    {
      icon: FaSchool,
      display: import.meta.env.VITE_CLASSROOM === "true",
      label: "ClassRoom",
      path: "/classroom",
      active: location.pathname.startsWith("/classroom"),
    },
    {
      icon: FaFolder,
      display: import.meta.env.VITE_FILES === "true",
      label: "Files & Archive",
      path: "/files",
      active: location.pathname.startsWith("/files"),
    },
    {
      icon: FaEnvelope,
      display: import.meta.env.VITE_MESSAGES === "true",
      label: "Messages",
      path: "/messages",
      active: location.pathname.startsWith("/messages"),
    },
    {
      icon: FaLayerGroup,
      display: import.meta.env.VITE_GROUPS === "true",
      label: "Groups",
      path: "/groups",
      active: location.pathname.startsWith("/groups"),
    },
    {
      icon: FaSearch,
      display: import.meta.env.VITE_SEARCH === "true",
      label: "Search",
      path: "/search",
      active: location.pathname.startsWith("/search"),
    },
    {
      icon: FaUniversity,
      display: import.meta.env.VITE_INSTITUTIONS === "true",
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
      display: import.meta.env.VITE_DEPARTMENTS === "true",
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
      icon: FaUserFriends,
      display: import.meta.env.VITE_FRIENDS === "true",
      label: "Friends",
      path: "/friends",
      active: location.pathname.startsWith("/friends"),
    },
    {
      icon: FaBell,
      display: import.meta.env.VITE_NOTIFICATIONS === "true",
      label: "Notifications",
      path: "/notifications",
      active: location.pathname.startsWith("/notifications"),
      badge: 5,
    },
    {
      icon: BsStars,
      display: import.meta.env.VITE_STUDY_HELPER === "true",
      label: "Study Helper AI",
      path: "/study-helper",
      active: location.pathname.startsWith("/study-helper"),
    },
    {
      icon: FaBriefcase,
      display: import.meta.env.VITE_CAREER_HUB === "true",
      label: "Career Hub",
      path: "/career-hub",
      active: location.pathname.startsWith("/career-hub"),
    },
    {
      icon: FaStore,
      display: import.meta.env.VITE_STORE === "true",
      label: "Student Store",
      path: "/store",
      active: location.pathname.startsWith("/store"),
    },
    {
      icon: FaChalkboardTeacher,
      display: import.meta.env.VITE_TUITION === "true",
      label: "Tuition",
      path: "/tuition",
      active: location.pathname.startsWith("/tuition"),
    },
    {
      icon: FaVideo,
      display: import.meta.env.VITE_VIDEOS === "true",
      label: "Videos",
      path: "/videos",
      active: location.pathname.startsWith("/videos"),
    },
    {
      icon: CgMoreVerticalO,
      display: import.meta.env.VITE_MORE === "true",
      label: "More",
      path: "/more",
      active: location.pathname.startsWith("/more"),
    },
    {
      icon: FaCog,
      display: import.meta.env.VITE_SETTINGS === "true",
      label: "Settings",
      path: "/settings",
      active: location.pathname.startsWith("/settings"),
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-1 p-3">
      {/* Logo/Brand - Click to go Home */}
      <NavLink
        to="/"
        className="flex items-center gap-3 border-b border-gray-300 px-2 pb-3"
      >
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-md">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">SocialHub</span>
          <span className="text-sm text-gray-500">Connect & Learn</span>
        </div>
      </NavLink>

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
                {item.badge && (
                  <span
                    className={`rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Profile & Logout Section */}
      {import.meta.env.VITE_PROFILE === "true" && (
        <div className="border-t border-gray-300 pt-3">
          <div className="flex items-center gap-2">
            <NavLink
              to={profilePath}
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
