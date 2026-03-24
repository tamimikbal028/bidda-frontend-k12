import { NavLink } from "react-router-dom";
import { FaEnvelope, FaHome, FaBullhorn } from "react-icons/fa";
import authHooks from "../hooks/useAuth";
import { USER_TYPES } from "../constants";

const Navbar = () => {
  const { user, isAuthenticated } = authHooks.useUser();

  if (!isAuthenticated) {
    return null; // Don't show navbar if not authenticated
  }

  const isTeacher = user?.userType === USER_TYPES.TEACHER;

  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    // CR Corner - hidden for teachers
    ...(!isTeacher
      ? [{ to: "/cr-corner", icon: FaBullhorn, label: "CR Corner" }]
      : []),

    { to: "/messages", icon: FaEnvelope, label: "Messages", badge: 2 },
  ];

  return (
    <nav className="flex h-12 w-full items-center justify-evenly border-b border-gray-200 bg-white shadow-sm">
      {/* 4 buttons with map */}
      {navItems.map(({ to, icon: Icon, label, badge }) => (
        <div key={to} className="group relative">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-2 rounded-lg p-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="hidden text-sm font-medium md:block">{label}</span>
            {badge && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {badge}
              </span>
            )}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
