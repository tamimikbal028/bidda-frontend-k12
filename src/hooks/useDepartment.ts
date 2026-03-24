import departmentServices from "../services/department.service";
import { useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DEPARTMENT_KEYS } from "../constants";
import { toast } from "sonner";
import postHooks from "./common/usePost";
import { handleMutationError } from "../utils/errorHandler";

const useDepartmentHeader = () => {
  const { deptId } = useParams();

  return useQuery({
    queryKey: [DEPARTMENT_KEYS.HEADER, deptId],
    queryFn: () => departmentServices.getDepartmentHeader(deptId as string),
    enabled: !!deptId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

const useDepartmentDetails = () => {
  const { deptId } = useParams();

  return useQuery({
    queryKey: [DEPARTMENT_KEYS.DETAILS, deptId],
    queryFn: () => departmentServices.getDepartmentDetails(deptId as string),
    enabled: !!deptId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

const useDepartmentFeed = () => {
  const { deptId } = useParams();

  return useInfiniteQuery({
    queryKey: [DEPARTMENT_KEYS.POSTS, deptId],
    queryFn: ({ pageParam }) =>
      departmentServices.getDepartmentFeed(
        deptId as string,
        pageParam as number
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!deptId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

const useFollowedDepartments = () => {
  return useQuery({
    queryKey: [DEPARTMENT_KEYS.FOLLOWED],
    queryFn: () => departmentServices.getFollowedDepartments(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const useSearchDepartments = (query: string) => {
  return useQuery({
    queryKey: [DEPARTMENT_KEYS.SEARCH, query],
    queryFn: () => departmentServices.searchDepartments(query),
    enabled: query.length > 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ====================================
// Department Faculty
// ====================================

const useDepartmentFaculty = () => {
  const { deptId } = useParams();

  return useInfiniteQuery({
    queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
    queryFn: ({ pageParam }) =>
      departmentServices.getDepartmentFaculty(
        deptId as string,
        pageParam as number
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!deptId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const usePromoteToModerator = () => {
  const queryClient = useQueryClient();
  const { deptId } = useParams();

  return useMutation({
    mutationFn: ({ deptId, userId }: { deptId: string; userId: string }) =>
      departmentServices.promoteToModerator(deptId, userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
      });
    },
    onError: handleMutationError("Failed to promote member"),
  });
};

const usePromoteToAdmin = () => {
  const queryClient = useQueryClient();
  const { deptId } = useParams();

  return useMutation({
    mutationFn: ({ deptId, userId }: { deptId: string; userId: string }) =>
      departmentServices.promoteToAdmin(deptId, userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
      });
    },
    onError: handleMutationError("Failed to promote member"),
  });
};

const useDemoteToModerator = () => {
  const queryClient = useQueryClient();
  const { deptId } = useParams();

  return useMutation({
    mutationFn: ({ deptId, userId }: { deptId: string; userId: string }) =>
      departmentServices.demoteToModerator(deptId, userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
      });
    },
    onError: handleMutationError("Failed to demote member"),
  });
};

const useDemoteToMember = () => {
  const queryClient = useQueryClient();
  const { deptId } = useParams();

  return useMutation({
    mutationFn: ({ deptId, userId }: { deptId: string; userId: string }) =>
      departmentServices.demoteToMember(deptId, userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
      });
    },
    onError: handleMutationError("Failed to demote member"),
  });
};

const useRemoveFromFaculty = () => {
  const queryClient = useQueryClient();
  const { deptId } = useParams();

  return useMutation({
    mutationFn: ({ deptId, userId }: { deptId: string; userId: string }) =>
      departmentServices.removeFromFaculty(deptId, userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
      });
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.HEADER, deptId],
      });
    },
    onError: handleMutationError("Failed to remove from faculty"),
  });
};

const useAddFaculty = () => {
  const queryClient = useQueryClient();
  const { deptId } = useParams();

  return useMutation({
    mutationFn: ({ deptId, email }: { deptId: string; email: string }) =>
      departmentServices.addFaculty(deptId, email),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.FACULTY, deptId],
      });
      // Also invalidate header to update counts if needed? (optional, usually counts are cached or updated)
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_KEYS.HEADER, deptId],
      });
    },
    onError: handleMutationError("Failed to add faculty"),
  });
};

// ====================================
// Department Feed & Posts
// ====================================

const useCreateDepartmentPost = () => {
  const { deptId } = useParams();
  return postHooks.useCreatePost({
    invalidateKey: [
      [DEPARTMENT_KEYS.POSTS, deptId],
      [DEPARTMENT_KEYS.HEADER, deptId],
    ],
  });
};

// Department Post Update
const useUpdateDepartmentPost = () => {
  const { deptId } = useParams();
  return postHooks.useUpdatePost({
    queryKey: [[DEPARTMENT_KEYS.POSTS, deptId]],
    invalidateKey: [[DEPARTMENT_KEYS.POSTS, deptId]],
  });
};

// Department Post Bookmark Toggle
const useToggleBookmarkDepartmentPost = () => {
  const { deptId } = useParams();
  return postHooks.useToggleBookmark({
    queryKey: [[DEPARTMENT_KEYS.POSTS, deptId]],
    invalidateKey: [[DEPARTMENT_KEYS.POSTS, deptId]],
  });
};

const departmentHooks = {
  // Queries
  useDepartmentHeader,
  useDepartmentDetails,
  useDepartmentFeed,
  useFollowedDepartments,
  useSearchDepartments,

  // Faculty
  useDepartmentFaculty,
  usePromoteToModerator,
  usePromoteToAdmin,
  useDemoteToModerator,
  useDemoteToMember,
  useRemoveFromFaculty,
  useAddFaculty,

  // Posts
  useCreateDepartmentPost,
  useUpdateDepartmentPost,
  useToggleBookmarkDepartmentPost,
} as const;

export default departmentHooks;
