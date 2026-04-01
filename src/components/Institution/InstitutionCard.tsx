import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Institution } from "../../types";
import { AvatarImage } from "../../utils/components/FallbackImage";

interface InstitutionCardProps {
  inst: Institution;
}

const InstitutionCard = ({ inst }: InstitutionCardProps) => {
  return (
    <Link
      key={inst._id}
      to={`/institutions/${inst._id}`}
      className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <AvatarImage
            src={inst.logo}
            name={inst.name}
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {inst.name}
          </h3>
          <p className="text-sm font-semibold text-gray-500">
            {inst.location || inst.code}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-lg font-bold text-gray-900">
            {inst.followersCount || 0}
          </span>
          <span className="text-sm font-medium">
            {(inst.followersCount || 0) <= 1 ? "Follower" : "Followers"}
          </span>
        </div>
        <FaChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default InstitutionCard;
