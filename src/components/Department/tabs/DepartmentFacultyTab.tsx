import DepartmentFacultyCard from "../DepartmentFacultyCard";
import FriendCardSkeleton from "../../Shared/skeletons/FriendCardSkeleton";
import departmentHooks from "../../../hooks/useDepartment";
import EmptyState from "../../Shared/EmptyState";
import { FiRefreshCw } from "react-icons/fi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "sonner";
import { DEPARTMENT_ROLES } from "../../../constants";

const DepartmentFacultyTab = () => {
  const { deptId } = useParams<{ deptId: string }>();
  const [email, setEmail] = useState("");
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = departmentHooks.useDepartmentFaculty();

  const { mutate: addFaculty, isPending: isAdding } =
    departmentHooks.useAddFaculty();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <FriendCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    toast.error("Failed to load Department faculty");
    return (
      <div className="flex w-full items-center justify-center border p-10">
        <button
          className="flex cursor-pointer items-center gap-2 rounded-lg border bg-gray-100 px-4 py-2 hover:bg-gray-200"
          onClick={() => window.location.reload()}
        >
          <FiRefreshCw /> <span>Refresh</span>
        </button>
      </div>
    );
  }

  const faculties = data.pages.flatMap((page) => page.data.faculties);
  const totalDocs = data.pages[0].data.pagination.totalDocs;
  const currentUserRole = data.pages[0].data.meta.currentUserRole;
  const isOwner = currentUserRole === DEPARTMENT_ROLES.OWNER;

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !deptId) return;
    addFaculty(
      { deptId, email },
      {
        onSuccess: () => setEmail(""),
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Add Faculty Form (Owner Only) */}
      {isOwner && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 text-sm font-medium text-gray-700">
            Add Faculty Member
          </h3>
          <form onSubmit={handleAddFaculty} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter user's email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={isAdding}
              className="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add Faculty"}
              <FaUserPlus className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* list of faculties */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Faculty Members ({totalDocs})
        </h2>

        {faculties.length > 0 ? (
          <div className="space-y-3">
            {faculties.map((item) => (
              <DepartmentFacultyCard
                key={item.faculty._id}
                faculty={item.faculty}
                meta={item.meta}
                currentUserRole={currentUserRole}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="👨‍🏫"
            title="No faculty members"
            description="No faculty members found in this department"
            size="lg"
          />
        )}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DepartmentFacultyTab;
