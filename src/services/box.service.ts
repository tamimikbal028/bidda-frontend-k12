import type { BoxFormData } from "../components/ClassRoom/box/CreateBoxForm";
import api from "../lib/axios";
import type { ApiResponse } from "../types";
import type { Box, Submission } from "../types/box.types";

const createBox = async (
  boxData: BoxFormData
): Promise<ApiResponse<{ box: Box }>> => {
  const response = await api.post("/boxes/create", boxData);
  return response.data;
};

const getActiveBoxes = async (): Promise<ApiResponse<{ boxes: Box[] }>> => {
  const response =
    await api.get<ApiResponse<{ boxes: Box[] }>>("/boxes/active");
  return response.data;
};

const getInactiveBoxes = async (): Promise<ApiResponse<{ boxes: Box[] }>> => {
  const response =
    await api.get<ApiResponse<{ boxes: Box[] }>>("/boxes/inactive");
  return response.data;
};

const getBoxDetails = async (
  boxId: string
): Promise<ApiResponse<{ box: Box; submissions: Submission[] }>> => {
  const response = await api.get<
    ApiResponse<{ box: Box; submissions: Submission[] }>
  >(`/boxes/box/${boxId}`);
  return response.data;
};

const toggleBoxStatus = async (
  boxId: string
): Promise<ApiResponse<object>> => {
  const response = await api.patch(`/boxes/toggle/${boxId}`);
  return response.data;
};

const deleteBox = async (
  boxId: string
): Promise<ApiResponse<object>> => {
  const response = await api.delete(`/boxes/${boxId}`);
  return response.data;
};

const submitFile = async (
  formData: FormData
): Promise<ApiResponse<{ box: Box }>> => {
  const response = await api.post("/boxes/submit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const boxServices = {
  createBox,
  getActiveBoxes,
  getInactiveBoxes,
  getBoxDetails,
  toggleBoxStatus,
  deleteBox,
  submitFile,
} as const;

export default boxServices;
