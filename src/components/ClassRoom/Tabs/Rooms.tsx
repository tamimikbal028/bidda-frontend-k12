import RoomCard from "../RoomCard";
import RoomCardSkeleton from "../../Shared/skeletons/RoomCardSkeleton";
import ErrorState from "../../Shared/ErrorState";
import EmptyState from "../../Shared/EmptyState";
import roomHooks from "../../../hooks/useRoom";
import authHooks from "../../../hooks/useAuth";
import LoadMoreButton from "../../Shared/Action Buttons/LoadMoreButton";
import { USER_TYPES } from "../../../constants/user";
import { ROOM_LIMIT } from "../../../constants";
import type { RoomListItem } from "../../../types";
import { FaDoorOpen } from "react-icons/fa";

const Rooms = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = roomHooks.useMyRooms();
  const { user } = authHooks.useUser();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-7 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(ROOM_LIMIT)].map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <ErrorState message={error?.message || "Failed to load rooms"} />;
  }

  const rooms: RoomListItem[] = data.pages.flatMap((page) => page.data.rooms);
  const totalDocs = data.pages[0].data.pagination.totalDocs || 0;

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Rooms {totalDocs ? `(${totalDocs})` : ""}
        </h2>
      </div>

      {/* no rooms message */}
      {rooms.length === 0 ? (
        <EmptyState
          icon={<FaDoorOpen />}
          title={
            user?.userType === USER_TYPES.TEACHER
              ? "Create or join a room to get started"
              : "Join a room to get started"
          }
          description={
            user?.userType === USER_TYPES.TEACHER
              ? "You can create a room using the create room button or join a room using the room code"
              : "You can join a room using the room code"
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <RoomCard key={r._id} room={r} />
            ))}
            {/* Loading Skeleton for Next Page inside the same grid */}
            {isFetchingNextPage &&
              [...Array(ROOM_LIMIT)].map((_, i) => (
                <RoomCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          {/* Load More Button */}
          {hasNextPage && (
            <div className="flex justify-center pt-4">
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

export default Rooms;
