import { HiUsers } from "react-icons/hi2";
import FriendCardSkeleton from "../../Shared/skeletons/FriendCardSkeleton";
import roomHooks from "../../../hooks/useRoom";
import RoomMemberCard from "../RoomMemberCard";

const RoomRequestsTab = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = roomHooks.useRoomPendingRequests();

  const requests = data?.pages.flatMap((page) => page.data.requests) || [];
  const totalDocs =
    data?.pages[0]?.data.pagination?.totalDocs || requests.length;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <FriendCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-300/50 p-8 text-center">
        Failed to load join requests.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Join Requests ({totalDocs})
        </h2>
      </div>

      {requests.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-1">
          {requests.map((request) => (
            <RoomMemberCard
              key={request.meta.memberId}
              member={{
                user: request.user,
                meta: {
                  memberId: request.meta.memberId,
                  role: "MEMBER",
                  isSelf: false,
                  isCR: false,
                  isAdmin: false,
                  isCreator: false,
                  joinedAt: request.meta.requestedAt,
                  user_relation_status: "none",
                  canManage: false,
                  institution: null,
                },
              }}
              currentUserRole="CREATOR"
              isPendingRequest={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <HiUsers className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-600">
            No pending requests
          </p>
          <p className="mt-1 text-sm text-gray-500">
            When people ask to join your room, they'll show up here.
          </p>
        </div>
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full rounded-lg bg-gray-100 py-3 font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          {isFetchingNextPage
            ? "Loading more requests..."
            : "Load More Requests"}
        </button>
      )}
    </div>
  );
};

export default RoomRequestsTab;
