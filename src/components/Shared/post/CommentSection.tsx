import authHooks from "../../../hooks/useAuth";
import CommentSkeleton from "../skeletons/CommentSkeleton";
import CommentItem from "../CommentItem";
import LoadMoreButton from "../Action Buttons/LoadMoreButton";
import commentHooks from "../../../hooks/common/useComment";
import { useRef, useState, type FormEvent } from "react";

interface CommentSectionProps {
  postId: string;
  showCommentBox: boolean;
  invalidateKeys: (string | undefined)[][];
}

const CommentSection = ({
  postId,
  showCommentBox,
  invalidateKeys,
}: CommentSectionProps) => {
  const { user: currentUser } = authHooks.useUser();
  const [commentText, setCommentText] = useState("");

  // Comment Query
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = commentHooks.usePostComments({
    postId,
    enabled: showCommentBox,
  });

  // Flatten comments from all pages
  const postComments =
    commentsData?.pages.flatMap((page) => page.data.comments) || [];

  // add comment
  const { mutate: addComment, isPending: isAddingComment } =
    commentHooks.useAddComment({
      postId,
      invalidateKeys,
    });

  // delete comment
  const { mutate: deleteComment } = commentHooks.useDeleteComment({
    postId,
    invalidateKeys,
  });

  // update comment
  const { mutate: updateComment } = commentHooks.useUpdateComment({
    postId,
  });

  // toggle like comment
  const { mutate: toggleLikeComment } = commentHooks.useToggleLikeComment({
    postId,
  });

  // Ref for textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddComment = (e: FormEvent) => {
    if (e) e.preventDefault();
    if (!commentText.trim() || isAddingComment) return;

    addComment(
      { content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          // Reset textarea height
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        },
      }
    );
  };

  return (
    <div className="border-t border-gray-100">
      {/* Loading State */}
      {isLoadingComments && (
        <div className="space-y-1 px-2.5 py-2">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      )}

      {/* Comments List - Scrollable */}
      {!isLoadingComments && postComments.length > 0 && (
        <div className="px-2.5 py-2">
          <div className="max-h-[400px] space-y-1 overflow-y-auto">
            {postComments.map((item) => (
              <CommentItem
                key={item.comment._id}
                comment={item.comment}
                meta={item.meta}
                currentUserId={currentUser?._id}
                onDeleteComment={(commentId) => deleteComment(commentId)}
                onLikeComment={(commentId) => toggleLikeComment(commentId)}
                onUpdateComment={(commentId, content) =>
                  updateComment({ commentId, content })
                }
              />
            ))}
            {/* Load More Button */}
            {hasNextPage && (
              <div className="mt-2 flex w-full px-50">
                <LoadMoreButton
                  onClick={() => fetchNextPage()}
                  isLoading={isFetchingNextPage}
                  label="Load more comments"
                  loadingLabel="Loading more..."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Comment Input */}
      <div className="border-t border-gray-100 p-4">
        {currentUser?.restrictions.isCommentBlocked ? (
          <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            You are restricted from commenting.
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <img
              src={currentUser?.avatar}
              alt="Your avatar"
              className="h-8 w-8 rounded-full bg-gray-300 object-cover"
            />
            <textarea
              ref={textareaRef}
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                // Auto-resize
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Write a comment (max 1000 chars)..."
              className="max-h-32 flex-1 resize-none overflow-y-auto rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={1}
              style={{ minHeight: "38px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment(e);
                }
              }}
              maxLength={1000}
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim() || isAddingComment}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAddingComment ? "Sending..." : "Send"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
