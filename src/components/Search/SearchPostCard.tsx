import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegComment,
  FaGlobeAmericas,
  FaUsers,
  FaLock,
} from "react-icons/fa";
import { formatPostDate } from "../../utils/dateUtils";
import type { Post } from "../../types";
import { POST_VISIBILITY } from "../../constants";

interface SearchPostCardProps {
  post: Post;
}

const SearchPostCard = ({ post }: SearchPostCardProps) => {
  const postLink = `/post/${post._id}`;

  // Get visibility icon
  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case POST_VISIBILITY.PUBLIC:
        return <FaGlobeAmericas className="h-3 w-3" />;
      case POST_VISIBILITY.CONNECTIONS:
        return <FaUsers className="h-3 w-3" />;
      case POST_VISIBILITY.INTERNAL:
        return <FaUsers className="h-3 w-3" />;
      case POST_VISIBILITY.ONLY_ME:
        return <FaLock className="h-3 w-3" />;
      default:
        return <FaGlobeAmericas className="h-3 w-3" />;
    }
  };

  // Render attachments preview
  const renderAttachments = () => {
    if (!post.attachments || post.attachments.length === 0) return null;

    const images = post.attachments.filter((att) => att.type === "IMAGE");
    const videos = post.attachments.filter((att) => att.type === "VIDEO");

    if (images.length > 0) {
      return (
        <div className="mb-3">
          {images.length === 1 && (
            <img
              src={images[0].url}
              alt="Post attachment"
              className="h-64 w-full rounded-lg object-cover"
            />
          )}
          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-2">
              {images.slice(0, 2).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Attachment ${idx + 1}`}
                  className="h-48 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          {images.length === 3 && (
            <div className="grid grid-cols-2 gap-2">
              <img
                src={images[0].url}
                alt="Attachment 1"
                className="col-span-2 h-64 w-full rounded-lg object-cover"
              />
              {images.slice(1, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Attachment ${idx + 2}`}
                  className="h-32 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          {images.length >= 4 && (
            <div className="grid grid-cols-2 gap-2">
              {images.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Attachment ${idx + 1}`}
                  className="h-48 w-full rounded-lg object-cover"
                />
              ))}
              <div className="relative h-48 w-full">
                <img
                  src={images[3].url}
                  alt="Attachment 4"
                  className="h-full w-full rounded-lg object-cover"
                />
                {images.length > 4 && (
                  <div className="bg-opacity-60 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
                    <span className="text-2xl font-bold text-white">
                      +{images.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (videos.length > 0) {
      return (
        <div className="mb-3">
          <video
            src={videos[0].url}
            controls
            className="h-64 w-full rounded-lg"
          />
          {videos.length > 1 && (
            <p className="mt-1 text-xs text-gray-500">
              +{videos.length - 1} more video{videos.length > 2 ? "s" : ""}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  // Render tags
  const renderTags = () => {
    if (!post.tags || post.tags.length === 0) return null;

    return (
      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag, idx) => (
          <Link
            key={idx}
            to={`/search?q=${encodeURIComponent(tag)}&type=hashtags`}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200"
            onClick={(e) => e.stopPropagation()}
          >
            {tag}
          </Link>
        ))}
        {post.tags.length > 3 && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            +{post.tags.length - 3} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Link to={post.displayUrl} onClick={(e) => e.stopPropagation()}>
              <img
                src={post.displayAvatar}
                alt={post.displayName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
              />
            </Link>
            <div>
              <Link
                to={post.displayUrl}
                className="font-semibold text-gray-900 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {post.displayName}
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{formatPostDate(post.createdAt)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {getVisibilityIcon()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Link to={postLink} className="block">
        <div className="px-4 pb-3">
          <p className="whitespace-pre-wrap text-gray-800">
            {post.content.length > 300
              ? `${post.content.substring(0, 300)}...`
              : post.content}
          </p>
        </div>

        {/* Tags */}
        <div className="px-4">{renderTags()}</div>

        {/* Attachments Preview */}
        <div className="px-4">{renderAttachments()}</div>
      </Link>

      {/* Footer Stats & Actions */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <FaHeart className="text-red-500" />
              <span className="font-medium">{post.likesCount || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRegComment className="text-blue-500" />
              <span className="font-medium">{post.commentsCount || 0}</span>
            </div>
          </div>

          {/* View Post Link */}
          <Link
            to={postLink}
            className="rounded-md bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchPostCard;
