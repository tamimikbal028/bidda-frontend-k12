import type { Post } from "../../../types";
import SeparatorDot from "../SeparatorDot";

const PostStats = ({ post }: { post: Post }) => {
  const likes = post.likesCount || 0;
  const likeText = likes <= 1 ? "like" : "likes";
  const comments = post.commentsCount || 0;
  const commentsText = comments <= 1 ? "comment" : "comments";
  const shares = post.sharesCount || 0;
  const sharesText = shares <= 1 ? "share" : "shares";
  return (
    <div className="flex items-center justify-between text-sm text-gray-500">
      <div className="flex items-center space-x-3">
        <span>
          {likes} {likeText}
        </span>
        <SeparatorDot ariaHidden />
        <span>
          {comments} {commentsText}
        </span>
        <SeparatorDot ariaHidden />
        <span>
          {shares} {sharesText}
        </span>
      </div>
    </div>
  );
};

export default PostStats;
