import { FaLightbulb } from "react-icons/fa";
import GroupCard from "../utils/GroupCard";
import GroupEmptyState from "../utils/GroupEmptyState";
import GroupErrorState from "../utils/GroupErrorState";
import GroupCardSkeleton from "../../Shared/skeletons/GroupCardSkeleton";
import groupHooks from "../../../hooks/useGroup";
import LoadMoreButton from "../../Shared/Action Buttons/LoadMoreButton";
import { GROUP_LIMIT } from "../../../constants";

const SuggestedGroups = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = groupHooks.useSuggestedGroups();

  const groups = data?.pages.flatMap((page) => page.data.groups) || [];
  const totalDocs = data?.pages[0]?.data.pagination.totalDocs || 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(GROUP_LIMIT)].map((_, i) => (
          <GroupCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <GroupErrorState
        message="Failed to load suggested groups. Please check your connection."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        Suggested Groups {totalDocs ? `(${totalDocs})` : ""}
      </h2>

      {groups.length === 0 ? (
        <GroupEmptyState
          icon={FaLightbulb}
          title="No Suggestions Available"
          message={
            <>
              We don't have any group suggestions for you right now. <br />
              Check back later!
            </>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((item) => (
              <GroupCard
                key={item.group._id}
                group={item.group}
                meta={item.meta}
              />
            ))}
            {/* Loading Skeletons for Next Page inside the same grid */}
            {isFetchingNextPage &&
              [...Array(GROUP_LIMIT)].map((_, i) => (
                <GroupCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          {/* Load More Button */}
          {hasNextPage && (
            <div className="mx-auto mt-5 flex w-1/5 justify-center">
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

export default SuggestedGroups;
