const AUTH_KEYS = {
  CURRENT_USER: "currentUser",
} as const;

const PROFILE_KEYS = {
  HEADER: "profileHeader",
  DETAILS: "profileDetails",
  POSTS: "profilePosts",
} as const;

const INSTITUTION_KEYS = {
  HEADER: "institutionHeader",
  DETAILS: "institutionDetails",
  POSTS: "institutionPosts",
  DEPARTMENTS: "institutionDepartments",
} as const;

const DEPARTMENT_KEYS = {
  HEADER: "departmentHeader",
  DETAILS: "departmentDetails",
  POSTS: "departmentPosts",
  FOLLOWED: "followedDepartments",
  SEARCH: "departmentsSearch",
  FACULTY: "departmentFaculty",
} as const;

const FRIENDSHIP_KEYS = {
  FRIENDS: "friends",
  REQUESTS: "friendRequests",
  SENT_REQUESTS: "sentRequests",
  SUGGESTIONS: "friendSuggestions",
} as const;

const GROUP_KEYS = {
  MEMBERS: "groupMembers",
  POSTS: "groupPosts",
  PINNED_POSTS: "groupPinnedPosts",
  MARKETPLACE_POSTS: "groupMarketplacePosts",
  PENDING_POSTS: "groupPendingPosts",
  UNREAD_COUNTS: "groupUnreadCounts",
  DETAILS: "groupDetails",

  MY_GROUPS: "myGroups",
  UNIVERSITY_GROUPS: "universityGroups",
  CAREER_GROUPS: "careerGroups",
  SUGGESTED_GROUPS: "suggestedGroups",
  SENT_REQUESTS: "sentGroupRequests",
  INVITED_GROUPS: "invitedGroups",
  SEARCH_GROUPS: "searchGroups",
} as const;

const ROOM_KEYS = {
  MY_ROOMS: "myRooms",
  HIDDEN_ROOMS: "hiddenRooms",
  ARCHIVED_ROOMS: "archivedRooms",
  DETAILS: "roomDetails",
  MEMBERS: "roomMembers",
  POSTS: "roomPosts",
} as const;

export {
  AUTH_KEYS,
  PROFILE_KEYS,
  INSTITUTION_KEYS,
  DEPARTMENT_KEYS,
  FRIENDSHIP_KEYS,
  GROUP_KEYS,
  ROOM_KEYS,
};
