import type { Pagination } from "./common.types";
import type { Institution } from "./institution.types";
import type { Post, PostMeta } from "./post.types";

export interface Department {
  _id: string;
  name: string;
  code: string;
  institution: string | Institution;
  location?: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  postsCount: number;
  studentsCount: number;
  followersCount: number;
  isActive: boolean;
  website?: string;
  establishedYear?: number;
  contactEmails?: string[];
  contactPhones?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentHeaderData {
  _id: string;
  name: string;
  code: string;
  logo: string;
  coverImage: string;
  isActive: boolean;
  website?: string;
  institution: {
    _id: string;
    name: string;
  };
}

export interface MiniDepartment {
  _id: string;
  name: string;
  code: string;
  institution: {
    _id: string;
    name: string;
    code: string;
  };
  studentsCount: number;
  logo: string;
}

export interface DepartmentsListResponse {
  departments: Department[];
}

export interface DepartmentHeaderResponse {
  department: DepartmentHeaderData;
  meta: DepartmentMeta;
}

export interface DepartmentMeta {
  isFollowing: boolean;
  canPost: boolean;
  canEdit: boolean;
  isOwner: boolean;
}

export interface DepartmentPostResponseItem {
  post: Post;
  meta: PostMeta;
}

export interface DepartmentFeedResponse {
  posts: DepartmentPostResponseItem[];
  pagination: Pagination;
}

export interface DepartmentMembership {
  _id: string;
  department: Department;
  user: string;
  institution: string;
  role: string;
  joinedAt: string;
}

export interface DepartmentFaculty {
  _id: string;
  fullName: string;
  userName: string;
  avatar: string;
}

export interface DepartmentFacultyMeta {
  user_relation_status: string;
  institution: {
    _id: string;
    name: string;
  };
  isSelf: boolean;
  role: string;
}

export interface DepartmentFacultyResponse {
  faculties: {
    faculty: DepartmentFaculty;
    meta: DepartmentFacultyMeta;
  }[];
  meta: {
    currentUserRole: string;
  };
  pagination: Pagination;
}
