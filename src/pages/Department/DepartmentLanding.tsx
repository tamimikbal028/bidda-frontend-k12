import { useState } from "react";
import { FaSearch, FaGraduationCap } from "react-icons/fa";
import DepartmentCard from "../../components/Department/DepartmentCard";
import departmentHooks from "../../hooks/useDepartment";
import RefreshPage from "../../components/Shared/errors/RefreshPage";

const DepartmentLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: followedData, isLoading: isLoadingFollowed } =
    departmentHooks.useFollowedDepartments();

  const { data: searchResults, isLoading: isLoadingSearch } =
    departmentHooks.useSearchDepartments(searchQuery);

  if (isLoadingFollowed || !followedData) return <RefreshPage />;

  const followedDepartments = followedData.data.departments;

  return (
    <>
      {/* Search Section */}
      <div className="space-y-3">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Departments
          </h1>
          <p className="mt-2 text-gray-500">
            Discover academic departments and specialized communities
          </p>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="flex items-center rounded-2xl border-2 border-gray-100 bg-white px-5 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50/50">
            <FaSearch className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Department name or Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent py-4 pl-4 text-lg text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.length > 1 && (
            <div className="absolute top-full right-0 left-0 z-20 mt-3 max-h-[400px] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
              {isLoadingSearch ? (
                <div className="flex items-center justify-center py-10">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                </div>
              ) : searchResults?.data.departments?.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {searchResults.data.departments.map((dept) => (
                    <DepartmentCard key={dept._id} dept={dept} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm font-medium text-gray-500">
                  No departments found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Departments You Follow */}
      {!searchQuery && (
        <div className="space-y-3 rounded-2xl bg-[#f8fafc] px-3 py-5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900">
              Departments You Follow
            </h2>
            {followedDepartments.length > 0 && (
              <span className="text-sm font-medium text-gray-500">
                {followedDepartments.length} followed
              </span>
            )}
          </div>

          {isLoadingFollowed ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-gray-200"
                ></div>
              ))}
            </div>
          ) : followedDepartments.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {followedDepartments.map((dept) => (
                <DepartmentCard key={dept._id} dept={dept} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                <FaGraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Not following any departments yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Join or follow departments to see their updates here.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DepartmentLanding;
