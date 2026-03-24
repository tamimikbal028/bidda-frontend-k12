import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import profileServices from "../services/profile.service";
import { handleMutationError } from "../utils/errorHandler";
import type {
  UpdateGeneralData,
  UpdateAcademicData,
  FeedPostsResponse,
} from "../types";
import { useParams } from "react-router-dom";
import authHooks from "./useAuth";
import { AUTH_KEYS, PROFILE_KEYS, ROOM_KEYS } from "../constants";
import postHooks from "./common/usePost";
import followHooks from "./common/useFollow";

// Import Generic Utils

const FIVE_MIN = 1000 * 60 * 5;

const defaultProfileQueryOptions = {
  staleTime: FIVE_MIN,
  retry: 1,
};

const useProfileHeader = () => {
  const { username } = useParams();
  return useQuery({
    queryKey: [PROFILE_KEYS.HEADER, username],
    queryFn: async () => {
      const response = await profileServices.getProfileHeader(
        username as string
      );
      return response.data;
    },
    ...defaultProfileQueryOptions,
  });
};

const useProfileDetails = (username?: string) => {
  const { username: paramUsername } = useParams();
  const targetUsername = username || paramUsername;

  return useQuery({
    queryKey: [PROFILE_KEYS.DETAILS, targetUsername],
    queryFn: async () => {
      if (!targetUsername) return null;
      const response = await profileServices.getProfileDetails(targetUsername);
      return response.data;
    },
    enabled: !!targetUsername,
    ...defaultProfileQueryOptions,
  });
};

// =========================
// Update hooks
// =========================
const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = authHooks.useUser();

  return useMutation({
    mutationFn: (formData: FormData) => profileServices.updateAvatar(formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.HEADER] });
      navigate(`/profile/${user?.userName}`);
      toast.success(response.message);
    },
    onError: handleMutationError("Update Avatar failed"),
  });
};

const useUpdateCoverImage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = authHooks.useUser();

  return useMutation({
    mutationFn: (formData: FormData) =>
      profileServices.updateCoverImage(formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.HEADER] });
      navigate(`/profile/${user?.userName}`);
      toast.success(response.message);
    },
    onError: handleMutationError("Update Cover Image failed"),
  });
};

const useUpdateGeneral = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = authHooks.useUser();

  return useMutation({
    mutationFn: (data: UpdateGeneralData) =>
      profileServices.updateGeneral(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.HEADER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.DETAILS] });

      // Invalidate room queries since user name appears on room cards
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.MY_ROOMS] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.HIDDEN_ROOMS] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.ARCHIVED_ROOMS] });
      queryClient.invalidateQueries({ queryKey: [ROOM_KEYS.DETAILS] });
      navigate(`/profile/${user?.userName}`);
      toast.success(response.message);
    },
    onError: handleMutationError("Update General failed"),
  });
};

const useUpdateAcademic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = authHooks.useUser();

  return useMutation({
    mutationFn: (data: UpdateAcademicData) =>
      profileServices.updateAcademic(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.HEADER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.DETAILS] });
      navigate(`/profile/${user?.userName}`);
      toast.success(response.message);
    },
    onError: handleMutationError("Update Academic failed"),
  });
};

const useRemoveAcademic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = authHooks.useUser();

  return useMutation({
    mutationFn: () => profileServices.removeAcademic(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.HEADER] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.DETAILS] });
      navigate(`/profile/${user?.userName}`);
      toast.success(response.message);
    },
    onError: handleMutationError("Remove Academic failed"),
  });
};

// =========================
// Post hooks
// =========================
const useProfilePosts = () => {
  const { username } = useParams();
  return useInfiniteQuery<FeedPostsResponse>({
    queryKey: [PROFILE_KEYS.POSTS, username],
    queryFn: ({ pageParam }) => {
      return profileServices.getProfilePosts(
        username as string,
        pageParam as number
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: Boolean(username),
    staleTime: FIVE_MIN,
  });
};

const useCreateProfilePost = () => {
  const { username } = useParams();
  return postHooks.useCreatePost({
    queryKey: [[PROFILE_KEYS.POSTS, username]],
    invalidateKey: [[PROFILE_KEYS.HEADER, username]],
  });
};

const useUpdateProfilePost = () => {
  const { username } = useParams();
  return postHooks.useUpdatePost({
    queryKey: [[PROFILE_KEYS.POSTS, username]],
  });
};

const useToggleBookmarkProfilePost = () => {
  const { username } = useParams();
  return postHooks.useToggleBookmark({
    queryKey: [[PROFILE_KEYS.POSTS, username]],
  });
};

// Follow hooks
const useToggleFollowProfile = () => {
  const { username } = useParams();
  return followHooks.useToggleFollow({
    invalidateKeys: [[PROFILE_KEYS.HEADER, username]],
  });
};

const profileHooks = {
  useProfileHeader,
  useProfileDetails,
  useUpdateGeneral,
  useUpdateAcademic,
  useUpdateAvatar,
  useUpdateCoverImage,
  useRemoveAcademic,
  useProfilePosts,
  useCreateProfilePost,
  useUpdateProfilePost,
  useToggleBookmarkProfilePost,
  useToggleFollowProfile,
} as const;

export default profileHooks;
