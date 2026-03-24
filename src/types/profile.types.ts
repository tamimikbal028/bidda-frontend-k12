import type {
  Gender,
  SocialLinks,
  User,
  ProfileHeaderUser,
} from "./user.types";

export interface ProfileHeaderData {
  user: ProfileHeaderUser;
  meta: {
    user_relation_status: string;
    isFollowing: boolean;
    isBlockedByMe: boolean;
    isBlockedByTarget: boolean;
    isOwnProfile: boolean;

    institution: {
      _id: string;
      name: string;
    } | null;
    department: {
      _id: string;
      name: string;
    } | null;
  };
}

export interface ProfileDetailsData {
  user: User;
  meta: {
    institution: {
      _id: string;
      name: string;
    } | null;
    department: {
      _id: string;
      name: string;
    } | null;
    academicInfo?: {
      studentId?: string;
      teacherId?: string;
      session?: string;
      section?: string;
      rank?: string;
      officeHours?: {
        day: string;
        timeRange: string;
        room?: string;
      }[];
      currentSemester?: number;
    };
  };
}

// ====================================
// UPDATE PROFILE DATA TYPES
// ====================================

/**
 * PATCH /users/update-general request body
 * Only include fields that are being updated
 */
export interface UpdateGeneralData {
  fullName?: string;
  bio?: string;
  phoneNumber?: string;
  gender?: Gender;
  religion?: string;
  socialLinks?: SocialLinks;
  skills?: string[];
  interests?: string[];
}

/**
 * PATCH /users/update-academic request body
 * Student fields
 */
export interface UpdateStudentAcademicData {
  institution?: string; // ObjectId - only for non-verified users
  department?: string; // ObjectId - only for non-verified users
  session?: string;
  currentSemester?: number;
  section?: string;
  studentId?: string;
}

/**
 * PATCH /users/update-academic request body
 * Teacher fields
 */
export interface UpdateTeacherAcademicData {
  institution?: string; // ObjectId - only for non-verified users
  department?: string; // ObjectId - only for non-verified users
  teacherId?: string;
  rank?: string;
  officeHours?: {
    day: string;
    timeRange: string;
    room: string;
  }[];
}

// Combined academic update type
export type UpdateAcademicData =
  | UpdateStudentAcademicData
  | UpdateTeacherAcademicData;
