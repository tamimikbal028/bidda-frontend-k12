import institutionHooks from "../../../hooks/useInstitution";
import InstitutionPostCard from "../InstitutionPostCard";
import CreateInstitutionPost from "../CreateInstitutionPost";
import PostSkeleton from "../../Shared/skeletons/PostSkeleton";
import LoadMoreButton from "../../Shared/Action Buttons/LoadMoreButton";
import NotFoundError from "../../Shared/errors/NotFoundError";

const InstitutionFeed = () => {
  const {
    isLoading,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = institutionHooks.useInstitutionFeed();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <NotFoundError
        title="Posts Not Found"
        message="The posts you are looking for do not exist or could not be loaded."
      />
    );
  }

  const posts = data.pages.flatMap((page) => page.data.posts);

  return (
    <>
      {/* Create Post */}
      <CreateInstitutionPost />

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="mt-4 space-y-3">
          {posts.map((item) => (
            <InstitutionPostCard
              key={item.post._id}
              post={item.post}
              meta={item.meta}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-12 text-center shadow">
          <p className="text-gray-500">No official updates yet.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="mx-auto mt-5 flex justify-center">
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          />
        </div>
      )}
    </>
  );
};

export default InstitutionFeed;
