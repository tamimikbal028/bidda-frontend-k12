import api from "../lib/axios";
import type {
  ApiResponse,
  SendFriendRequestData,
  AcceptFriendRequestData,
  RejectFriendRequestData,
  CancelFriendRequestData,
  UnfriendData,
  BlockData,
  UnblockData,
  FriendshipListData,
} from "../types";
import { FRIENDS_LIMIT } from "../constants/pagination";

const sendRequest = async (
  userId: string
): Promise<ApiResponse<SendFriendRequestData>> => {
  const response = await api.post(`/friendships/request/send/${userId}`);
  return response.data;
};

const acceptRequest = async (
  requesterId: string
): Promise<ApiResponse<AcceptFriendRequestData>> => {
  const response = await api.patch(
    `/friendships/request/accept/${requesterId}`
  );
  return response.data;
};

const rejectRequest = async (
  requesterId: string
): Promise<ApiResponse<RejectFriendRequestData>> => {
  const response = await api.delete(
    `/friendships/request/reject/${requesterId}`
  );
  return response.data;
};

const cancelRequest = async (
  recipientId: string
): Promise<ApiResponse<CancelFriendRequestData>> => {
  const response = await api.delete(
    `/friendships/request/cancel/${recipientId}`
  );
  return response.data;
};

const unfriend = async (
  friendId: string
): Promise<ApiResponse<UnfriendData>> => {
  const response = await api.delete(`/friendships/unfriend/${friendId}`);
  return response.data;
};

const block = async (userId: string): Promise<ApiResponse<BlockData>> => {
  const response = await api.post(`/friendships/block/${userId}`);
  return response.data;
};

const unblock = async (userId: string): Promise<ApiResponse<UnblockData>> => {
  const response = await api.delete(`/friendships/unblock/${userId}`);
  return response.data;
};

const getFriendsList = async (
  page = 1
): Promise<ApiResponse<FriendshipListData>> => {
  const response = await api.get("/friendships/list", {
    params: { page, limit: FRIENDS_LIMIT },
  });
  return response.data;
};

const getReceivedRequests = async (
  page = 1
): Promise<ApiResponse<FriendshipListData>> => {
  const response = await api.get("/friendships/requests/received", {
    params: { page, limit: FRIENDS_LIMIT },
  });
  return response.data;
};

const getSentRequests = async (
  page = 1
): Promise<ApiResponse<FriendshipListData>> => {
  const response = await api.get("/friendships/requests/sent", {
    params: { page, limit: FRIENDS_LIMIT },
  });
  return response.data;
};

const getSuggestions = async (
  page = 1
): Promise<ApiResponse<FriendshipListData>> => {
  const response = await api.get("/friendships/suggestions", {
    params: { page, limit: FRIENDS_LIMIT },
  });
  return response.data;
};

const searchFriends = async (
  query: string,
  page: number = 1
): Promise<ApiResponse<FriendshipListData>> => {
  const response = await api.get("/friendships/search", {
    params: { q: query, page, limit: FRIENDS_LIMIT },
  });
  return response.data;
};

const friendServices = {
  sendRequest,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  unfriend,
  block,
  unblock,
  getFriendsList,
  getReceivedRequests,
  getSentRequests,
  getSuggestions,
  searchFriends,
} as const;

export default friendServices;
