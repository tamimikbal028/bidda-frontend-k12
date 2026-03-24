import { useState } from "react";
import PostContent from "../Shared/post/PostContent";
import type { Attachment, Post, PostMeta } from "../../types";
import { ATTACHMENT_TYPES } from "../../constants";
import dropdownHooks from "../../hooks/useDropdown";
import ReadButton from "../Shared/post/Action Buttons/ReadButton";
import LikeButton from "../Shared/post/Action Buttons/LikeButton";
import { PROFILE_KEYS } from "../../constants/queryKeys";
import { useParams } from "react-router-dom";
import CommentButton from "../Shared/post/Action Buttons/CommentButton";
import CommentSection from "../Shared/post/CommentSection";
import ShareButton from "../Shared/post/Action Buttons/ShareButton";
import CopyLinkButton from "../Shared/post/Action Buttons/CopyLinkButton";
import DeletePostButton from "../Shared/post/Action Buttons/DeletePostButton";
import PostEdit from "../Shared/post/PostEdit";
import PostStats from "../Shared/post/PostStats";
import PostHeaderLeft from "../Shared/post/PostHeaderLeft";
import SaveButton from "../Shared/post/Action Buttons/SaveButton";
import EditButton from "../Shared/post/Action Buttons/EditButton";
import { FaEllipsisH } from "react-icons/fa";

interface ProfilePostCardProps {
  post: Post;
  meta: PostMeta;
}

const ProfilePostCard = ({ post, meta }: ProfilePostCardProps) => {
  const { isLiked, isRead, isSaved, canEdit, canDelete } = meta;
  const { username } = useParams();
  const [showCommentBox, setShowCommentBox] = useState(false);

  const {
    isOpen: showMenu,
    openUpward,
    menuRef,
    triggerRef: buttonRef,
    toggle: toggleMenu,
    close,
  } = dropdownHooks.useDropdown(300);

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);

  const images = post.attachments.filter(
    (attachment: Attachment) => attachment.type === ATTACHMENT_TYPES.IMAGE
  );

  return (
    <div className="rounded border border-gray-400 bg-white shadow">
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
          {/* read button */}
          <ReadButton
            postId={post._id}
            isRead={isRead}
            queryKey={[[PROFILE_KEYS.POSTS, username]]}
          />

          {/* 3-dot menu button */}
          <div className="relative" ref={menuRef}>
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
                  <SaveButton
                    postId={post._id}
                    isSaved={isSaved}
                    closeMenu={close}
                  />

                  {/* copy link button */}
                  <CopyLinkButton postId={post._id} closeMenu={close} />

                  {/* edit button */}
                  {canEdit && (
                    <EditButton setIsEditing={setIsEditing} closeMenu={close} />
                  )}

                  {/* delete button */}
                  {canDelete && (
                    <DeletePostButton
                      postId={post._id}
                      queryKey={[[PROFILE_KEYS.POSTS, username]]}
                      invalidateKey={[
                        [PROFILE_KEYS.HEADER, username],
                        [PROFILE_KEYS.POSTS, username],
                      ]}
                      closeMenu={close}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
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

      <div className="border-t border-gray-100 px-4 py-2">
        <PostStats post={post} />
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-gray-100 px-4 py-3">
        {/* like button */}
        <LikeButton
          postId={post._id}
          isLiked={isLiked}
          queryKey={[[PROFILE_KEYS.POSTS, username]]}
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
          invalidateKeys={[[PROFILE_KEYS.POSTS, username]]}
        />
      )}
    </div>
  );
};

export default ProfilePostCard;
