import { useState } from "react";
import { FaEllipsisH, FaBookmark, FaRegBookmark, FaEdit } from "react-icons/fa";
import type { Attachment, Post, PostMeta } from "../../types";
import roomHooks from "../../hooks/useRoom";
import dropdownHooks from "../../hooks/useDropdown";
import { ATTACHMENT_TYPES } from "../../constants";
import ReadButton from "../Shared/post/Action Buttons/ReadButton";
import { ROOM_KEYS } from "../../constants/queryKeys";
import { useParams } from "react-router-dom";
import DeletePostButton from "../Shared/post/Action Buttons/DeletePostButton";
import CommentButton from "../Shared/post/Action Buttons/CommentButton";
import CopyLinkButton from "../Shared/post/Action Buttons/CopyLinkButton";
import PostHeaderLeft from "../Shared/post/PostHeaderLeft";
import PostEdit from "../Shared/post/PostEdit";
import PostContent from "../Shared/post/PostContent";
import CommentSection from "../Shared/post/CommentSection";

interface RoomPostCardProps {
  post: Post;
  meta: PostMeta;
}

const RoomPostCard = ({ post, meta }: RoomPostCardProps) => {
  const { isRead, isSaved, canEdit, canDelete } = meta;
  const { roomId } = useParams();
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

  // Post hooks
  const { mutate: toggleBookmark, isPending: isBookmarking } =
    roomHooks.useToggleBookmarkRoomPost();

  // Room details for settings
  const { data: roomResponse } = roomHooks.useRoomDetails();
  const roomMeta = roomResponse?.data.meta;
  const canComment = roomMeta?.canComment;

  const handleToggleBookmark = () => {
    toggleBookmark({ postId: post._id });
    closeMenu();
  };

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
          {/* comment button */}
          {canComment && (
            <CommentButton
              showCommentBox={showCommentBox}
              setShowCommentBox={setShowCommentBox}
              label={"Reply"}
            />
          )}

          {/* read button */}
          <ReadButton
            postId={post._id}
            isRead={isRead}
            queryKey={[[ROOM_KEYS.POSTS, roomId]]}
          />

          {/* 3-dots menu button */}
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
                  {/* save/unsave button */}
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

                  {canEdit && (
                    <>
                      {/* edit button */}
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
                    </>
                  )}

                  {/* delete button */}
                  {canDelete && (
                    <DeletePostButton
                      postId={post._id}
                      queryKey={[[ROOM_KEYS.POSTS, roomId]]}
                      invalidateKey={[
                        [ROOM_KEYS.POSTS, roomId],
                        [ROOM_KEYS.DETAILS, roomId],
                      ]}
                      closeMenu={closeMenu}
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
            allowedVisibilities={["CONNECTIONS", "ONLY_ME"]}
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

      {/* comments section */}
      {showCommentBox && (
        <CommentSection
          postId={post._id}
          showCommentBox={showCommentBox}
          invalidateKeys={[[ROOM_KEYS.POSTS, roomId]]}
        />
      )}
    </div>
  );
};

export default RoomPostCard;
