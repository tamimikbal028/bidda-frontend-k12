import { POST_LIMIT } from "../constants";
import api from "../lib/axios";
import type {
  ApiResponse,
  UpdateGeneralData,
  UpdateAcademicData,
  ProfileHeaderData,
  ProfileDetailsData,
} from "../types";

const getProfileHeader = async (username: string) => {
  const response = await api.get<ApiResponse<ProfileHeaderData>>(
    `/profile/${username}`
  );
  return response.data;
};

const getProfileDetails = async (username: string) => {
  const response = await api.get<ApiResponse<ProfileDetailsData>>(
    `/profile/details/${username}`
  );
  return response.data;
};

const updateGeneral = async (data: UpdateGeneralData) => {
  const response = await api.patch<ApiResponse<null>>(
    "/profile/update-general",
    data
  );
  return response.data;
};

const updateAcademic = async (data: UpdateAcademicData) => {
  const response = await api.patch<ApiResponse<null>>(
    "/profile/update-academic",
    data
  );
  return response.data;
};

const updateAvatar = async (formData: FormData) => {
  const response = await api.patch<ApiResponse<null>>(
    "/profile/avatar",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

const updateCoverImage = async (formData: FormData) => {
  const response = await api.patch<ApiResponse<null>>(
    "/profile/cover-image",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

const getProfilePosts = async (username: string, page: number) => {
  const response = await api.get(`/profile/${username}/posts`, {
    params: { page, limit: POST_LIMIT },
  });
  return response.data;
};

const removeAcademic = async () => {
  const response = await api.delete<ApiResponse<null>>("/profile/remove-academic");
  return response.data;
};

const profileServices = {
  getProfileHeader,
  getProfileDetails,
  updateGeneral,
  updateAcademic,
  updateAvatar,
  updateCoverImage,
  getProfilePosts,
  removeAcademic,
} as const;

export default profileServices;
