import { GROUP_LIMIT, MEMBERS_LIMIT, POST_LIMIT } from "../constants";
import api from "../lib/axios";
import type {
  MyGroupsResponse,
  GroupMembersResponse,
  FeedPostsResponse,
  GroupDetailsResponse,
  GroupUnreadCountsResponse,
  PendingPostsResponse,
  PostActionResponse,
} from "../types";

import type { CreateGroupData } from "../types/group.types";

const createGroup = async (groupData: CreateGroupData) => {
  const response = await api.post("/groups", groupData);
  return response.data;
};

const getGroupDetails = async (slug: string): Promise<GroupDetailsResponse> => {
  const response = await api.get<GroupDetailsResponse>(`/groups/${slug}`);
  return response.data;
};

const getGroupUnreadCounts = async (
  slug: string
): Promise<GroupUnreadCountsResponse> => {
  const response = await api.get<GroupUnreadCountsResponse>(
    `/groups/${slug}/unread-counts`
  );
  return response.data;
};

const getGroupPosts = async (slug: string, page = 1): Promise<FeedPostsResponse> => {
  const limit = POST_LIMIT;
  const response = await api.get<FeedPostsResponse>(`/groups/${slug}/feed`, {
    params: { page, limit },
  });
  return response.data;
};

const getGroupPinnedPosts = async (
  slug: string,
  page = 1
): Promise<FeedPostsResponse> => {
  const limit = POST_LIMIT;
  const response = await api.get<FeedPostsResponse>(
    `/groups/${slug}/pinned`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const getGroupMarketplacePosts = async (
  slug: string,
  page = 1
): Promise<FeedPostsResponse> => {
  const limit = 2; // Keep this specific limit for marketplace
  const response = await api.get<FeedPostsResponse>(
    `/groups/${slug}/marketplace`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const getMyGroups = async (page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(`/groups/myGroups`, {
    params: { page, limit },
  });
  return response.data;
};

const getUniversityGroups = async (page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(
    `/groups/universityGroups`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const getCareerGroups = async (page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(`/groups/careerGroups`, {
    params: { page, limit },
  });
  return response.data;
};

const getSuggestedGroups = async (page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(
    `/groups/suggestedGroups`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};

const getSentRequests = async (page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(`/groups/sentRequests`, {
    params: { page, limit },
  });
  return response.data;
};

const getInvitedGroups = async (page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(`/groups/invitedGroups`, {
    params: { page, limit },
  });
  return response.data;
};

const searchGroups = async (query: string, page = 1): Promise<MyGroupsResponse> => {
  const limit = GROUP_LIMIT;
  const response = await api.get<MyGroupsResponse>(`/groups/search`, {
    params: { q: query, page, limit },
  });
  return response.data;
};

const leaveGroup = async (slug: string) => {
  const response = await api.delete(`/groups/${slug}/leave`);
  return response.data;
};

const joinGroup = async (slug: string) => {
  const response = await api.post(`/groups/${slug}/join`);
  return response.data;
};

const acceptJoinRequest = async (slug: string, userId: string) => {
  const response = await api.post(`/groups/${slug}/accept`, { userId });
  return response.data;
};

const rejectJoinRequest = async (slug: string, userId: string) => {
  const response = await api.post(`/groups/${slug}/reject`, { userId });
  return response.data;
};

const cancelJoinRequest = async (slug: string) => {
  const response = await api.post(`/groups/${slug}/cancel`);
  return response.data;
};

const deleteGroup = async (slug: string) => {
  const response = await api.delete(`/groups/${slug}`);
  return response.data;
};

const inviteMembers = async (slug: string, targetUserIds: string | string[]) => {
  const ids = Array.isArray(targetUserIds) ? targetUserIds : [targetUserIds];
  const response = await api.post(`/groups/${slug}/invite`, {
    targetUserIds: ids,
  });
  return response.data;
};

const removeMember = async (slug: string, userId: string) => {
  const response = await api.delete(`/groups/${slug}/members/${userId}`);
  return response.data;
};

const assignAdmin = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/assign-admin`
  );
  return response.data;
};

const revokeAdmin = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/revoke-admin`
  );
  return response.data;
};

const promoteToModerator = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/promote-moderator`
  );
  return response.data;
};

const promoteToAdmin = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/promote-admin`
  );
  return response.data;
};

const demoteToModerator = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/demote-moderator`
  );
  return response.data;
};

const demoteToMember = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/demote-member`
  );
  return response.data;
};

const transferOwnership = async (slug: string, userId: string) => {
  const response = await api.patch(
    `/groups/${slug}/members/${userId}/transfer-ownership`
  );
  return response.data;
};

const banMember = async (slug: string, userId: string) => {
  const response = await api.patch(`/groups/${slug}/members/${userId}/ban`);
  return response.data;
};

const getGroupMembers = async (
  slug: string,
  page = 1,
  status: string
): Promise<GroupMembersResponse> => {
  const limit = MEMBERS_LIMIT;
  const response = await api.get<GroupMembersResponse>(
    `/groups/${slug}/members`,
    {
      params: { page, limit, status },
    }
  );
  return response.data;
};

const updateGroupDetails = async (
  slug: string,
  updateData: Partial<CreateGroupData>
) => {
  const response = await api.patch(`/groups/${slug}/details`, updateData);
  return response.data;
};

const updateGroupAvatar = async (slug: string, avatar: File) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  const response = await api.patch(`/groups/${slug}/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const updateGroupCoverImage = async (slug: string, coverImage: File) => {
  const formData = new FormData();
  formData.append("coverImage", coverImage);
  const response = await api.patch(`/groups/${slug}/cover-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const updateMemberSettings = async (
  slug: string,
  settings: {
    isMuted?: boolean;
    isFollowing?: boolean;
    isPinned?: boolean;
    isFavorite?: boolean;
  }
) => {
  const response = await api.patch(
    `/groups/${slug}/membership/settings`,
    settings
  );
  return response.data;
};

const getPendingPosts = async (
  slug: string,
  page: number = 1
): Promise<PendingPostsResponse> => {
  const response = await api.get(`/groups/${slug}/pending-posts`, {
    params: { page, limit: 10 },
  });
  return response.data;
};

const approvePost = async (
  slug: string,
  postId: string
): Promise<PostActionResponse> => {
  const response = await api.patch(`/groups/${slug}/posts/${postId}/approve`);
  return response.data;
};

const rejectPost = async (
  slug: string,
  postId: string
): Promise<PostActionResponse> => {
  const response = await api.patch(`/groups/${slug}/posts/${postId}/reject`);
  return response.data;
};

export const groupServices = {
  createGroup,
  getGroupDetails,
  getGroupUnreadCounts,
  getGroupPosts,
  getGroupPinnedPosts,
  getGroupMarketplacePosts,
  getMyGroups,
  getUniversityGroups,
  getCareerGroups,
  getSuggestedGroups,
  getSentRequests,
  getInvitedGroups,
  searchGroups,
  leaveGroup,
  joinGroup,
  acceptJoinRequest,
  rejectJoinRequest,
  cancelJoinRequest,
  deleteGroup,
  inviteMembers,
  removeMember,
  assignAdmin,
  revokeAdmin,
  promoteToModerator,
  promoteToAdmin,
  demoteToModerator,
  demoteToMember,
  transferOwnership,
  banMember,
  getGroupMembers,
  updateGroupDetails,
  updateGroupAvatar,
  updateGroupCoverImage,
  updateMemberSettings,
  getPendingPosts,
  approvePost,
  rejectPost,
} as const;

export default groupServices;
