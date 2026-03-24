import { useState } from "react";
import type { Post } from "../../../types";

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  const { content, tags } = post;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const isLongContent = content.length > 300 || content.split("\n").length > 5;

  return (
    <div>
      {/* content */}
      <div
        className={`whitespace-pre-wrap text-gray-900 ${
          !isExpanded ? "line-clamp-5" : ""
        }`}
      >
        {content}
      </div>

      {/* content see more/less button */}
      {isLongContent && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-700 hover:underline"
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}

      {/* tags */}
      {tags && tags.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {(showAllTags ? tags : tags.slice(0, 5)).map((tag, index) => (
              <span
                key={index}
                className="inline-block cursor-pointer rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
              >
                #{tag}
              </span>
            ))}

            {/* show more button */}
            {!showAllTags && tags.length > 5 && (
              <button
                onClick={() => setShowAllTags(true)}
                className="inline-block cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:underline"
              >
                +{tags.length - 5} more
              </button>
            )}

            {/* show less button */}
            {showAllTags && tags.length > 5 && (
              <button
                onClick={() => setShowAllTags(false)}
                className="inline-block cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:underline"
              >
                Show less
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContent;
