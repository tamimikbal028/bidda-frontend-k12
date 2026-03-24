import departmentHooks from "../../../hooks/useDepartment";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";

const DepartmentAbout = () => {
  const { data: detailsResponse, isLoading } =
    departmentHooks.useDepartmentDetails();
  const department = detailsResponse?.data.department;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="py-20 text-center text-gray-500">
        Failed to load department details
      </div>
    );
  }

  // Get institution name
  const institutionName =
    typeof department.institution === "string"
      ? "Institution"
      : department.institution?.name || "Institution";

  return (
    <div className="space-y-3">
      {/* Top Stats Grid */}
      <div className="flex justify-between gap-3">
        {[
          { label: "Total Posts", value: department.postsCount },
          { label: "Students", value: department.studentsCount },
          { label: "Followers", value: department.followersCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="w-full rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full gap-3">
        <div className="w-full space-y-3">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <FaGraduationCap className="text-blue-600" />
              {department.name}
            </h3>

            <div className="mt-5 flex flex-col gap-x-3 gap-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Department Code
                </span>
                <p className="flex items-center gap-2 font-semibold text-gray-900 uppercase">
                  <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                    {department.code}
                  </span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Institution
                </span>
                <p className="font-semibold text-gray-900">{institutionName}</p>
              </div>

              {department.location && (
                <div className="space-y-1">
                  <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Location
                  </span>
                  <p className="flex items-center gap-2 font-semibold text-gray-900">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {department.location}
                  </p>
                </div>
              )}

              {department.establishedYear && (
                <div className="space-y-1">
                  <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Established
                  </span>
                  <p className="flex items-center gap-2 font-semibold text-gray-900">
                    <FaCalendarAlt className="text-gray-400" />
                    {department.establishedYear}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {department.description && (
              <div className="mt-8">
                <h4 className="mb-3 text-sm font-bold tracking-wider text-gray-400 uppercase">
                  Description
                </h4>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>{department.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          {((department.contactEmails && department.contactEmails.length > 0) ||
            (department.contactPhones &&
              department.contactPhones.length > 0)) && (
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="border-b border-gray-50 pb-4 text-lg font-bold text-gray-900">
                Contact Information
              </h3>
              <div className="mt-4 space-y-4">
                {department.contactEmails?.map((email, index) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <FaGlobe />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900">Email</p>
                      <p className="truncate text-xs text-blue-600">{email}</p>
                    </div>
                  </a>
                ))}
                {department.contactPhones?.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <FaGlobe />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900">Phone</p>
                      <p className="truncate text-xs text-gray-600">{phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentAbout;
