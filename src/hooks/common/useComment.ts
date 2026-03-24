import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiError, CommentsResponse } from "../../types";
import commentServices from "../../services/common/comment.service";
import { handleMutationError } from "../../utils/errorHandler";

interface CommentMutationProps {
  postId: string;
  invalidateKeys: (string | undefined)[][];
}

const usePostComments = ({
  postId,
  enabled,
}: {
  postId: string;
  enabled: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],

    queryFn: ({ pageParam }) =>
      commentServices.getPostComments(postId, pageParam as number),

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!postId && enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

const useAddComment = ({ postId, invalidateKeys }: CommentMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: { content: string }) =>
      commentServices.addComment(postId, content),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });

      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      toast.success(response.message);
    },
    onError: handleMutationError("Failed to add comment"),
  });
};

const useToggleLikeComment = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      commentServices.toggleLikeComment(commentId),

    onMutate: async (commentId) => {
      // Cancel background refetch to prevent overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      // Snapshot previous data for rollback on error
      const previousComments = queryClient.getQueriesData({
        queryKey: ["comments", postId],
      });

      // Optimistic Update - instant UI change
      queryClient.setQueriesData(
        { queryKey: ["comments", postId] },
        (oldData: InfiniteData<CommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                comments: page.data.comments.map((item) => {
                  if (item.comment._id === commentId) {
                    const isLiked = item.meta.isLiked;
                    return {
                      ...item,
                      meta: {
                        ...item.meta,
                        isLiked: !isLiked,
                      },
                      comment: {
                        ...item.comment,
                        likesCount:
                          (isLiked ? -1 : 1) + (item.comment.likesCount || 0),
                      },
                    };
                  }
                  return item;
                }),
              },
            })),
          };
        }
      );

      // Return context with previous data for rollback
      return { previousComments };
    },

    onError: (error: AxiosError<ApiError>, _commentId, context) => {
      // Rollback to previous state on error
      if (context) {
        context.previousComments.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      handleMutationError(error, "Failed to toggle like on comment");
    },
  });
};

const useUpdateComment = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => commentServices.updateComment(commentId, content),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success(response.message);
    },

    onError: handleMutationError("Failed to update comment"),
  });
};

const useDeleteComment = ({ postId, invalidateKeys }: CommentMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentServices.deleteComment(commentId),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });

      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      toast.success(response.message);
    },
    onError: handleMutationError("Failed to delete comment"),
  });
};

const commentHooks = {
  usePostComments,
  useAddComment,
  useToggleLikeComment,
  useUpdateComment,
  useDeleteComment,
} as const;

export default commentHooks;
