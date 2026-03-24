
import { NavLink, useParams } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { CgMoreVerticalO } from "react-icons/cg";

const InstitutionNavBar = () => {
  const { instId } = useParams<{ instId: string }>();
  const baseUrl = `/institutions/${instId}`;

  const tabs = [
    { path: baseUrl, label: "Feed", icon: BsPostcard, end: true },
    {
      path: `${baseUrl}/departments`,
      label: "Departments",
      icon: FaGraduationCap,
    },
    { path: `${baseUrl}/about`, label: "About", icon: TbListDetails },
    { path: `${baseUrl}/more`, label: "More", icon: CgMoreVerticalO },
  ];

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between overflow-x-auto px-15 whitespace-nowrap">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            replace={true}
            className={({ isActive }) =>
              `flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default InstitutionNavBar;
