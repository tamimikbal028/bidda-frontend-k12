import api from "../lib/axios";
import { POST_LIMIT, MEMBERS_LIMIT } from "../constants";
import type {
  Department,
  ApiResponse,
  DepartmentFeedResponse,
  MiniDepartment,
  DepartmentFacultyResponse,
  DepartmentHeaderResponse,
} from "../types";

const getDepartmentHeader = async (
  deptId: string
): Promise<ApiResponse<DepartmentHeaderResponse>> => {
  const response = await api.get<ApiResponse<DepartmentHeaderResponse>>(
    `/departments/${deptId}/header`
  );
  return response.data;
};

const getDepartmentDetails = async (
  deptId: string
): Promise<ApiResponse<{ department: Department }>> => {
  const response = await api.get<ApiResponse<{ department: Department }>>(
    `/departments/${deptId}/details`
  );
  return response.data;
};

const getDepartmentFeed = async (
  deptId: string,
  page: number = 1
): Promise<ApiResponse<DepartmentFeedResponse>> => {
  const limit = POST_LIMIT;
  const response = await api.get<ApiResponse<DepartmentFeedResponse>>(
    `/departments/${deptId}/feed`,
    { params: { page, limit } }
  );
  return response.data;
};

const searchDepartments = async (
  query: string,
  instId?: string
): Promise<ApiResponse<{ departments: MiniDepartment[] }>> => {
  const response = await api.get<ApiResponse<{ departments: MiniDepartment[] }>>(
    "/departments/search",
    { params: { q: query, instId } }
  );
  return response.data;
};

const getFollowedDepartments = async (): Promise<
  ApiResponse<{ departments: MiniDepartment[] }>
> => {
  const response = await api.get<ApiResponse<{ departments: MiniDepartment[] }>>(
    "/departments/followed"
  );
  return response.data;
};

const getDepartmentFaculty = async (
  deptId: string,
  page: number = 1
): Promise<ApiResponse<DepartmentFacultyResponse>> => {
  const limit = MEMBERS_LIMIT;
  const response = await api.get<ApiResponse<DepartmentFacultyResponse>>(
    `/departments/${deptId}/faculty`,
    { params: { page, limit } }
  );
  return response.data;
};

const promoteToModerator = async (deptId: string, userId: string) => {
  const response = await api.patch(
    `/departments/${deptId}/members/${userId}/promote-moderator`
  );
  return response.data;
};

const promoteToAdmin = async (deptId: string, userId: string) => {
  const response = await api.patch(
    `/departments/${deptId}/members/${userId}/promote-admin`
  );
  return response.data;
};

const demoteToModerator = async (deptId: string, userId: string) => {
  const response = await api.patch(
    `/departments/${deptId}/members/${userId}/demote-moderator`
  );
  return response.data;
};

const demoteToMember = async (deptId: string, userId: string) => {
  const response = await api.patch(
    `/departments/${deptId}/members/${userId}/demote-member`
  );
  return response.data;
};

const removeFromFaculty = async (deptId: string, userId: string) => {
  const response = await api.delete(
    `/departments/${deptId}/faculty/${userId}`
  );
  return response.data;
};

const addFaculty = async (deptId: string, email: string) => {
  const response = await api.post(`/departments/${deptId}/faculty`, { email });
  return response.data;
};

const departmentServices = {
  getDepartmentHeader,
  getDepartmentDetails,
  getDepartmentFeed,
  searchDepartments,
  getFollowedDepartments,
  getDepartmentFaculty,
  promoteToModerator,
  promoteToAdmin,
  demoteToModerator,
  demoteToMember,
  removeFromFaculty,
  addFaculty,
} as const;

export default departmentServices;
