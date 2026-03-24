import { FaLink } from "react-icons/fa";
import { toast } from "sonner";

interface CopyLinkButtonProps {
  postId: string;
  closeMenu: () => void;
}

const CopyLinkButton = ({ postId, closeMenu }: CopyLinkButtonProps) => {

  const handleCopyLink = async () => {
    try {
      const link = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(link);
      toast.success("Post link copied to clipboard");
      closeMenu();
    } catch {
      toast.error("Failed to copy link");
    }
  };
  return (
    <button
      onClick={handleCopyLink}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
    >
      <FaLink className="h-4 w-4 flex-shrink-0" />
      <span className="font-medium">Copy link</span>
    </button>
  );
};

export default CopyLinkButton;
