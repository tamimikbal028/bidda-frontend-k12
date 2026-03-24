import { FaRegComment } from "react-icons/fa";

interface CommentButtonProps {
  showCommentBox: boolean;
  setShowCommentBox: (showCommentBox: boolean) => void;
  label?: string;
}

const CommentButton = ({
  showCommentBox,
  setShowCommentBox,
  label = "Comment",
}: CommentButtonProps) => {
  return (
    <button
      onClick={() => {
        setShowCommentBox(!showCommentBox);
      }}
      className={`flex items-center justify-center space-x-2 rounded-lg px-3 py-2 transition-colors ${
        showCommentBox
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <FaRegComment size={18} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default CommentButton;
