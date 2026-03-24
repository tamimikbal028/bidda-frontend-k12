import { NavLink, useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaUserShield, FaUserMinus, FaUserPlus } from "react-icons/fa";
import FriendshipActionButtons from "../Shared/friends/FriendshipActionButtons";
import confirm from "../../utils/sweetAlert";
import { DEPARTMENT_ROLES } from "../../constants/department";
import type { DepartmentFaculty, DepartmentFacultyMeta } from "../../types";
import departmentHooks from "../../hooks/useDepartment";
import dropdownHooks from "../../hooks/useDropdown";
import RoleBadge from "../Shared/RoleBadge";

interface DepartmentFacultyCardProps {
  faculty: DepartmentFaculty;
  meta: DepartmentFacultyMeta;
  currentUserRole: string;
}

const DepartmentFacultyCard = ({
  faculty,
  meta,
  currentUserRole,
}: DepartmentFacultyCardProps) => {
  const { deptId } = useParams<{ deptId: string }>();

  const isOwner = currentUserRole === DEPARTMENT_ROLES.OWNER;

  const {
    isOpen: showMenu,
    openUpward,
    menuRef,
    triggerRef: buttonRef,
    toggle: toggleMenu,
    close: closeMenu,
  } = dropdownHooks.useDropdown();

  // Role management mutations
  const { mutate: promoteToModerator } =
    departmentHooks.usePromoteToModerator();
  const { mutate: promoteToAdmin } = departmentHooks.usePromoteToAdmin();
  const { mutate: demoteToModerator } = departmentHooks.useDemoteToModerator();
  const { mutate: demoteToMember } = departmentHooks.useDemoteToMember();
  const { mutate: removeFromFaculty } = departmentHooks.useRemoveFromFaculty();

  // Role management handlers
  const handlePromoteToAdmin = () => {
    closeMenu();
    if (deptId) promoteToAdmin({ deptId, userId: faculty._id });
  };

  const handlePromoteToModerator = () => {
    closeMenu();
    if (deptId) promoteToModerator({ deptId, userId: faculty._id });
  };

  const handleDemoteToModerator = () => {
    closeMenu();
    if (deptId) demoteToModerator({ deptId, userId: faculty._id });
  };

  const handleDemoteToMember = () => {
    closeMenu();
    if (deptId) demoteToMember({ deptId, userId: faculty._id });
  };

  const handleRemoveFromFaculty = async () => {
    closeMenu();
    const ok = await confirm({
      title: "Remove from Faculty?",
      text: `${faculty.fullName} will be removed from faculty list but will remain as a follower.`,
      confirmButtonText: "Yes, remove",
      icon: "warning",
    });
    if (ok && deptId) {
      removeFromFaculty({ deptId, userId: faculty._id });
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 rounded-lg border p-2 shadow-sm ${
        meta.user_relation_status === "SELF"
          ? "border-blue-200 bg-blue-50"
          : "border-gray-300 bg-white"
      }`}
    >
      <NavLink to={`/profile/${faculty.userName}`}>
        <img
          src={faculty.avatar}
          alt={faculty.fullName}
          className="h-10 w-10 rounded-full object-cover transition-opacity hover:opacity-80"
        />
      </NavLink>
      <div className="flex-1">
        <h3 className="flex items-center gap-2">
          <NavLink
            to={`/profile/${faculty.userName}`}
            className="font-medium text-gray-800 transition-colors hover:text-blue-600 hover:underline"
          >
            {faculty.fullName}
          </NavLink>
          {meta.role && <RoleBadge role={meta.role} />}
        </h3>
      </div>

      <div className="flex items-center gap-2">
        {/* Friendship action buttons */}
        {!meta.isSelf && (
          <FriendshipActionButtons
            userId={faculty._id}
            user_relation_status={meta.user_relation_status}
          />
        )}

        {/* 3-dot dropdown menu */}
        {(isOwner ||
          (currentUserRole === DEPARTMENT_ROLES.ADMIN &&
            (meta.role === DEPARTMENT_ROLES.MODERATOR ||
              meta.role === DEPARTMENT_ROLES.MEMBER))) &&
          !meta.isSelf && (
            <div className="relative" ref={menuRef}>
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200"
                title="More actions"
              >
                <BsThreeDots className="h-5 w-5" />
              </button>

              {showMenu && (
                <div
                  className={`absolute right-0 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg ${
                    openUpward ? "bottom-full mb-1" : "top-full mt-1"
                  }`}
                >
                  <div className="py-1">
                    {/* Owner-only actions */}
                    {isOwner && (
                      <>
                        {/* Demote to Moderator (Only for Admins) */}
                        {meta.role === DEPARTMENT_ROLES.ADMIN && (
                          <button
                            onClick={handleDemoteToModerator}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            <FaUserMinus className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">
                              Demote to Moderator
                            </span>
                          </button>
                        )}

                        {/* Promote to Admin (Only for Moderators) */}
                        {meta.role === DEPARTMENT_ROLES.MODERATOR && (
                          <button
                            onClick={handlePromoteToAdmin}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            <FaUserShield className="h-4 w-4 flex-shrink-0 text-blue-500" />
                            <span className="font-medium">
                              Promote to Admin
                            </span>
                          </button>
                        )}

                        {/* Demote to Member (Only for Moderators) */}
                        {meta.role === DEPARTMENT_ROLES.MODERATOR && (
                          <button
                            onClick={handleDemoteToMember}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            <FaUserMinus className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">
                              Demote to Member
                            </span>
                          </button>
                        )}

                        {/* Promote to Moderator (Only for Members) */}
                        {meta.role === DEPARTMENT_ROLES.MEMBER && (
                          <button
                            onClick={handlePromoteToModerator}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            <FaUserPlus className="h-4 w-4 flex-shrink-0 text-green-500" />
                            <span className="font-medium">
                              Promote to Moderator
                            </span>
                          </button>
                        )}
                      </>
                    )}

                    {/* Remove from Faculty */}
                    {/* Owner can remove anyone (except self, handled by !isSelf check on parent) */}
                    {/* Admin can remove Moderators and Members */}
                    {(isOwner ||
                      (currentUserRole === DEPARTMENT_ROLES.ADMIN &&
                        (meta.role === DEPARTMENT_ROLES.MODERATOR ||
                          meta.role === DEPARTMENT_ROLES.MEMBER))) && (
                      <button
                        onClick={handleRemoveFromFaculty}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-orange-600 transition-colors hover:bg-gray-50"
                      >
                        <FaUserMinus className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium">Remove from Faculty</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default DepartmentFacultyCard;
