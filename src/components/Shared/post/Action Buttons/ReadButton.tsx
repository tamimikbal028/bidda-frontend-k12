import { FaCheckDouble } from "react-icons/fa6";
import postHooks from "../../../../hooks/common/usePost";

interface ReadButtonProps {
  postId: string;
  isRead: boolean;
  queryKey?: (string | undefined)[][];
  invalidateKey?: (string | undefined)[][];
}

const ReadButton = ({
  postId,
  isRead,
  queryKey,
  invalidateKey,
}: ReadButtonProps) => {
  const { mutate: toggleRead, isPending: isReading } =
    postHooks.useToggleReadPost({
      queryKey,
      invalidateKey,
    });

  return (
    <button
      onClick={() => toggleRead({ postId })}
      disabled={isReading}
      className={`flex h-9 items-center justify-center gap-2 rounded-lg px-3 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        isRead ? "text-blue-600" : "text-gray-500"
      }`}
      title={isRead ? "Mark as unread" : "Mark as read"}
    >
      <FaCheckDouble className="h-4 w-4" />
      <span className="text-sm font-medium">
        {isRead ? "Read" : "Mark as read"}
      </span>
    </button>
  );
};

export default ReadButton;
