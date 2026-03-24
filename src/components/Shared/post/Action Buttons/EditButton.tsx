import { FaEdit } from "react-icons/fa";

interface EditButtonProps {
  setIsEditing: (isEditing: boolean) => void;
  closeMenu: () => void;
}

const EditButton = ({ setIsEditing, closeMenu }: EditButtonProps) => {
  return (
    <button
      onClick={() => {
        closeMenu();
        setIsEditing(true);
      }}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
    >
      <FaEdit className="h-4 w-4 flex-shrink-0" />
      <span className="font-medium">Edit post</span>
    </button>
  );
};

export default EditButton;
