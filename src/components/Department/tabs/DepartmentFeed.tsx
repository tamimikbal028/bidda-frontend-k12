import departmentHooks from "../../../hooks/useDepartment";
import DepartmentPostCard from "../DepartmentPostCard";
import PostSkeleton from "../../Shared/skeletons/PostSkeleton";
import LoadMoreButton from "../../Shared/Action Buttons/LoadMoreButton";
import { toast } from "sonner";

const DepartmentFeed = () => {
  const {
    isLoading,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = departmentHooks.useDepartmentFeed();

  if (isLoading) {
    return (
      <div className="mt-3 space-y-3">
        {[1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    toast.error("Error in Department feed");
    return null;
  }

  const posts = data.pages.flatMap((page) => page.data.posts);

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-xl shadow">
        No posts yet.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {posts.map((item) => (
          <DepartmentPostCard
            key={item.post._id}
            post={item.post}
            meta={item.meta}
          />
        ))}
      </div>

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

export default DepartmentFeed;
