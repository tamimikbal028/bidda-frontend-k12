import api from "../lib/axios";
import type {
  LoginCredentials,
  ApiResponse,
  RegisterData,
  AuthResponse,
} from "../types";

const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/register", userData);
  return response.data;
};

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const payload = credentials.email?.includes("@")
    ? { email: credentials.email, password: credentials.password }
    : { userName: credentials.email, password: credentials.password };

  const response = await api.post<AuthResponse>("/users/login", payload);
  return response.data;
};

const logout = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/users/logout");
  return response.data;
};

const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/users/current-user");
  return response.data;
};

const refreshToken = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/refresh-token");
  return response.data;
};

const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    "/users/change-password",
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
