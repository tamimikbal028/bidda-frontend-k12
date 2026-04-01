const AUTH_KEYS = {
  CURRENT_USER: "currentUser",
} as const;

const INSTITUTION_KEYS = {
  HEADER: "institutionHeader",
  DETAILS: "institutionDetails",
  DEPARTMENTS: "institutionDepartments",
} as const;

const DEPARTMENT_KEYS = {
  HEADER: "departmentHeader",
  DETAILS: "departmentDetails",
  FOLLOWED: "followedDepartments",
  SEARCH: "departmentsSearch",
  FACULTY: "departmentFaculty",
} as const;

export { AUTH_KEYS, INSTITUTION_KEYS, DEPARTMENT_KEYS };
