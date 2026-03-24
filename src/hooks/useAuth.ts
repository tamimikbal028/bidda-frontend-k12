import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import { toast } from "sonner";
import authServices from "../services/auth.service";
import type { LoginCredentials, ApiError, RegisterData } from "../types";
import type { AxiosError } from "axios";
import { AUTH_KEYS, USER_TYPES } from "../constants";
import { handleMutationError } from "../utils/errorHandler";

// Default query options for current user
const currentUserQueryOptions = {
  retry: false,
  staleTime: Infinity,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
};

const useUser = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: [AUTH_KEYS.CURRENT_USER],
    queryFn: async () => {
      try {
        const res = await authServices.getCurrentUser();
        // Returns { user, meta }
        return res.data;
      } catch {
        // If not logged in (401), just return null for a clean state
        return null;
      }
    },
    ...currentUserQueryOptions,
  });

  return {
    user: authData?.user ?? null,
    meta: authData?.meta ?? null,
    isAuthenticated: Boolean(authData?.user),
    isCheckingAuth: isLoading,
    isAppAdmin:
      authData?.user?.userType === USER_TYPES.OWNER ||
      authData?.user?.userType === USER_TYPES.ADMIN,
  };
};

// Register
const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userData }: { userData: RegisterData }) =>
      authServices.register(userData),

    onSuccess: (response) => {
      queryClient.setQueryData([AUTH_KEYS.CURRENT_USER], response.data);
      toast.success(response.message);
      navigate("/");
    },
    onError: handleMutationError("Registration failed"),
  });
};

// Login
const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ credentials }: { credentials: LoginCredentials }) =>
      authServices.login(credentials),
    onSuccess: (response) => {
      queryClient.setQueryData([AUTH_KEYS.CURRENT_USER], response.data);
      toast.success(response.message);

      // Extract original path from location state
      const state = location.state as { from?: Location };
      const from = state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
    onError: handleMutationError("Login failed"),
  });
};

// Logout
const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authServices.logout(),
    onSuccess: (response) => {
      queryClient.setQueryData([AUTH_KEYS.CURRENT_USER], null);
      queryClient.removeQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
      toast.success(response?.message);
      navigate("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      queryClient.setQueryData([AUTH_KEYS.CURRENT_USER], null);
      handleMutationError(error, "Logout failed, signed out locally.");
      navigate("/login");
    },
  });
};

// Change Password
const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      authServices.changePassword(data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: handleMutationError("Change password failed"),
  });
};

const authHooks = {
  useUser,
  useRegister,
  useLogin,
  useLogout,
  useChangePassword,
} as const;

export default authHooks;
