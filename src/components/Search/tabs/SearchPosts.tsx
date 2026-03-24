import { useState } from "react";
import searchHooks from "../../../hooks/useSearch";
import PostsResults from "../PostsResults";
import LoadMoreButton from "../../Shared/Action Buttons/LoadMoreButton";
import EmptyState from "../../Shared/EmptyState";

const SearchPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { posts, loading, pagination, search } = searchHooks.useSearchPosts();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      search(query, 1, false);
    }
  };

  const handleLoadMore = () => {
    if (pagination && searchQuery.trim()) {
      search(searchQuery, pagination.page + 1, true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search posts by content..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          autoFocus
        />
      </div>

      {/* Empty State - No query */}
      {searchQuery.trim().length === 0 && (
        <EmptyState
          icon="📝"
          title="Search Posts"
          description="Find posts by searching their content"
          size="lg"
        />
      )}

      {/* Short query message */}
      {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
        <EmptyState
          icon="⌨️"
          title="Keep typing..."
          description="Please type at least 2 characters to search"
          size="md"
        />
      )}

      {/* Loading State */}
      {loading && pagination?.page === 1 && (
        <div className="mt-12 text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && searchQuery.trim().length >= 2 && posts.length === 0 && (
        <EmptyState
          icon="😕"
          title="No posts found"
          description="Try searching with different keywords"
          size="lg"
        />
      )}

      {/* Results */}
      {posts.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-900">
            Posts ({pagination?.totalDocs || 0})
          </h2>
          <PostsResults isVisible={true} posts={posts} />

          {pagination?.hasMore && (
            <div className="mt-6 flex justify-center">
              <LoadMoreButton onClick={handleLoadMore} isLoading={loading} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPosts;
