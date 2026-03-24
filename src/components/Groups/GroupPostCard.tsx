import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBookmark,
  FaRegBookmark,
  FaEdit,
  FaThumbtack,
  FaEllipsisH,
} from "react-icons/fa";
import PostContent from "../Shared/post/PostContent";
import type { Attachment, Post, PostMeta } from "../../types";
import groupHooks from "../../hooks/useGroup";
import dropdownHooks from "../../hooks/useDropdown";
import { ATTACHMENT_TYPES } from "../../constants";
import ReadButton from "../Shared/post/Action Buttons/ReadButton";
import { GROUP_KEYS } from "../../constants/queryKeys";
import LikeButton from "../Shared/post/Action Buttons/LikeButton";
import DeletePostButton from "../Shared/post/Action Buttons/DeletePostButton";
import CommentButton from "../Shared/post/Action Buttons/CommentButton";
import CommentSection from "../Shared/post/CommentSection";
import ShareButton from "../Shared/post/Action Buttons/ShareButton";
import CopyLinkButton from "../Shared/post/Action Buttons/CopyLinkButton";
import PostEdit from "../Shared/post/PostEdit";
import PostStats from "../Shared/post/PostStats";
import PostHeaderLeft from "../Shared/post/PostHeaderLeft";

interface GroupPostCardProps {
  post: Post;
  meta: PostMeta;
}

const GroupPostCard = ({ post, meta }: GroupPostCardProps) => {
  const { slug } = useParams();
  const { isLiked, isRead, isSaved, canEdit, canPin, canDelete } = meta;

  const [showCommentBox, setShowCommentBox] = useState(false);

  const {
    isOpen: showMenu,
    openUpward,
    menuRef,
    triggerRef: buttonRef,
    toggle: toggleMenu,
    close: closeMenu,
  } = dropdownHooks.useDropdown(300);

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: toggleBookmark, isPending: isBookmarking } =
    groupHooks.useToggleBookmarkGroupPost();

  const { mutate: togglePin, isPending: isPinning } =
    groupHooks.useTogglePinGroupPost();

  // Comment hooks

  const handleToggleBookmark = () => {
    toggleBookmark({ postId: post._id });
    closeMenu();
  };

  const images = post.attachments.filter(
    (attachment: Attachment) => attachment.type === ATTACHMENT_TYPES.IMAGE
  );

  return (
    <div
      className={`rounded border shadow ${
        post.isPinned
          ? "border-blue-300 bg-blue-200/30"
          : "border-gray-400 bg-white"
      }`}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <PostHeaderLeft
          displayName={post.displayName}
          displayAvatar={post.displayAvatar}
          displayUrl={post.displayUrl}
          createdAt={post.createdAt}
          isEdited={post.isEdited}
        />

        <div className="flex items-center space-x-2">
          {/* read/unread button */}
          <ReadButton
            postId={post._id}
            isRead={isRead}
            queryKey={[
              [GROUP_KEYS.POSTS, slug],
              [GROUP_KEYS.PINNED_POSTS, slug],
              [GROUP_KEYS.MARKETPLACE_POSTS, slug],
            ]}
            invalidateKey={[[GROUP_KEYS.UNREAD_COUNTS, slug]]}
          />

          <div className="relative" ref={menuRef}>
            {/* 3-dot menu button */}
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-200"
              title="More actions"
            >
              <FaEllipsisH className="h-4 w-4" />
            </button>

            {showMenu && (
              <div
                className={`absolute right-0 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg ${
                  openUpward ? "bottom-full mb-1" : "top-full mt-1"
                }`}
              >
                <div className="py-1">
                  {/* save button */}
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

                  {/* copy link button */}
                  <CopyLinkButton postId={post._id} closeMenu={closeMenu} />

                  {/* edit button */}
                  {canEdit && (
                    <button
                      onClick={() => {
                        closeMenu();
                        setIsEditing(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <FaEdit className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">Edit post</span>
                    </button>
                  )}

                  {/* pin button */}
                  {canPin && (
                    <button
                      onClick={() => {
                        togglePin({ postId: post._id });
                        closeMenu();
                      }}
                      disabled={isPinning}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 disabled:opacity-50 ${
                        post.isPinned ? "text-yellow-600" : "text-gray-700"
                      }`}
                    >
                      <FaThumbtack className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">
                        {post.isPinned ? "Unpin post" : "Pin post"}
                      </span>
                    </button>
                  )}

                  {/* delete button */}
                  {canDelete && (
                    <DeletePostButton
                      postId={post._id}
                      closeMenu={closeMenu}
                      queryKey={[[GROUP_KEYS.POSTS, slug]]}
                      invalidateKey={[
                        [GROUP_KEYS.POSTS, slug],
                        [GROUP_KEYS.PINNED_POSTS, slug],
                        [GROUP_KEYS.MARKETPLACE_POSTS, slug],
                        [GROUP_KEYS.DETAILS, slug],
                      ]}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content + Post Edit */}
      <div className="px-4 pb-3">
        {isEditing ? (
          <PostEdit
            post={post}
            setIsEditing={setIsEditing}
            allowedVisibilities={["PUBLIC", "CONNECTIONS", "ONLY_ME"]}
          />
        ) : (
          <PostContent post={post} />
        )}
      </div>

      {/* Post Images */}
      {images && images.length > 0 && (
        <div className="px-4 pb-3">
          {images.length === 1 ? (
            <img
              src={images[0].url}
              alt="Post content"
              className="h-auto max-h-96 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Post content ${index + 1}`}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  {index === 3 && images.length > 4 && (
                    <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
                      <span className="text-lg font-semibold text-white">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="border-y border-gray-100 px-4 py-2">
        <PostStats post={post} />
      </div>

      {/* like/comment/share - Buttons */}
      <div className="grid grid-cols-3 gap-2 px-4 py-3">
        {/* like button */}
        <LikeButton
          postId={post._id}
          isLiked={isLiked}
          queryKey={[
            [GROUP_KEYS.POSTS, slug],
            [GROUP_KEYS.PINNED_POSTS, slug],
            [GROUP_KEYS.MARKETPLACE_POSTS, slug],
          ]}
        />

        {/* comment button */}
        <CommentButton
          showCommentBox={showCommentBox}
          setShowCommentBox={setShowCommentBox}
        />

        {/* share button */}
        <ShareButton postId={post._id} />
      </div>

      {/* comments section */}
      {showCommentBox && (
        <CommentSection
          postId={post._id}
          showCommentBox={showCommentBox}
          invalidateKeys={[
            [GROUP_KEYS.POSTS, slug],
            [GROUP_KEYS.PINNED_POSTS, slug],
            [GROUP_KEYS.MARKETPLACE_POSTS, slug],
          ]}
        />
      )}
    </div>
  );
};

export default GroupPostCard;
