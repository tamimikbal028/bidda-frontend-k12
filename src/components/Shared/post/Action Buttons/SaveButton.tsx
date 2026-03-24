import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import profileHooks from "../../../../hooks/useProfile";

interface SaveButtonProps {
  postId: string;
  isSaved: boolean;
  closeMenu: () => void;
}

const SaveButton = ({ postId, isSaved, closeMenu }: SaveButtonProps) => {
  const { mutate: toggleBookmark, isPending: isBookmarking } =
    profileHooks.useToggleBookmarkProfilePost();

  const handleToggleBookmark = () => {
    toggleBookmark({ postId });
    closeMenu();
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={isBookmarking}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 disabled:opacity-50 ${
        isSaved ? "text-blue-600" : "text-gray-700"
      }`}
    >
      {isSaved ? (
        <>
          <FaBookmark className="h-4 w-4 flex-shrink-0" />
          <span className="font-medium">Remove from saved</span>
        </>
      ) : (
        <>
          <FaRegBookmark className="h-4 w-4 flex-shrink-0" />
          <span className="font-medium">Save post</span>
        </>
      )}
    </button>
  );
};

export default SaveButton;
