import { DEPARTMENT_ROLES } from "../../constants/department";

interface RoleBadgeProps {
  role?: string;
  label?: string;
  className?: string;
}

const RoleBadge = ({ role, label, className = "" }: RoleBadgeProps) => {
  if (!role && !label) return null;

  // Define styles based on role
  let badgeStyles = "border-gray-200 bg-gray-50 text-gray-700"; // default

  if (role === DEPARTMENT_ROLES.OWNER) {
    badgeStyles = "border-purple-200 bg-purple-50 text-purple-700";
  } else if (role === DEPARTMENT_ROLES.ADMIN) {
    badgeStyles = "border-blue-200 bg-blue-50 text-blue-700";
  } else if (role === DEPARTMENT_ROLES.MODERATOR) {
    badgeStyles = "border-green-200 bg-green-50 text-green-700";
  }

  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${badgeStyles} ${className}`}
    >
      {label || role}
    </span>
  );
};

export default RoleBadge;
