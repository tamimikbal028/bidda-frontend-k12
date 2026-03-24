import { FaChevronRight, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { MiniDepartment } from "../../types";

interface DepartmentCardProps {
  dept: MiniDepartment;
  usedInInst?: boolean;
}

const DepartmentCard = ({ dept, usedInInst }: DepartmentCardProps) => {
  return (
    <Link
      key={dept._id}
      to={`/departments/${dept._id}`}
      className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          {dept.logo ? (
            <img
              src={dept.logo}
              alt={dept.name}
              className="h-full w-full rounded-lg object-contain"
            />
          ) : (
            <FaGraduationCap className="h-6 w-6" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {dept.name}
          </h3>
          <p className="text-sm font-semibold text-gray-500">
            {dept.code} {usedInInst ? "" : `- ${dept.institution.name}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-lg font-bold text-gray-900">
            {dept.studentsCount}
          </span>
          <span className="text-sm font-medium">
            {dept.studentsCount <= 1 ? "Student" : "Students"}
          </span>
        </div>
        <FaChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default DepartmentCard;
