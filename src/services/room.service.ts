import api from "../lib/axios";
import { ROOM_LIMIT, MEMBERS_LIMIT, POST_LIMIT } from "../constants";
import type {
  CreateRoomResponse,
  MyRoomsResponse,
  RoomDetailsResponse,
  JoinRoomResponse,
  ToggleArchiveRoomResponse,
  HideRoomResponse,
  DeleteRoomResponse,
  UpdateRoomResponse,
  UpdateRoomData,
  FeedPostsResponse,
  RoomMembersResponse,
  BaseRoomActionResponse,
  RoomPendingRequestsResponse,
} from "../types";

const createRoom = async (roomData: {
  name: string;
  description?: string;
  roomType: string;
  allowStudentPosting: boolean;
  allowComments: boolean;
}): Promise<CreateRoomResponse> => {
  const response = await api.post<CreateRoomResponse>("/rooms", roomData);
  return response.data;
};

const getMyRooms = async (page: number): Promise<MyRoomsResponse> => {
  const limit = ROOM_LIMIT;
  const response = await api.get<MyRoomsResponse>("/rooms/myRooms", {
    params: { page, limit },
  });
  return response.data;
};

const getHiddenRooms = async (page: number): Promise<MyRoomsResponse> => {
  const limit = ROOM_LIMIT;
  const response = await api.get<MyRoomsResponse>("/rooms/hiddenRooms", {
    params: { page, limit },
  });
  return response.data;
};

const getArchivedRooms = async (page: number): Promise<MyRoomsResponse> => {
  const limit = ROOM_LIMIT;
  const response = await api.get<MyRoomsResponse>("/rooms/archivedRooms", {
    params: { page, limit },
  });
  return response.data;
};

const getRoomDetails = async (roomId: string): Promise<RoomDetailsResponse> => {
  const response = await api.get<RoomDetailsResponse>(`/rooms/${roomId}`);
  return response.data;
};

const joinRoom = async (joinCode: string): Promise<JoinRoomResponse> => {
  const response = await api.post<JoinRoomResponse>("/rooms/join", {
    joinCode,
  });
  return response.data;
};

const toggleArchiveRoom = async (
  roomId: string
): Promise<ToggleArchiveRoomResponse> => {
  const response = await api.patch<ToggleArchiveRoomResponse>(
    `/rooms/${roomId}/archive`
  );
  return response.data;
};

const deleteRoom = async (roomId: string): Promise<DeleteRoomResponse> => {
  const response = await api.delete<DeleteRoomResponse>(`/rooms/${roomId}`);
  return response.data;
};

const hideRoom = async (roomId: string): Promise<HideRoomResponse> => {
  const response = await api.patch<HideRoomResponse>(`/rooms/${roomId}/hide`);
  return response.data;
};

const updateRoom = async (
  roomId: string,
  updateData: UpdateRoomData
): Promise<UpdateRoomResponse> => {
  const response = await api.patch<UpdateRoomResponse>(
    `/rooms/${roomId}`,
    updateData
  );
  return response.data;
};

const updateRoomCoverImage = async (
  roomId: string,
  coverImage: File
): Promise<UpdateRoomResponse> => {
  const formData = new FormData();
  formData.append("coverImage", coverImage);
  const response = await api.patch<UpdateRoomResponse>(
    `/rooms/${roomId}/cover-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const getRoomPosts = async (
  roomId: string,
  page: number
): Promise<FeedPostsResponse> => {
  const limit = POST_LIMIT;
  const response = await api.get<FeedPostsResponse>(
    `/rooms/${roomId}/posts`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const getRoomMembers = async (
  roomId: string,
  page: number
): Promise<RoomMembersResponse> => {
  const limit = MEMBERS_LIMIT;
  const response = await api.get<RoomMembersResponse>(
    `/rooms/${roomId}/members`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const leaveRoom = async (roomId: string): Promise<BaseRoomActionResponse> => {
  const response = await api.delete<BaseRoomActionResponse>(
    `/rooms/${roomId}/leave`
  );
  return response.data;
};

const cancelJoinRequest = async (
  roomId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.delete<BaseRoomActionResponse>(
    `/rooms/${roomId}/cancel-request`
  );
  return response.data;
};

const acceptJoinRequest = async (
  roomId: string,
  userId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.patch<BaseRoomActionResponse>(
    `/rooms/${roomId}/accept/${userId}`
  );
  return response.data;
};

const rejectJoinRequest = async (
  roomId: string,
  userId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.patch<BaseRoomActionResponse>(
    `/rooms/${roomId}/reject/${userId}`
  );
  return response.data;
};

const banMember = async (
  roomId: string,
  userId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.patch<BaseRoomActionResponse>(
    `/rooms/${roomId}/ban/${userId}`
  );
  return response.data;
};

const removeMember = async (
  roomId: string,
  userId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.delete<BaseRoomActionResponse>(
    `/rooms/${roomId}/remove/${userId}`
  );
  return response.data;
};

const promoteMember = async (
  roomId: string,
  userId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.patch<BaseRoomActionResponse>(
    `/rooms/${roomId}/promote/${userId}`
  );
  return response.data;
};

const demoteMember = async (
  roomId: string,
  userId: string
): Promise<BaseRoomActionResponse> => {
  const response = await api.patch<BaseRoomActionResponse>(
    `/rooms/${roomId}/demote/${userId}`
  );
  return response.data;
};

const getRoomPendingRequests = async (
  roomId: string,
  page: number
): Promise<RoomPendingRequestsResponse> => {
  const limit = MEMBERS_LIMIT;
  const response = await api.get<RoomPendingRequestsResponse>(
    `/rooms/${roomId}/requests`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const getRoomPendingPosts = async (
  roomId: string,
  page: number
): Promise<FeedPostsResponse> => {
  const limit = POST_LIMIT;
  const response = await api.get<FeedPostsResponse>(
    `/rooms/${roomId}/pending-posts`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const approveRoomPost = async (
  roomId: string,
  postId: string
): Promise<{ status: string }> => {
  const response = await api.patch<{ status: string }>(
    `/rooms/${roomId}/posts/${postId}/approve`
  );
  return response.data;
};

const rejectRoomPost = async (
  roomId: string,
  postId: string
): Promise<{ status: string }> => {
  const response = await api.patch<{ status: string }>(
    `/rooms/${roomId}/posts/${postId}/reject`
  );
  return response.data;
};

export const roomServices = {
  createRoom,
  getMyRooms,
  getHiddenRooms,
  getArchivedRooms,
  getRoomDetails,
  joinRoom,
  toggleArchiveRoom,
  deleteRoom,
  hideRoom,
  updateRoom,
  updateRoomCoverImage,
  getRoomPosts,
  getRoomMembers,
  leaveRoom,
  cancelJoinRequest,
  acceptJoinRequest,
  rejectJoinRequest,
  banMember,
  removeMember,
  promoteMember,
  demoteMember,
  getRoomPendingRequests,
  getRoomPendingPosts,
  approveRoomPost,
  rejectRoomPost,
} as const;

export default roomServices;
