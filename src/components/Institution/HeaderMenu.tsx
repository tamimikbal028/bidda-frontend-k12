import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { InstitutionHeaderMeta } from "../../types";
import authHooks from "../../hooks/useAuth";
import { FaEllipsisV, FaPencilAlt, FaTrash } from "react-icons/fa";
import dropdownHooks from "../../hooks/useDropdown";
import CopyLinkButton from "../Shared/Action Buttons/CopyLinkButton";

const HeaderMenu = ({ meta }: { meta: InstitutionHeaderMeta }) => {
  const { instId } = useParams();

  const { isAppAdmin } = authHooks.useUser();

  const { isOwner, isAdmin } = meta;

  const {
    isOpen: showMenu,
    openUpward,
    menuRef,
    triggerRef: buttonRef,
    toggle: toggleMenu,
    close: closeMenu,
  } = dropdownHooks.useDropdown();

  const handleDelete = () => {
    closeMenu();
    // TODO: Implement delete institution
    toast.info("Delete institution functionality coming soon");
  };

  return (
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
            {/* Edit Institution */}
            {isAdmin && isOwner && (
              <Link
                to={`/institutions/${instId}/edit`}
                onClick={closeMenu}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <FaPencilAlt className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">Edit Institution</span>
              </Link>
            )}

            {/* Copy Link */}
            <CopyLinkButton
              displayText="Copy Institution Link"
              copyValue={`${window.location.origin}/institutions/${instId}`}
              onSuccess={closeMenu}
            />

            {/* Delete Institution */}
            {isAppAdmin && (
              <button
                onClick={handleDelete}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-gray-50"
              >
                <FaTrash className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">Delete Institution</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
