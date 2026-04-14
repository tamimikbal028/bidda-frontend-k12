import api from "@/lib/axios";
import type {
  LoginCredentials,
  ApiResponse,
  RegisterData,
  AuthResponse,
} from "../types";

const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", userData);
  return response.data;
};

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const payload = credentials.email?.includes("@")
    ? { email: credentials.email, password: credentials.password }
    : { userName: credentials.email, password: credentials.password };

  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

const logout = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/auth/logout");
  return response.data;
};

const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/current-user");
  return response.data;
};

const refreshToken = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/refresh-token");
  return response.data;
};

const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    "/auth/change-password",
    data
  );
  return response.data;
};

const authServices = {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
  changePassword,
} as const;

export default authServices;
