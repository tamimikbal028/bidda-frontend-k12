import { NavLink } from "react-router-dom";

const GamingHeader = () => {
  const tabs = [
    { path: "/gaming", label: "Dashboard", end: true },
    { path: "/gaming/tournament", label: "Tournament" },
    { path: "/gaming/play", label: "Play" },
    { path: "/gaming/leaderboard", label: "Leaderboard" },
    { path: "/gaming/achievements", label: "Achievements" },
  ];

  return (
    <div className="flex justify-between">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.end}
          className={({ isActive }) =>
            `cursor-pointer rounded-md px-5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-500 hover:text-black"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default GamingHeader;
