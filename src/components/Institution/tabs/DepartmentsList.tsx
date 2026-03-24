import institutionHooks from "../../../hooks/useInstitution";
import DepartmentCardComponent from "../../Department/DepartmentCard";

const DepartmentsList = () => {
  const { data, isLoading } = institutionHooks.useInstitutionDepartments();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl bg-white py-20 text-center shadow-sm">
        <p className="text-gray-500">No departments found.</p>
      </div>
    );
  }

  const departments = data.data.departments;

  return (
    <div className="space-y-4">
      <h2 className="px-1 text-lg font-bold text-gray-900">Departments</h2>
      <div className="space-y-3">
        {departments.map((dept) => (
          <DepartmentCardComponent
            key={dept._id}
            dept={dept}
            usedInInst={true}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentsList;
