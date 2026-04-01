import {
  POST_TYPES,
  POST_TARGET_MODELS,
  POST_VISIBILITY,
  POST_STATUS,
} from "../constants/post";
import type { Pagination, ApiResponse } from "./index";

export interface Attachment {
  type: "IMAGE" | "VIDEO" | "PDF" | "DOC" | "LINK";
  url: string;
  name?: string;
}

// Post Details Type
export interface Post {
  _id: string;
  content: string;
  attachments: Attachment[];
  tags?: string[];

  type: (typeof POST_TYPES)[keyof typeof POST_TYPES];
  postOnModel: (typeof POST_TARGET_MODELS)[keyof typeof POST_TARGET_MODELS];

  visibility: (typeof POST_VISIBILITY)[keyof typeof POST_VISIBILITY];
  status?: (typeof POST_STATUS)[keyof typeof POST_STATUS];

  // Display fields (unified for all post types)
  displayName: string;
  displayAvatar: string | null;
  displayUrl: string;

  // Stats
  likesCount: number;
  commentsCount: number;
  sharesCount: number;

  // Edit status
  isEdited: boolean;
  editedAt?: string;

  // Flags
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface PostMeta {
  isLiked: boolean;
  isRead: boolean;
  isSaved: boolean;
  canEdit: boolean;
  canPin: boolean;
  canDelete: boolean;
}

export interface PostResponseItem {
  post: Post;
  meta: PostMeta;
}

export type FeedPostsResponse = ApiResponse<{
  posts: PostResponseItem[];
  pagination: Pagination;
}>;

export interface CreatePostRequest {
  content: string;
  visibility: (typeof POST_VISIBILITY)[keyof typeof POST_VISIBILITY];
  postOnId: string;
  postOnModel: (typeof POST_TARGET_MODELS)[keyof typeof POST_TARGET_MODELS];
  type: (typeof POST_TYPES)[keyof typeof POST_TYPES];
  attachments: Attachment[];
  pollOptions: string[];
  tags: string[];
}
