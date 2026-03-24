import type { ApiResponse } from "./common.types";
import {
  USER_TYPES,
  GENDERS,
  RELIGIONS,
  TEACHER_RANKS,
  ACCOUNT_STATUS,
  FRIEND_REQUEST_POLICY,
  CONNECTION_VISIBILITY,
} from "../constants";
import type { Department } from "./department.types";

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
export type AccountStatus =
  (typeof ACCOUNT_STATUS)[keyof typeof ACCOUNT_STATUS];
export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
export type Religion = (typeof RELIGIONS)[keyof typeof RELIGIONS];
export type TeacherRank = (typeof TEACHER_RANKS)[keyof typeof TEACHER_RANKS];

// Privacy Settings Enums
export type FriendRequestPolicy =
  (typeof FRIEND_REQUEST_POLICY)[keyof typeof FRIEND_REQUEST_POLICY];
export type ConnectionVisibility =
  (typeof CONNECTION_VISIBILITY)[keyof typeof CONNECTION_VISIBILITY];

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
  facebook?: string;
}

export interface PrivacySettings {
  friendRequestPolicy: FriendRequestPolicy;
  connectionVisibility: ConnectionVisibility;
}

// Student-specific fields
export interface StudentAcademicInfo {
  department?: Department;
  studentId?: string;
  session?: string;
  currentSemester?: number;
  section?: string;
}

// Teacher-specific fields
export interface TeacherAcademicInfo {
  department?: Department;
  teacherId?: string;
  rank?: TeacherRank;
  officeHours?: {
    day: string;
    timeRange: string;
    room: string;
  }[];
}

export interface ProfileHeaderUser {
  _id: string;

  // Stats
  postsCount: number;
  connectionsCount: number;
  followersCount: number;
  followingCount: number;
  publicFilesCount: number;

  // Basic Info
  fullName: string;
  userName: string;
  avatar: string;
  email: string;
  coverImage: string;
  bio?: string;
  userType: UserType;
  isInstitutionalEmail: boolean;
  accountStatus: AccountStatus;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// User Details (Full Profile)
export interface User {
  _id: string;

  // Identity
  fullName: string;
  userName: string;
  email: string;
  phoneNumber?: string;

  // Profile
  avatar: string;
  coverImage: string;
  bio?: string;
  gender?: Gender;
  religion?: Religion;

  // Stats
  postsCount: number;
  connectionsCount: number;
  followersCount: number;
  followingCount: number;
  publicFilesCount: number;

  // Social & Skills
  socialLinks?: SocialLinks;
  skills?: string[];
  interests?: string[];

  // Institutional
  userType: UserType;
  isInstitutionalEmail: boolean;

  // Status & Settings
  accountStatus: AccountStatus;
  restrictions: {
    isPostBlocked: boolean;
    isCommentBlocked: boolean;
    isMessageBlocked: boolean;
    postRestriction?: { reason: string };
    commentRestriction?: { reason: string };
    messageRestriction?: { reason: string };
  };

  // Admin/Legacy
  bannedAt?: string;
  bannedBy?: string;
  bannedReason?: string;
  deletedAt?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ====================================
// AUTH STATE
// ====================================

export type AuthResponse = ApiResponse<{
  user: AuthUser;
  meta: UserMeta;
}>;

export interface AuthUser {
  _id: string;
  fullName: string;
  userName: string;
  avatar: string;
  userType: UserType;
  isInstitutionalEmail: boolean;
  accountStatus: AccountStatus;
  restrictions: {
    isPostBlocked: boolean;
    isCommentBlocked: boolean;
    isMessageBlocked: boolean;
    postRestriction?: { reason: string };
    commentRestriction?: { reason: string };
    messageRestriction?: { reason: string };
  };
  passwordChangedAt?: string;
}

export interface UserMeta {
  institution: { _id: string; name: string } | null;
  department: { _id: string; name: string } | null;
  isTeacher: boolean;
  isAppAdmin: boolean;
}

// Login Types
export interface LoginCredentials {
  email?: string;
  userName?: string;
  password: string;
}

// Register Types
export interface RegisterData {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  userType: UserType;
  agreeToTerms: boolean;
}
