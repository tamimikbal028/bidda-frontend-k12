import { GROUP_MEMBERSHIP_STATUS } from "../constants";
import type { Post } from "./post.types";

export type SearchType = "posts" | "hashtags" | "comments";

// Search Result Items

// Search User (Person)
export interface SearchUser {
  _id: string;
  fullName: string;
  userName: string;
  avatar: string;
  userType: string;
  institution?: {
    _id: string;
    name: string;
  };
  academicInfo?: {
    department?: {
      _id: string;
      name: string;
    };
  };
  relationStatus?: "friend" | "request" | "suggestion" | "sent";
}

// Search Group
export interface SearchGroup {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  avatar: string;
  privacy: string;
  type: string;
  membersCount: number;
  postsCount: number;
  userMembership?: (typeof GROUP_MEMBERSHIP_STATUS)[keyof typeof GROUP_MEMBERSHIP_STATUS];
}

export type SearchPost = Post;

// Search Hashtag
export interface SearchHashtag {
  name: string;
  count: number; // Usage count
}

// Search Comment
export interface SearchComment {
  _id: string;
  content: string;
  author: {
    fullName: string;
    userName: string;
    avatar: string;
  };
  post?: string;
}

export interface SearchSuggestion {
  id: string; // Changed from _id to id
  text: string;
  type: "user" | "group" | "hashtag";
  subtitle?: string; // Changed from subText to subtitle
  avatar?: string; // Changed from image to avatar
  slug?: string; // for groups
  userName?: string; // for users
}
