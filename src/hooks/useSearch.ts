import { useState, useCallback } from "react";
import searchServices from "../services/search.service";
import type {
  SearchPost,
  SearchGroup,
  SearchHashtag,
  SearchComment,
} from "../types";
import type { Pagination } from "../types/common.types";

const useSearchPosts = () => {
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const search = useCallback(
    async (query: string, page: number = 1, append: boolean = false) => {
      if (!query.trim()) {
        setPosts([]);
        setPagination(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchServices.searchPosts(query, page, 15);
        const newPosts = response.data.posts;

        if (append) {
          setPosts((prev) => [...prev, ...newPosts]);
        } else {
          setPosts(newPosts);
        }
        setPagination(response.data.pagination);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Post search failed";
        setError(errorMessage);
        console.error("Post search error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setPosts([]);
    setPagination(null);
    setError(null);
  }, []);

  return { posts, loading, error, pagination, search, reset };
};

const useSearchGroups = () => {
  const [groups, setGroups] = useState<SearchGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const search = useCallback(
    async (query: string, page: number = 1, append: boolean = false) => {
      if (!query.trim()) {
        setGroups([]);
        setPagination(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchServices.searchGroups(query, page, 20);
        const newGroups = response.data.groups;

        if (append) {
          setGroups((prev) => [...prev, ...newGroups]);
        } else {
          setGroups(newGroups);
        }
        setPagination(response.data.pagination);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Group search failed";
        setError(errorMessage);
        console.error("Group search error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setGroups([]);
    setPagination(null);
    setError(null);
  }, []);

  return { groups, loading, error, pagination, search, reset };
};

const useSearchHashtags = () => {
  const [hashtags, setHashtags] = useState<SearchHashtag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const search = useCallback(
    async (query: string, page: number = 1, append: boolean = false) => {
      if (!query.trim()) {
        setHashtags([]);
        setPagination(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchServices.searchHashtags(query, page, 20);
        const newHashtags = response.data.hashtags;

        if (append) {
          setHashtags((prev) => [...prev, ...newHashtags]);
        } else {
          setHashtags(newHashtags);
        }
        setPagination(response.data.pagination);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Hashtag search failed";
        setError(errorMessage);
        console.error("Hashtag search error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setHashtags([]);
    setPagination(null);
    setError(null);
  }, []);

  return { hashtags, loading, error, pagination, search, reset };
};

const useSearchComments = () => {
  const [comments, setComments] = useState<SearchComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const search = useCallback(
    async (query: string, page: number = 1, append: boolean = false) => {
      if (!query.trim()) {
        setComments([]);
        setPagination(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchServices.searchComments(query, page, 10);
        const newComments = response.data.comments;

        if (append) {
          setComments((prev) => [...prev, ...newComments]);
        } else {
          setComments(newComments);
        }
        setPagination(response.data.pagination);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Comment search failed";
        setError(errorMessage);
        console.error("Comment search error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setComments([]);
    setPagination(null);
    setError(null);
  }, []);

  return { comments, loading, error, pagination, search, reset };
};

const searchHooks = {
  useSearchPosts,
  useSearchGroups,
  useSearchHashtags,
  useSearchComments,
};

export default searchHooks;
