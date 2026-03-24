import api from "../../lib/axios";
import type { CreatePostRequest } from "../../types";

// Create Post
const createPost = async (reqData: CreatePostRequest) => {
  const response = await api.post("/posts", reqData);
  return response.data;
};

// Like / Unlike Post
const togglePostLike = async (postId: string) => {
  const { data } = await api.post(`/posts/${postId}/toggle-like`);
  return data;
};

// Delete Post
const deletePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

// Update Post
const updatePost = async (
  postId: string,
  data: { content: string; tags?: string[]; visibility?: string }
) => {
  const response = await api.patch(`/posts/${postId}`, data);
  return response.data;
};

// Toggle Read Status
const togglePostRead = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/toggle-read`);
  return response.data;
};

// Toggle Bookmark (Save Post)
const toggleBookmark = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/toggle-bookmark`);
  return response.data;
};

// Toggle Pin (Pin/Unpin Post)
const togglePin = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/toggle-pin`);
  return response.data;
};

const postServices = {
  createPost,
  togglePostLike,
  deletePost,
  updatePost,
  togglePostRead,
  toggleBookmark,
  togglePin,
} as const;

export default postServices;
