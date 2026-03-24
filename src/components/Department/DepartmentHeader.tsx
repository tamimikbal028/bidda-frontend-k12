import {
  FaArrowLeft,
  FaEllipsisV,
  FaPencilAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { DepartmentHeaderData, DepartmentMeta } from "../../types";
import { FOLLOW_TARGET_MODELS, DEPARTMENT_KEYS } from "../../constants";
import dropdownHooks from "../../hooks/useDropdown";
import FollowButton from "../Shared/Action Buttons/FollowButton";
import CopyLinkButton from "../Shared/Action Buttons/CopyLinkButton";

interface DepartmentHeaderProps {
  department: DepartmentHeaderData;
  meta: DepartmentMeta;
}

const DepartmentHeader = ({ department, meta }: DepartmentHeaderProps) => {
  const navigate = useNavigate();
  const { deptId } = useParams();

  const {
    isOpen: showMenu,
    openUpward,
    menuRef,
    triggerRef: buttonRef,
    toggle: toggleMenu,
    close: closeMenu,
  } = dropdownHooks.useDropdown();

  return (
    <div className="relative">
      {/* Top Info Bar */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          {/* Logo - Smaller */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
            {department.logo ? (
              <img
                src={department.logo}
                alt={department.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-blue-600">
                <FaGraduationCap className="h-6 w-6" />
              </div>
            )}
          </div>

          {/* Department Name and Code/Institution */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-gray-900">
              {department.name}
            </h1>
            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              {department.code} <span className="mx-1 text-gray-300">|</span>{" "}
              {department.institution.name}
            </p>
          </div>

          {/* Follow Button - Stays on same line as logo */}
          <FollowButton
            targetId={department._id}
            targetModel={FOLLOW_TARGET_MODELS.DEPARTMENT}
            isFollowing={meta.isFollowing}
            invalidateKeys={[
              [DEPARTMENT_KEYS.DETAILS, deptId],
              [DEPARTMENT_KEYS.HEADER, deptId],
            ]}
          />
        </div>
      </div>

      {/* Cover Image with Floating Elements */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <img
          src={department.coverImage}
          alt={department.name}
          className="h-full w-full object-cover"
        />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          <FaArrowLeft />
        </button>

        {/* 3-Dot Menu Button */}
        <div className="absolute top-4 right-4" ref={menuRef}>
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <FaEllipsisV className="h-5 w-5" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div
              className={`absolute right-0 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg ${
                openUpward ? "bottom-full mb-1" : "top-full mt-1"
              }`}
            >
              <div className="py-1">
                {/* edit button */}
                {meta.canEdit && (
                  <button
                    onClick={() => {
                      closeMenu();
                      navigate(`/departments/${deptId}/edit`);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <FaPencilAlt className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="font-medium">Edit Department</span>
                  </button>
                )}
                {/* copy link button */}
                <CopyLinkButton
                  displayText="Copy Department Link"
                  onSuccess={closeMenu}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Section - Floating at Bottom */}
        <div className="absolute right-4 bottom-4 left-4">
          <div className="flex gap-x-4 rounded-lg bg-white/70 px-3 py-3 text-sm shadow-lg backdrop-blur-md">
            <Link
              to={department.website || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-1.5 font-medium text-blue-600 hover:underline"
            >
              <span>Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeader;
