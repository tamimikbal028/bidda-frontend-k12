import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import institutionServices from "../services/institution.service";
import { useParams } from "react-router-dom";
import postHooks from "./common/usePost";
import { INSTITUTION_KEYS } from "../constants";

const useInstitutionHeader = () => {
  const { instId } = useParams();

  return useQuery({
    queryKey: [INSTITUTION_KEYS.HEADER, instId],
    queryFn: () => institutionServices.getInstitutionHeader(instId as string),
    enabled: !!instId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

const useInstitutionDetails = () => {
  const { instId } = useParams();

  return useQuery({
    queryKey: [INSTITUTION_KEYS.DETAILS, instId],
    queryFn: () => institutionServices.getInstitutionDetails(instId as string),
    enabled: !!instId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

const useInstitutionFeed = () => {
  const { instId } = useParams();

  return useInfiniteQuery({
    queryKey: [INSTITUTION_KEYS.POSTS, instId],
    queryFn: ({ pageParam }) =>
      institutionServices.getInstitutionFeed(
        instId as string,
        pageParam as number
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!instId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

const useInstitutionDepartments = () => {
  const { instId } = useParams();

  return useQuery({
    queryKey: [INSTITUTION_KEYS.DEPARTMENTS, instId],
    queryFn: () => institutionServices.getDepartmentsList(instId as string),
    enabled: !!instId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// ====================================
// Institution Feed & Posts
// ====================================

const useCreateInstitutionPost = () => {
  const { instId } = useParams();
  return postHooks.useCreatePost({
    invalidateKey: [
      [INSTITUTION_KEYS.POSTS, instId],
      [INSTITUTION_KEYS.HEADER, instId],
    ],
  });
};

// Institution Post Update
const useUpdateInstitutionPost = () => {
  const { instId } = useParams();
  return postHooks.useUpdatePost({
    queryKey: [[INSTITUTION_KEYS.POSTS, instId]],
    invalidateKey: [[INSTITUTION_KEYS.POSTS, instId]],
  });
};

// Institution Post Bookmark Toggle
const useToggleBookmarkInstitutionPost = () => {
  const { instId } = useParams();
  return postHooks.useToggleBookmark({
    queryKey: [[INSTITUTION_KEYS.POSTS, instId]],
    invalidateKey: [[INSTITUTION_KEYS.POSTS, instId]],
  });
};

const institutionHooks = {
  // Queries
  useInstitutionHeader,
  useInstitutionDetails,
  useInstitutionFeed,
  useInstitutionDepartments,

  // Posts
  useCreateInstitutionPost,
  useUpdateInstitutionPost,
  useToggleBookmarkInstitutionPost,
} as const;

export default institutionHooks;
