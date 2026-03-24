import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  PROFILE_KEYS,
  FRIENDSHIP_KEYS,
  GROUP_KEYS,
  ROOM_KEYS,
} from "../../constants";
import friendServices from "../../services/friendship.service";
import { handleMutationError } from "../../utils/errorHandler";

// Helper to invalidate all friendship-related queries
const invalidateAllFriendshipQueries = (
  queryClient: ReturnType<typeof useQueryClient>
) => {
  // Profile related
  queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.HEADER] });

  // Friend page related
  queryClient.invalidateQueries({ queryKey: [FRIENDSHIP_KEYS.FRIENDS] });
  queryClient.invalidateQueries({ queryKey: [FRIENDSHIP_KEYS.REQUESTS] });
  queryClient.invalidateQueries({ queryKey: [FRIENDSHIP_KEYS.SENT_REQUESTS] });
  queryClient.invalidateQueries({ queryKey: [FRIENDSHIP_KEYS.SUGGESTIONS] });

  // Group members - all groups (marks stale, fetches only when active)
  queryClient.invalidateQueries({ queryKey: [GROUP_KEYS.MEMBERS] });

  // Room members - all rooms (marks stale, fetches only when active)
  queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.MEMBERS] });
};

// 1. Send Friend Request
const useSendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      friendServices.sendRequest(userId),
    onSuccess: (response) => {
      toast.success(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// 2. Accept Friend Request
const useAcceptRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requesterId }: { requesterId: string }) =>
      friendServices.acceptRequest(requesterId),
    onSuccess: (response) => {
      toast.success(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// 3. Reject Friend Request
const useRejectRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requesterId }: { requesterId: string }) =>
      friendServices.rejectRequest(requesterId),
    onSuccess: (response) => {
      toast.info(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// 4. Cancel Sent Request
const useCancelRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipientId }: { recipientId: string }) =>
      friendServices.cancelRequest(recipientId),
    onSuccess: (response) => {
      toast.info(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// 5. Unfriend User
const useUnfriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ friendId }: { friendId: string }) =>
      friendServices.unfriend(friendId),
    onSuccess: (response) => {
      toast.info(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// 6. Block User
const useBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      friendServices.block(userId),
    onSuccess: (response) => {
      toast.success(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// 7. Unblock User
const useUnblock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      friendServices.unblock(userId),
    onSuccess: (response) => {
      toast.success(response.message);
      invalidateAllFriendshipQueries(queryClient);
    },
    onError: handleMutationError("Operation failed"),
  });
};

// ====================================
// Friend Page Hooks (Queries)
// ====================================

// 8. Get Friends List Hook
const useFriendsList = () => {
  return useInfiniteQuery({
    queryKey: [FRIENDSHIP_KEYS.FRIENDS],
    queryFn: ({ pageParam }) =>
      friendServices.getFriendsList(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

// 9. Get Received Requests Hook
const useReceivedRequests = () => {
  return useInfiniteQuery({
    queryKey: [FRIENDSHIP_KEYS.REQUESTS],
    queryFn: ({ pageParam }) =>
      friendServices.getReceivedRequests(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

// 10. Get Sent Requests Hook
const useSentRequests = () => {
  return useInfiniteQuery({
    queryKey: [FRIENDSHIP_KEYS.SENT_REQUESTS],
    queryFn: ({ pageParam }) =>
      friendServices.getSentRequests(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

// 11. Get Suggestions Hook
const useFriendSuggestions = () => {
  return useInfiniteQuery({
    queryKey: [FRIENDSHIP_KEYS.SUGGESTIONS],
    queryFn: ({ pageParam }) =>
      friendServices.getSuggestions(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

// 12. Search Friends Hook
const useSearchFriends = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["friendSearch", query],
    queryFn: ({ pageParam }) =>
      friendServices.searchFriends(query, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: query.trim().length >= 2,
  });
};

const friendshipHooks = {
  // Actions
  useSendRequest,
  useAcceptRequest,
  useRejectRequest,
  useCancelRequest,
  useUnfriend,
  useBlock,
  useUnblock,
  // Queries
  useFriendsList,
  useReceivedRequests,
  useSentRequests,
  useFriendSuggestions,
  useSearchFriends,
} as const;

export default friendshipHooks;
