import { FaShare } from "react-icons/fa";
import { toast } from "sonner";

const ShareButton = ({ postId }: { postId: string }) => {
  const handleCopyLink = async () => {
    try {
      const link = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(link);
      toast.success("Post link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="flex items-center justify-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
    >
      <FaShare size={18} />
      <span className="text-sm font-medium">Share</span>
    </button>
  );
};

export default ShareButton;
