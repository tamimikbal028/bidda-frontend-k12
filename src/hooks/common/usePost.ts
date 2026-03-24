import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type {
  ApiError,
  CreatePostRequest,
  FeedPostsResponse,
} from "../../types";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { POST_STATUS } from "../../constants/post";
import { handleMutationError } from "../../utils/errorHandler";
import postServices from "../../services/common/post.service";

interface UsePostMutationProps {
  queryKey?: (string | undefined)[][];
  invalidateKey?: (string | undefined)[][];
}

const useCreatePost = ({ queryKey, invalidateKey }: UsePostMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postServices.createPost(data),
    onSuccess: (response) => {
      if (queryKey) {
        queryClient.setQueriesData(
          { queryKey: queryKey },
          (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
            if (!oldData || oldData.pages.length === 0) return oldData;

            const newItem = response.data; // { post, meta }
            const firstPage = oldData.pages[0];
            const updatedFirstPage = {
              ...firstPage,
              data: {
                ...firstPage.data,
                posts: [newItem, ...firstPage.data.posts],
              },
            };

            return {
              ...oldData,
              pages: [updatedFirstPage, ...oldData.pages.slice(1)],
            };
          }
        );
      }

      // Invalidate related queries
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      if (response.data.post?.status === POST_STATUS.PENDING) {
        toast.info("Post submitted and waiting for admin approval");
      } else {
        toast.success(response.message);
      }
    },
    onError: handleMutationError("Failed to create post"),
  });
};

const useToggleLikePost = ({ queryKey }: UsePostMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      postServices.togglePostLike(postId),

    onMutate: async ({ postId }: { postId: string }) => {
      if (!queryKey) return;

      // Cancel all queries
      await Promise.all(
        queryKey.map((key) => queryClient.cancelQueries({ queryKey: key }))
      );

      // Get previous data
      const previousPosts = queryKey.flatMap((key) =>
        queryClient.getQueriesData({ queryKey: key })
      );

      // Update all queries optimistically
      queryKey.forEach((key) => {
        queryClient.setQueriesData(
          { queryKey: key },
          (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
            if (!oldData?.pages) return oldData;

            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                if (!page?.data.posts) return page;

                return {
                  ...page,
                  data: {
                    ...page.data,
                    posts: page.data.posts.map((item) => {
                      if (item.post._id === postId) {
                        const isLiked = item.meta.isLiked;
                        return {
                          ...item,
                          meta: {
                            ...item.meta,
                            isLiked: !isLiked,
                          },
                          post: {
                            ...item.post,
                            likesCount:
                              (isLiked ? -1 : 1) + (item.post.likesCount || 0),
                          },
                        };
                      }
                      return item;
                    }),
                  },
                };
              }),
            };
          }
        );
      });

      // Return context with previous data for rollback on error
      return { previousPosts };
    },

    onError: (error: AxiosError<ApiError>, _variables, context) => {
      // Rollback to previous data
      if (context) {
        context.previousPosts.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      handleMutationError(error, "Failed to update like status");
    },
  });
};

const useToggleReadPost = ({
  queryKey,
  invalidateKey,
}: UsePostMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      postServices.togglePostRead(postId),

    onMutate: async ({ postId }: { postId: string }) => {
      if (!queryKey) return;

      // Cancel all queries
      await Promise.all(
        queryKey.map((key) => queryClient.cancelQueries({ queryKey: key }))
      );

      // Get previous data
      const previousPosts = queryKey.flatMap((key) =>
        queryClient.getQueriesData({ queryKey: key })
      );

      // Update all queries optimistically
      queryKey.forEach((key) => {
        queryClient.setQueriesData(
          { queryKey: key },
          (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
            if (!oldData?.pages) return oldData;

            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                if (!page?.data.posts) return page;

                return {
                  ...page,
                  data: {
                    ...page.data,
                    posts: page.data.posts.map((item) => {
                      if (item.post._id === postId) {
                        return {
                          ...item,
                          meta: {
                            ...item.meta,
                            isRead: !item.meta.isRead,
                          },
                        };
                      }
                      return item;
                    }),
                  },
                };
              }),
            };
          }
        );
      });

      // Return context with previous data for rollback on error
      return { previousPosts };
    },

    onError: (error: AxiosError<ApiError>, _variables, context) => {
      // Rollback to previous data
      if (context?.previousPosts) {
        context.previousPosts.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      handleMutationError(error, "Failed to update read status");
    },

    onSettled: () => {
      // Invalidate related queries
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },
  });
};

const useToggleBookmark = ({
  queryKey,
  invalidateKey,
}: UsePostMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      postServices.toggleBookmark(postId),

    // Optimistic Update
    onMutate: async ({ postId }: { postId: string }) => {
      if (!queryKey) return;

      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueriesData({
        queryKey: queryKey,
      });

      queryClient.setQueriesData(
        { queryKey: queryKey },
        (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.map((item) => {
                  if (item.post._id === postId) {
                    return {
                      ...item,
                      meta: {
                        ...item.meta,
                        isSaved: !item.meta.isSaved,
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

      return { previousPosts };
    },

    onSuccess: () => {
      // Invalidate related queries
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },

    onError: (error: AxiosError<ApiError>, _variables, context) => {
      if (context?.previousPosts) {
        context.previousPosts.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      handleMutationError(error, "Failed to toggle bookmark");
    },
  });
};

const useUpdatePost = ({ queryKey, invalidateKey }: UsePostMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      data,
    }: {
      postId: string;
      data: { content: string; tags?: string[]; visibility?: string };
    }) => {
      return postServices.updatePost(postId, data);
    },

    onSuccess: (data) => {
      // Optimistic update
      if (queryKey) {
        queryKey.forEach((key) => {
          queryClient.setQueriesData(
            { queryKey: key },
            (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
              if (!oldData) return oldData;

              return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  data: {
                    ...page.data,
                    posts: page.data.posts.map((item) =>
                      item.post._id === data.data.post._id ? data.data : item
                    ),
                  },
                })),
              };
            }
          );
        });
      }

      // Invalidate additional queries if specified (e.g., pinned posts)
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      toast.success(data.message || data.data.message);
    },
    onError: handleMutationError("Failed to update post"),
  });
};

const useDeletePost = ({ queryKey, invalidateKey }: UsePostMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      postServices.deletePost(postId),

    onSuccess: (response, variables) => {
      const { postId } = variables;

      // Remove post from cache
      if (queryKey) {
        queryClient.setQueriesData(
          { queryKey: queryKey },
          (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  posts: page.data.posts.filter(
                    (item) => item.post._id !== postId
                  ),
                },
              })),
            };
          }
        );
      }

      // Invalidate related queries
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      toast.success(response.message);
    },

    onError: handleMutationError("Failed to delete post"),
  });
};

const useTogglePin = ({ queryKey, invalidateKey }: UsePostMutationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) =>
      postServices.togglePin(postId),

    onMutate: async ({ postId }) => {
      if (!queryKey) return;

      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousPosts = queryClient.getQueriesData({
        queryKey: queryKey,
      });

      queryClient.setQueriesData(
        { queryKey: queryKey },
        (oldData: InfiniteData<FeedPostsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.map((item) => {
                  if (item.post._id === postId) {
                    return {
                      ...item,
                      post: {
                        ...item.post,
                        isPinned: !item.post.isPinned,
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

      return { previousPosts };
    },

    onSuccess: (response) => {
      // Invalidate related queries (e.g., pinnedPosts, groupDetails)
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      toast.success(response.message);
    },

    onError: (error: AxiosError<ApiError>, _variables, context) => {
      if (context?.previousPosts) {
        context.previousPosts.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      handleMutationError(error, "Failed to toggle pin post");
    },
  });
};

const postHooks = {
  useCreatePost,
  useToggleLikePost,
  useToggleReadPost,
  useToggleBookmark,
  useUpdatePost,
  useDeletePost,
  useTogglePin,
} as const;

export default postHooks;
