import ProfilePostCard from "./ProfilePostCard";
import PostSkeleton from "../Shared/skeletons/PostSkeleton";
import type { ApiError } from "../../types";
import type { AxiosError } from "axios";
import profileHooks from "../../hooks/useProfile";
import LoadMoreButton from "../Shared/Action Buttons/LoadMoreButton";

interface ProfilePostsProps {
  isOwnProfile: boolean;
}

const ProfilePosts = ({ isOwnProfile }: ProfilePostsProps) => {
  const {
    data: postsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = profileHooks.useProfilePosts();

  const posts = postsData?.pages.flatMap((page) => page.data.posts) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    const axiosError = error as AxiosError<ApiError>;
    const errorMessage =
      axiosError.response?.data.message ||
      error.message ||
      "Could not load posts";

    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-12 text-center shadow">
        <p className="font-medium text-red-600">{errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((item) => (
            <ProfilePostCard
              key={item.post._id}
              post={item.post}
              meta={item.meta}
            />
          ))}
          {/* TODO: Implement 'Load More' button for pagination */}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow">
          <p className="text-gray-500">
            {isOwnProfile
              ? "You haven't posted anything yet."
              : "No posts to show."}
          </p>
        </div>
      )}
      {/* Load More Button */}
      {hasNextPage && (
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        />
      )}
    </>
  );
};

export default ProfilePosts;
