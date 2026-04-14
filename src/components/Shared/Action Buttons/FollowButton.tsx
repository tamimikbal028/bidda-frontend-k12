import followHooks from "@/hooks/common/useFollow";
import { FOLLOW_TARGET_MODELS } from "@/constants";

interface FollowButtonProps {
  targetId: string;
  targetModel: (typeof FOLLOW_TARGET_MODELS)[keyof typeof FOLLOW_TARGET_MODELS];
  isFollowing: boolean;
  invalidateKeys: (string | undefined)[][];
}

const FollowButton = ({
  targetId,
  targetModel,
  isFollowing,
  invalidateKeys,
}: FollowButtonProps) => {
  const { mutate: toggleFollow, isPending } = followHooks.useToggleFollow({
    invalidateKeys,
  });
  return (
    <button
      onClick={() => toggleFollow({ targetId, targetModel })}
      disabled={isPending}
      className={`gap-2 rounded-md px-6 py-2 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isFollowing
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isPending ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
