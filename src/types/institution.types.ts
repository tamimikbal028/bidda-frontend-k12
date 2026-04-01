import type { Pagination } from "./common.types";
import type { PostMeta, Post } from "./post.types";
import { INSTITUTION_TYPES, INSTITUTION_CATEGORY } from "../constants";

export interface Institution {
  _id: string;
  name: string;
  code: string;
  type: (typeof INSTITUTION_TYPES)[keyof typeof INSTITUTION_TYPES];
  category: (typeof INSTITUTION_CATEGORY)[keyof typeof INSTITUTION_CATEGORY];
  location: string;
  website?: string;
  contactEmails?: string[];
  description?: string;
  logo: string | null;
  coverImage?: string | null;
  postsCount: number;
  followersCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionHeaderData {
  _id: string;
  name: string;
  logo: string | null;
  coverImage: string | null;
  website?: string;
  location: string;
  isActive: boolean;
}

export interface InstitutionHeaderMeta {
  isFollowing: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isMember: boolean;
}

export interface InstitutionHeaderResponse {
  institution: InstitutionHeaderData;
  meta: InstitutionHeaderMeta;
}

export interface InstitutionDetailsResponse {
  institution: Institution;
}

export interface InstitutionPostResponseItem {
  post: Post;
  meta: PostMeta;
}

export interface InstitutionFeedResponse {
  posts: InstitutionPostResponseItem[];
  pagination: Pagination;
}

export interface InstitutionMembership {
  _id: string;
  institution: Institution;
  user: string;
  role: string;
  studentId?: string;
  teacherId?: string;
  session?: string;
  section?: string;
  joinedAt: string;
}
