import { useState } from "react";
import friendshipHooks from "../../hooks/common/useFriendship";
import FriendCard from "../Shared/friends/FriendCard";
import FriendCardSkeleton from "../Shared/skeletons/FriendCardSkeleton";
import LoadMoreButton from "../Shared/Action Buttons/LoadMoreButton";
import EmptyState from "../Shared/EmptyState";
import { toast } from "sonner";

const SearchFriends = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = friendshipHooks.useSearchFriends(searchQuery);

  if (error) {
    toast.error("Failed to search. Please try again.");
  }

  const users = data?.pages.flatMap((page) => page.data.users) || [];
  const totalDocs = data?.pages[0]?.data.pagination?.totalDocs || 0;

  return (
    <div className="space-y-4">
      {/* Search Input - Always visible at top */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search people by name, username, or email..."
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
          title="Search for People"
          description="Find friends by searching their name, username, or email"
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
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <FriendCardSkeleton key={i} />
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
        users.length === 0 && (
          <EmptyState
            icon="😕"
            title="No results found"
            description="Try searching with different keywords"
            size="lg"
          />
        )}

      {/* Results */}
      {!isLoading && users.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results ({totalDocs})
          </h2>
          <div className="space-y-3">
            {users.map((item) => (
              <FriendCard
                key={item.user._id}
                friend={item.user}
                meta={item.meta}
              />
            ))}

            {hasNextPage && (
              <div className="mt-6 flex justify-center">
                <LoadMoreButton
                  onClick={() => fetchNextPage()}
                  isLoading={isFetchingNextPage}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFriends;
