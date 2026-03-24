import VideoCard from "./VideoCard";
import LoadMoreButton from "../Shared/Action Buttons/LoadMoreButton";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  uploadedAt: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoClick?: (video: Video) => void;
  hasMore?: boolean;
}

const VideoGrid = ({
  videos,
  onVideoClick,
  hasMore = true,
}: VideoGridProps) => {
  return (
    <>
      {/* Videos Grid */}
      <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onVideoClick={onVideoClick} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <LoadMoreButton onClick={() => {}} isLoading={false} />
        </div>
      )}
    </>
  );
};

export default VideoGrid;
