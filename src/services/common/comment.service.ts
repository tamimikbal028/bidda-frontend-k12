import { COMMENT_LIMIT } from "../../constants";
import api from "../../lib/axios";
import type { CommentsResponse, AddCommentResponse } from "../../types";

// Get comments for a post
const getPostComments = async (postId: string, page: number = 1) => {
  const response = await api.get<CommentsResponse>(`/comments/${postId}`, {
    params: { page, limit: COMMENT_LIMIT },
  });
  return response.data;
};

// Add a comment to a post
const addComment = async (postId: string, content: string) => {
  const response = await api.post<AddCommentResponse>(`/comments/${postId}`, {
    content,
  });
  return response.data;
};

// Delete a comment
const deleteComment = async (commentId: string) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};

// Update a comment
const updateComment = async (commentId: string, content: string) => {
  const response = await api.patch(`/comments/${commentId}`, {
    content,
  });
  return response.data;
};

// Toggle like comment
const toggleLikeComment = async (commentId: string) => {
  const response = await api.post(`/comments/${commentId}/toggle-like`);
  return response.data;
};

const commentServices = {
  getPostComments,
  addComment,
  deleteComment,
  updateComment,
  toggleLikeComment,
} as const;

export default commentServices;
