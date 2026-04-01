import { NavLink, useParams } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

const DepartmentNavBar = () => {
  const { deptId } = useParams();
  const baseUrl = `/departments/${deptId}`;

  const tabs = [
    {
      path: `${baseUrl}/faculty`,
      label: "Faculty",
      icon: FaUserTie,
      end: true,
    },
    { path: `${baseUrl}/details`, label: "Details", icon: TbListDetails },
  ];

  return (
    <div className="bg-white">
      <div className="no-scrollbar flex items-center justify-evenly overflow-x-auto px-4 whitespace-nowrap">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `text flex items-center gap-2 border-b-2 px-4 py-4 font-semibold transition-colors ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`
            }
          >
            <tab.icon className="h-6 w-6" />
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DepartmentNavBar;
