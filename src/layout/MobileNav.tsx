import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaTrophy, FaComments, FaCog } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { FEATURE_FLAGS } from "@/constants";

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: FaHome,
      path: "/",
      active: location.pathname === "/",
    },
    {
      icon: FaTrophy,
      display: FEATURE_FLAGS.COMPETITION,
      path: "/gaming",
      active: location.pathname.startsWith("/gaming"),
    },
    {
      icon: FaComments,
      display: FEATURE_FLAGS.OPEN_DISCUSSION,
      path: "/open-discussion",
      active: location.pathname.startsWith("/open-discussion"),
    },
    {
      icon: BsStars,
      display: FEATURE_FLAGS.STUDY_HELPER,
      path: "/study-helper",
      active: location.pathname.startsWith("/study-helper"),
    },
    {
      icon: FaCog,
      display: FEATURE_FLAGS.SETTINGS,
      path: "/settings",
      active: location.pathname.startsWith("/settings"),
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between">
        {navItems.map((item, index) => {
          if (item.display === false) return null;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                item.active
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default MobileNav;
