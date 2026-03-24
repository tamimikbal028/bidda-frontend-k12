import { FaTrash } from "react-icons/fa";
import confirm from "../../../../utils/sweetAlert";
import postHooks from "../../../../hooks/common/usePost";

interface DeleteButtonProps {
  postId: string;
  queryKey: (string | undefined)[][];
  invalidateKey: (string | undefined)[][];
  closeMenu: () => void;
}

const DeletePostButton = ({
  postId,
  queryKey,
  invalidateKey,
  closeMenu,
}: DeleteButtonProps) => {

  const { mutate: deletePost, isPending: isDeleting } = postHooks.useDeletePost(
    { queryKey, invalidateKey }
  );

  const handleDelete = async () => {
    closeMenu();
    const isConfirmed = await confirm({
      title: "Delete Post?",
      text: "This action cannot be undone.",
      confirmButtonText: "Yes, delete it",
      icon: "warning",
    });

    if (isConfirmed) {
      deletePost({ postId });
    }
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
    >
      <FaTrash className="h-4 w-4 flex-shrink-0" />
      <span className="font-medium">
        {isDeleting ? "Deleting..." : "Delete post"}
      </span>
    </button>
  );
};

export default DeletePostButton;
