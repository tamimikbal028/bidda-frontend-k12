import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { groupServices } from "../services/group.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { GROUP_KEYS } from "../constants/queryKeys";
import type { ApiError } from "../types";
import type {
  CreateGroupData,
  GroupDetailsResponse,
} from "../types/group.types";
import { handleMutationError } from "../utils/errorHandler";
import postHooks from "./common/usePost";

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (groupData: CreateGroupData) =>
      groupServices.createGroup(groupData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNIVERSITY_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.CAREER_GROUPS] });

      const groupSlug = data.data.group?.slug;
      navigate(`/groups/${groupSlug}`);
    },
    onError: handleMutationError("Failed to create group"),
  });
};

const useMyGroups = () => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.MY_GROUPS, "infinite"],
    queryFn: ({ pageParam }) => groupServices.getMyGroups(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useUniversityGroups = () => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.UNIVERSITY_GROUPS, "infinite"],
    queryFn: ({ pageParam }) =>
      groupServices.getUniversityGroups(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

const useCareerGroups = () => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.CAREER_GROUPS, "infinite"],
    queryFn: ({ pageParam }) =>
      groupServices.getCareerGroups(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

const useSuggestedGroups = () => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.SUGGESTED_GROUPS, "infinite"],
    queryFn: ({ pageParam }) =>
      groupServices.getSuggestedGroups(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

const useSentGroupRequests = () => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.SENT_REQUESTS, "infinite"],
    queryFn: ({ pageParam }) =>
      groupServices.getSentRequests(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

const useInvitedGroups = () => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.INVITED_GROUPS, "infinite"],
    queryFn: ({ pageParam }) =>
      groupServices.getInvitedGroups(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Search Groups Hook
const useSearchGroups = (query: string) => {
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.SEARCH_GROUPS, query],
    queryFn: ({ pageParam }) =>
      groupServices.searchGroups(query, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: query.trim().length >= 2, // Only run if query is at least 2 characters
  });
};

const useGroupDetails = () => {
  const { slug } = useParams();
  return useQuery({
    queryKey: [GROUP_KEYS.DETAILS, slug],
    queryFn: async () => await groupServices.getGroupDetails(slug as string),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!slug,
    retry: 1,
  });
};

// Lightweight hook for navbar unread counts
const useGroupUnreadCounts = () => {
  const { slug } = useParams();
  return useQuery({
    queryKey: [GROUP_KEYS.UNREAD_COUNTS, slug],
    queryFn: async () =>
      await groupServices.getGroupUnreadCounts(slug as string),
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: !!slug,
  });
};

const useGroupMembers = (status: string) => {
  const { slug } = useParams();
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.MEMBERS, slug, status],
    queryFn: ({ pageParam }) =>
      groupServices.getGroupMembers(
        slug as string,
        pageParam as number,
        status
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!slug,
    staleTime: Infinity,
  });
};

const useAcceptJoinRequest = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      groupServices.acceptJoinRequest(slug as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNREAD_COUNTS, slug],
      });
    },
    onError: handleMutationError("Failed to accept request"),
  });
};

const useRejectJoinRequest = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      groupServices.rejectJoinRequest(slug as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNREAD_COUNTS, slug],
      });
    },
    onError: handleMutationError("Failed to reject request"),
  });
};
const usePendingPosts = () => {
  const { slug } = useParams();
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.PENDING_POSTS, slug],
    queryFn: ({ pageParam }) =>
      groupServices.getPendingPosts(slug as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!slug,
  });
};

const useApprovePost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      groupServices.approvePost(slug as string, postId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.PENDING_POSTS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNREAD_COUNTS, slug],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.POSTS, slug] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.PINNED_POSTS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MARKETPLACE_POSTS, slug],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.DETAILS, slug] });
    },
    onError: handleMutationError("Failed to approve post"),
  });
};

const useRejectPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      groupServices.rejectPost(slug as string, postId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.PENDING_POSTS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNREAD_COUNTS, slug],
      });
    },
    onError: handleMutationError("Failed to reject post"),
  });
};

// ====================================
// Group Feed & Posts
// ====================================

const useGroupPosts = () => {
  const { slug } = useParams();
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.POSTS, slug],
    queryFn: ({ pageParam }) =>
      groupServices.getGroupPosts(slug as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

const useGroupPinnedPosts = () => {
  const { slug } = useParams();
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.PINNED_POSTS, slug],
    queryFn: ({ pageParam }) =>
      groupServices.getGroupPinnedPosts(slug as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useGroupMarketplacePosts = () => {
  const { slug } = useParams();
  return useInfiniteQuery({
    queryKey: [GROUP_KEYS.MARKETPLACE_POSTS, slug],
    queryFn: ({ pageParam }) =>
      groupServices.getGroupMarketplacePosts(
        slug as string,
        pageParam as number
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

const useCreateGroupPost = () => {
  const { slug } = useParams();
  return postHooks.useCreatePost({
    invalidateKey: [
      [GROUP_KEYS.POSTS, slug],
      [GROUP_KEYS.PINNED_POSTS, slug],
      [GROUP_KEYS.DETAILS, slug],
    ],
  });
};

const useCreateMarketplacePost = () => {
  const { slug } = useParams();
  return postHooks.useCreatePost({
    invalidateKey: [
      [GROUP_KEYS.MARKETPLACE_POSTS, slug],
      [GROUP_KEYS.POSTS, slug], // Main Posts tab also needs to refresh
      [GROUP_KEYS.DETAILS, slug],
    ],
  });
};

// Group Post Update - Using Common Hook with multiple invalidateKeys
const useUpdateGroupPost = () => {
  const { slug } = useParams();
  return postHooks.useUpdatePost({
    queryKey: [[GROUP_KEYS.POSTS, slug]],
    invalidateKey: [
      [GROUP_KEYS.POSTS, slug],
      [GROUP_KEYS.PINNED_POSTS, slug],
      [GROUP_KEYS.MARKETPLACE_POSTS, slug],
    ],
  });
};

// Group Post Bookmark Toggle - Using Common Hook with multiple invalidateKeys
const useToggleBookmarkGroupPost = () => {
  const { slug } = useParams();
  return postHooks.useToggleBookmark({
    queryKey: [[GROUP_KEYS.POSTS, slug]],
    invalidateKey: [
      [GROUP_KEYS.POSTS, slug],
      [GROUP_KEYS.PINNED_POSTS, slug],
      [GROUP_KEYS.MARKETPLACE_POSTS, slug],
    ],
  });
};

// Group Post Pin Toggle - Using Common Hook with multiple invalidateKeys
const useTogglePinGroupPost = () => {
  const { slug } = useParams();
  return postHooks.useTogglePin({
    queryKey: [[GROUP_KEYS.POSTS, slug]],
    invalidateKey: [
      [GROUP_KEYS.POSTS, slug],
      [GROUP_KEYS.PINNED_POSTS, slug],
      [GROUP_KEYS.MARKETPLACE_POSTS, slug],
      [GROUP_KEYS.UNREAD_COUNTS, slug], // Invalidate unread counts on pin/unpin
    ],
  });
};

// ====================================
// Action Button Hooks
// ====================================

const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => groupServices.joinGroup(slug),
    onSuccess: (response, variables) => {
      toast.success(response.message);
      const { slug } = variables;
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.DETAILS, slug] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MEMBERS, slug] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.SENT_REQUESTS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNIVERSITY_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.CAREER_GROUPS] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.INVITED_GROUPS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.SUGGESTED_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
    },
    onError: handleMutationError("Failed to join group"),
  });
};

const useLeaveGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => groupServices.leaveGroup(slug),

    onSuccess: (response, variables) => {
      toast.success(response.message);
      const { slug } = variables;
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.DETAILS, slug] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MEMBERS, slug] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.SUGGESTED_GROUPS],
      });
    },

    onError: handleMutationError("Failed to leave group"),
  });
};

const useCancelJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) =>
      groupServices.cancelJoinRequest(slug),

    onSuccess: (response, variables) => {
      toast.success(response.message);
      const { slug } = variables;
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.DETAILS, slug] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.SENT_REQUESTS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNIVERSITY_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.CAREER_GROUPS] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.INVITED_GROUPS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.SUGGESTED_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
    },

    onError: handleMutationError("Failed to cancel request"),
  });
};

const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => groupServices.deleteGroup(slug),
    onSuccess: (response, variables) => {
      toast.success(response.message);
      const { slug } = variables;
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.DETAILS, slug] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.SENT_REQUESTS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNIVERSITY_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.CAREER_GROUPS] });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.INVITED_GROUPS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.SUGGESTED_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
      navigate("/groups");
    },
    onError: handleMutationError("Failed to delete group"),
  });
};

const useInviteMembers = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ targetUserIds }: { targetUserIds: string[] }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.inviteMembers(slug, targetUserIds);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
    },
    onError: handleMutationError("Failed to invite members"),
  });
};

const useRemoveGroupMember = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.removeMember(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to remove member"),
  });
};

const useAssignGroupAdmin = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.assignAdmin(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to assign admin"),
  });
};

const useRevokeGroupAdmin = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.revokeAdmin(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to revoke admin"),
  });
};

const usePromoteToModerator = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.promoteToModerator(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to promote to moderator"),
  });
};

const usePromoteToAdmin = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.promoteToAdmin(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to promote to admin"),
  });
};

const useDemoteToModerator = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.demoteToModerator(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to demote to moderator"),
  });
};

const useDemoteToMember = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.demoteToMember(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
    },
    onError: handleMutationError("Failed to demote to member"),
  });
};

const useTransferOwnership = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.transferOwnership(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
    },
    onError: handleMutationError("Failed to transfer ownership"),
  });
};

const useBanMember = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.banMember(slug, userId);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.MEMBERS, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
    },
    onError: handleMutationError("Failed to ban member"),
  });
};

const useUpdateGroupDetails = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updateData }: { updateData: Partial<CreateGroupData> }) => {
      return groupServices.updateGroupDetails(slug as string, updateData);
    },
    onSuccess: () => {
      toast.success("Group details updated successfully");
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
    },
    onError: handleMutationError("Failed to update group details"),
  });
};

const useUpdateGroupAvatar = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ avatar }: { avatar: File }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.updateGroupAvatar(slug, avatar);
    },
    onSuccess: () => {
      toast.success("Avatar updated successfully");
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
    },
    onError: handleMutationError("Failed to update avatar"),
  });
};

const useUpdateGroupCoverImage = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ coverImage }: { coverImage: File }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.updateGroupCoverImage(slug, coverImage);
    },
    onSuccess: () => {
      toast.success("Cover image updated successfully");
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
    },
    onError: handleMutationError("Failed to update cover image"),
  });
};

const useUpdateMemberSettings = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      settings,
    }: {
      settings: {
        isMuted?: boolean;
        isFollowing?: boolean;
        isPinned?: boolean;
      };
    }) => {
      if (!slug) throw new Error("Slug not found");
      return groupServices.updateMemberSettings(slug, settings);
    },
    onMutate: async ({ settings }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [GROUP_KEYS.DETAILS, slug] });

      // 1. Optimistically update Group Details
      const previousGroupDetails =
        queryClient.getQueryData<GroupDetailsResponse>([
          GROUP_KEYS.DETAILS,
          slug,
        ]);

      queryClient.setQueryData<GroupDetailsResponse>(
        [GROUP_KEYS.DETAILS, slug],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              meta: {
                ...old.data.meta,
                settings: {
                  ...(old.data.meta.settings || {
                    isMuted: false,
                    isFollowing: true,
                    isPinned: false,
                  }),
                  ...settings,
                },
              },
            },
          };
        }
      );

      return { previousGroupDetails };
    },
    onSuccess: (data) => {
      toast.success(data.message || "Settings updated successfully");
    },
    onError: (
      error: AxiosError<ApiError>,
      _variables,
      context:
        | { previousGroupDetails: GroupDetailsResponse | undefined }
        | undefined
    ) => {
      if (context?.previousGroupDetails) {
        queryClient.setQueryData(
          [GROUP_KEYS.DETAILS, slug],
          context.previousGroupDetails
        );
      }
      handleMutationError(error, "Failed to update settings");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.DETAILS, slug],
      });
      // Invalidate broad lists as pinning affects order/status
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MY_GROUPS] });
      queryClient.invalidateQueries({
        queryKey: [GROUP_KEYS.UNIVERSITY_GROUPS],
      });
      queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.CAREER_GROUPS] });
    },
  });
};

const groupHooks = {
  // Creation & Management
  useCreateGroup,
  useDeleteGroup,
  useUpdateGroupDetails,
  useUpdateGroupAvatar,
  useUpdateGroupCoverImage,

  // Queries - My Groups & Discovery
  useMyGroups,
  useUniversityGroups,
  useCareerGroups,
  useSuggestedGroups,
  useSentGroupRequests,
  useInvitedGroups,
  useSearchGroups,

  // Group Details & Info
  useGroupDetails,
  useGroupUnreadCounts,
  useGroupMembers,

  // Posts - Feed & Content
  useGroupPosts,
  useGroupPinnedPosts,
  useGroupMarketplacePosts,
  useCreateGroupPost,
  useCreateMarketplacePost,
  usePendingPosts,

  // Post Actions
  useUpdateGroupPost,
  useToggleBookmarkGroupPost,
  useTogglePinGroupPost,

  // Post Moderation
  useApprovePost,
  useRejectPost,

  // Membership Actions
  useJoinGroup,
  useLeaveGroup,
  useCancelJoinRequest,
  useInviteMembers,
  useRemoveGroupMember,

  // Join Request Management
  useAcceptJoinRequest,
  useRejectJoinRequest,

  // Member Moderation
  useBanMember,

  // Role Management
  useAssignGroupAdmin,
  useRevokeGroupAdmin,
  usePromoteToModerator,
  usePromoteToAdmin,
  useDemoteToModerator,
  useDemoteToMember,
  useTransferOwnership,

  // Member Settings
  useUpdateMemberSettings,
} as const;

export default groupHooks;
