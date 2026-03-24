import { FaHeart, FaRegHeart } from "react-icons/fa";
import postHooks from "../../../../hooks/common/usePost";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  queryKey?: (string | undefined)[][];
}

const LikeButton = ({ postId, isLiked, queryKey }: LikeButtonProps) => {
  const { mutate: toggleLikePost, isPending: isLiking } =
    postHooks.useToggleLikePost({
      queryKey,
    });

  const handleLike = () => {
    toggleLikePost({ postId });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className={`flex items-center justify-center space-x-2 rounded-lg px-3 py-2 transition-colors disabled:opacity-50 ${
        isLiked
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      <span className="text-sm font-medium">Like</span>
    </button>
  );
};

export default LikeButton;
