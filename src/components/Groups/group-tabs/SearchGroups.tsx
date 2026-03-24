import { useState } from "react";
import groupHooks from "../../../hooks/useGroup";
import GroupCard from "../utils/GroupCard";
import LoadMoreButton from "../../Shared/Action Buttons/LoadMoreButton";
import EmptyState from "../../Shared/EmptyState";
import { toast } from "sonner";
import GroupCardSkeleton from "../../Shared/skeletons/GroupCardSkeleton";

const SearchGroups = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = groupHooks.useSearchGroups(searchQuery);

  if (error) {
    toast.error("Failed to search. Please try again.");
  }

  const groups = data?.pages.flatMap((page) => page.data.groups) || [];
  const totalDocs = data?.pages[0]?.data.pagination?.totalDocs || 0;

  return (
    <div className="space-y-4">
      {/* Search Input - Always visible at top */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search groups by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          autoFocus
        />
      </div>

      {/* Empty State - No query */}
      {searchQuery.trim().length === 0 && (
        <EmptyState
          icon="🔍"
          title="Search for Groups"
          description="Find groups by searching their name or description"
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
      {isLoading && searchQuery.trim().length >= 2 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && searchQuery.trim().length >= 2 && (
        <EmptyState
          icon="❌"
          title="Failed to search"
          description={`Error: ${error.message}. Please try again.`}
          size="md"
        />
      )}

      {/* No Results */}
      {!isLoading &&
        !error &&
        searchQuery.trim().length >= 2 &&
        groups.length === 0 && (
          <EmptyState
            icon="😕"
            title="No results found"
            description="Try searching with different keywords"
            size="lg"
          />
        )}

      {/* Results */}
      {!isLoading && groups.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results ({totalDocs})
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((item) => (
              <GroupCard
                key={item.group._id}
                group={item.group}
                meta={item.meta}
              />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-6 flex justify-center">
              <LoadMoreButton
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchGroups;
