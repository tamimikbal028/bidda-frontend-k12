import api from "../lib/axios";
import { POST_LIMIT } from "../constants";
import type {
  Institution,
  Department,
  ApiResponse,
  InstitutionFeedResponse,
  InstitutionHeaderResponse,
  MiniDepartment,
} from "../types";

const institutionServices = {
  // Get Institution Header (Minimal data)
  getInstitutionHeader: async (
    instId: string
  ): Promise<ApiResponse<InstitutionHeaderResponse>> => {
    const response = await api.get(`/institutions/${instId}/header`);
    return response.data;
  },

  // Get Institution Details (Full data)
  getInstitutionDetails: async (
    instId: string
  ): Promise<ApiResponse<{ institution: Institution }>> => {
    const response = await api.get(`/institutions/${instId}/details`);
    return response.data;
  },

  // Get Institution Feed (Official)
  getInstitutionFeed: async (
    instId: string,
    page: number
  ): Promise<ApiResponse<InstitutionFeedResponse>> => {
    const limit = POST_LIMIT;
    const response = await api.get(`/institutions/${instId}/feed`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Get Departments List
  getDepartmentsList: async (
    instId: string
  ): Promise<ApiResponse<{ departments: MiniDepartment[] }>> => {
    const response = await api.get(`/institutions/${instId}/departments`);
    return response.data;
  },

  // Search Institutions
  searchInstitutions: async (
    query: string
  ): Promise<ApiResponse<{ institutions: Institution[] }>> => {
    const response = await api.get("/institutions/search", {
      params: { q: query },
    });
    return response.data;
  },

  // Search Departments within an institution
  searchDepartments: async (
    instId: string,
    query: string
  ): Promise<ApiResponse<{ departments: Department[] }>> => {
    const response = await api.get("/departments/search", {
      params: { instId, q: query },
    });
    return response.data;
  },

  // Get Followed Institutions
  getFollowedInstitutions: async (): Promise<
    ApiResponse<{ institutions: Institution[] }>
  > => {
    const response = await api.get("/institutions/followed");
    return response.data;
  },
} as const;

export default institutionServices;
