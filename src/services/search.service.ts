import api from "../lib/axios";
import type { ApiResponse, Pagination } from "../types/common.types";
import type {
  SearchUser,
  SearchPost,
  SearchGroup,
  SearchHashtag,
  SearchComment,
  SearchSuggestion,
} from "../types/search.types";

const searchUsers = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<{
  users: SearchUser[];
  pagination: Pagination;
  query: string;
  searchTime: number;
}>> => {
  const response = await api.get("/search/users", {
    params: { q: query, page, limit },
  });
  return response.data;
};

const searchPosts = async (
  query: string,
  page: number = 1,
  limit: number = 15
): Promise<ApiResponse<{
  posts: SearchPost[];
  pagination: Pagination;
  query: string;
  searchTime: number;
}>> => {
  const response = await api.get("/search/posts", {
    params: { q: query, page, limit },
  });
  return response.data;
};

const searchGroups = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<{
  groups: SearchGroup[];
  pagination: Pagination;
  query: string;
  searchTime: number;
}>> => {
  const response = await api.get("/search/groups", {
    params: { q: query, page, limit },
  });
  return response.data;
};

const searchHashtags = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<{
  hashtags: SearchHashtag[];
  pagination: Pagination;
  query: string;
  searchTime: number;
}>> => {
  const response = await api.get("/search/hashtags", {
    params: { q: query, page, limit },
  });
  return response.data;
};

const searchComments = async (
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<{
  comments: SearchComment[];
  pagination: Pagination;
  query: string;
  searchTime: number;
}>> => {
  const response = await api.get("/search/comments", {
    params: { q: query, page, limit },
  });
  return response.data;
};

const getSuggestions = async (
  query: string
): Promise<ApiResponse<{ suggestions: SearchSuggestion[] }>> => {
  const response = await api.get<ApiResponse<{ suggestions: SearchSuggestion[] }>>(
    "/search/suggestions",
    { params: { q: query } }
  );
  return response.data;
};

const searchServices = {
  searchUsers,
  searchPosts,
  searchGroups,
  searchHashtags,
  searchComments,
  getSuggestions,
} as const;

export default searchServices;
