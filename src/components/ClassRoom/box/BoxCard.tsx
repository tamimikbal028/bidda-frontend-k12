import type { Box } from "../../../types/box.types";
import { Link } from "react-router-dom";

const BoxCard = ({ box }: { box: Box }) => {
  return (
    <Link
      to={`/classroom/box/${box._id}`}
      key={box._id}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-blue-50 p-2 text-center transition-colors group-hover:bg-blue-100">
        <h3 className="text-lg font-bold text-gray-900">{box.title}</h3>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span
          className={
            box.isActive
              ? "rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
              : "rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
          }
        >
          {box.isActive ? "Active" : "Inactive"}
        </span>
        <span className="text-xs font-medium text-gray-400">
          {new Date(box.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
};

export default BoxCard;
