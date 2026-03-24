import { FaArchive } from "react-icons/fa";
import boxHooks from "../../../hooks/useBox";
import BoxCard from "./BoxCard";

const InactiveBoxesList = () => {
  const { data, isPending, error } = boxHooks.useGetInactiveBoxes();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-medium text-gray-500">
          Loading inactive boxes...
        </h1>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full border border-red-200 bg-red-50 p-4">
          <FaArchive className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-red-900">Error</h3>
        <p className="mt-2 text-sm font-medium text-red-500">
          {error?.message || "Failed to fetch inactive boxes"}
        </p>
      </div>
    );
  }

  const boxes = data.data.boxes;

  if (boxes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full border border-gray-200 bg-gray-50 p-4">
          <FaArchive className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No Inactive Boxes
        </h3>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Archived boxes will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 bg-gray-50 p-3">
      {boxes.map((box) => (
        <BoxCard key={box._id} box={box} />
      ))}
    </div>
  );
};

export default InactiveBoxesList;
