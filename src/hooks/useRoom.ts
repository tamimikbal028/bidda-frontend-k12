import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { roomServices } from "../services/room.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import type { UpdateRoomData } from "../types";
import { ROOM_KEYS } from "../constants";
import { handleMutationError } from "../utils/errorHandler";
import postHooks from "./common/usePost";

const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (roomData: {
      name: string;
      description?: string;
      roomType: string;
      allowStudentPosting: boolean;
      allowComments: boolean;
    }) => roomServices.createRoom(roomData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });

      const roomId = data.data.room._id;
      if (roomId) {
        navigate(`/rooms/${roomId}`);
      }
    },
    onError: handleMutationError("Failed to create room"),
  });
};

const useMyRooms = () => {
  return useInfiniteQuery({
    queryKey: ["myRooms", "infinite"],
    queryFn: ({ pageParam }) => roomServices.getMyRooms(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useHiddenRooms = () => {
  return useInfiniteQuery({
    queryKey: ["hiddenRooms", "infinite"],
    queryFn: ({ pageParam }) =>
      roomServices.getHiddenRooms(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useArchivedRooms = () => {
  return useInfiniteQuery({
    queryKey: ["archivedRooms", "infinite"],
    queryFn: ({ pageParam }) =>
      roomServices.getArchivedRooms(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useRoomDetails = () => {
  const { roomId } = useParams();
  return useQuery({
    queryKey: [ROOM_KEYS.DETAILS, roomId],
    queryFn: () => roomServices.getRoomDetails(roomId as string),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};

const useJoinRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (joinCode: string) => roomServices.joinRoom(joinCode),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });

      // Navigate to room details
      const roomId = data.data.roomId;
      if (roomId) {
        navigate(`/classroom/rooms/${roomId}`);
      }
    },
    onError: handleMutationError("Failed to join room"),
  });
};

const useToggleArchiveRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (roomId: string) => roomServices.toggleArchiveRoom(roomId),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate all 3 tabs
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
      queryClient.invalidateQueries({ queryKey: ["hiddenRooms"] });
      queryClient.invalidateQueries({ queryKey: ["archivedRooms"] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });

      // Redirect based on archive status
      navigate(data.data.isArchived ? "/classroom/archived" : "/classroom");
    },
    onError: handleMutationError("Failed to archive/unarchive room"),
  });
};

const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (roomId: string) => roomServices.deleteRoom(roomId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
      navigate("/classroom");
    },
    onError: handleMutationError("Failed to delete room"),
  });
};

const useLeaveRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (roomId: string) => roomServices.leaveRoom(roomId),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate all room queries
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
      queryClient.invalidateQueries({ queryKey: ["hiddenRooms"] });
      queryClient.invalidateQueries({ queryKey: ["archivedRooms"] });

      // Navigate back to classroom
      navigate("/classroom");
    },
    onError: handleMutationError("Failed to leave room"),
  });
};

const useHideRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (roomId: string) => roomServices.hideRoom(roomId),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate all 3 tabs
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
      queryClient.invalidateQueries({ queryKey: ["hiddenRooms"] });
      queryClient.invalidateQueries({ queryKey: ["archivedRooms"] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });

      // Redirect based on hide status
      navigate(data.data.isHidden ? "/classroom/hidden" : "/classroom");
    },
    onError: handleMutationError("Failed to hide/unhide room"),
  });
};

const useUpdateRoomDetails = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updateData }: { updateData: Partial<UpdateRoomData> }) =>
      roomServices.updateRoom(roomId as string, updateData as UpdateRoomData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
    },
    onError: handleMutationError("Failed to update room details"),
  });
};

const useUpdateRoomCoverImage = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coverImage: File) =>
      roomServices.updateRoomCoverImage(roomId as string, coverImage),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });
      queryClient.invalidateQueries({ queryKey: ["myRooms"] });
    },
    onError: handleMutationError("Failed to update room cover image"),
  });
};

// ====================================
// Room Posts & Members
// ====================================

const useRoomPosts = () => {
  const { roomId } = useParams();
  return useInfiniteQuery({
    queryKey: [ROOM_KEYS.POSTS, roomId],
    queryFn: ({ pageParam }) =>
      roomServices.getRoomPosts(roomId as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!roomId,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

const useRoomMembers = () => {
  const { roomId } = useParams();
  return useInfiniteQuery({
    queryKey: [ROOM_KEYS.MEMBERS, roomId],
    queryFn: ({ pageParam }) =>
      roomServices.getRoomMembers(roomId as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!roomId,
    staleTime: Infinity,
  });
};

// Room Post Actions - Using Common Hooks
const useCreateRoomPost = () => {
  const { roomId } = useParams();
  return postHooks.useCreatePost({
    invalidateKey: [
      [ROOM_KEYS.POSTS, roomId],
      [ROOM_KEYS.DETAILS, roomId],
    ],
  });
};

const useUpdateRoomPost = () => {
  const { roomId } = useParams();
  return postHooks.useUpdatePost({
    queryKey: [[ROOM_KEYS.POSTS, roomId]],
    invalidateKey: [[ROOM_KEYS.POSTS, roomId]],
  });
};

const useToggleBookmarkRoomPost = () => {
  const { roomId } = useParams();
  return postHooks.useToggleBookmark({
    queryKey: [[ROOM_KEYS.POSTS, roomId]],
    invalidateKey: [[ROOM_KEYS.POSTS, roomId]],
  });
};

// ====================================
// Join Request Management
// ====================================

const useCancelJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => roomServices.cancelJoinRequest(roomId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });
    },
    onError: handleMutationError("Failed to cancel join request"),
  });
};

const useAcceptJoinRequest = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      roomServices.acceptJoinRequest(roomId as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["roomPendingRequests", roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.DETAILS, roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.MEMBERS, roomId],
      });
    },
    onError: handleMutationError("Failed to accept request"),
  });
};

const useRejectJoinRequest = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      roomServices.rejectJoinRequest(roomId as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["roomPendingRequests", roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.DETAILS, roomId],
      });
    },
    onError: handleMutationError("Failed to reject request"),
  });
};

const useBanMember = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      roomServices.banMember(roomId as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.MEMBERS, roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.DETAILS, roomId],
      });
    },
    onError: handleMutationError("Failed to ban member"),
  });
};

const useRemoveRoomMember = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      roomServices.removeMember(roomId as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.MEMBERS, roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.DETAILS, roomId],
      });
    },
    onError: handleMutationError("Failed to remove member"),
  });
};

const usePromoteRoomMember = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      roomServices.promoteMember(roomId as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.MEMBERS, roomId],
      });
    },
    onError: handleMutationError("Failed to promote member"),
  });
};

const useDemoteRoomMember = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      roomServices.demoteMember(roomId as string, userId),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [ROOM_KEYS.MEMBERS, roomId],
      });
    },
    onError: handleMutationError("Failed to demote member"),
  });
};

const useRoomPendingRequests = () => {
  const { roomId } = useParams();
  return useInfiniteQuery({
    queryKey: ["roomPendingRequests", roomId],
    queryFn: ({ pageParam }) =>
      roomServices.getRoomPendingRequests(
        roomId as string,
        pageParam as number
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!roomId,
    staleTime: Infinity,
  });
};

const useRoomPendingPosts = () => {
  const { roomId } = useParams();
  return useInfiniteQuery({
    queryKey: ["roomPendingPosts", roomId],
    queryFn: ({ pageParam }) =>
      roomServices.getRoomPendingPosts(roomId as string, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!roomId,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

const useApproveRoomPost = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      roomServices.approveRoomPost(roomId as string, postId),
    onSuccess: () => {
      toast.success("Post approved successfully");
      queryClient.invalidateQueries({ queryKey: ["roomPendingPosts", roomId] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.POSTS, roomId] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS, roomId] });
    },
    onError: handleMutationError("Failed to approve post"),
  });
};

const useRejectRoomPost = () => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      roomServices.rejectRoomPost(roomId as string, postId),
    onSuccess: () => {
      toast.success("Post rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["roomPendingPosts", roomId] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS, roomId] });
    },
    onError: handleMutationError("Failed to reject post"),
  });
};

const roomHooks = {
  useCreateRoom,
  useMyRooms,
  useHiddenRooms,
  useArchivedRooms,
  useRoomDetails,
  useJoinRoom,
  useToggleArchiveRoom,
  useDeleteRoom,
  useLeaveRoom,
  useHideRoom,
  useUpdateRoomDetails,
  useUpdateRoomCoverImage,

  // Posts & Members
  useRoomPosts,
  useRoomMembers,
  useRoomPendingRequests,

  // Post Actions
  useCreateRoomPost,
  useUpdateRoomPost,
  useToggleBookmarkRoomPost,

  // Join Request Management
  useCancelJoinRequest,
  useAcceptJoinRequest,
  useRejectJoinRequest,
  useBanMember,
  useRemoveRoomMember,
  usePromoteRoomMember,
  useDemoteRoomMember,

  // Post Moderation
  useRoomPendingPosts,
  useApproveRoomPost,
  useRejectRoomPost,
} as const;

export default roomHooks;
