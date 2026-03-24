import { Link } from "react-router-dom";
import SeparatorDot from "../SeparatorDot";
import { formatPostClock, formatPostDate } from "../../../utils/dateUtils";

interface PostHeaderLeftProps {
  displayName: string;
  displayAvatar: string;
  displayUrl: string;
  createdAt: string;
  isEdited: boolean;
}

const PostHeaderLeft = ({
  displayName,
  displayAvatar,
  displayUrl,
  createdAt,
  isEdited,
}: PostHeaderLeftProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Link to={displayUrl}>
        <img
          src={displayAvatar}
          alt={displayName}
          className="h-10 w-10 rounded-full bg-gray-300 object-cover"
        />
      </Link>
      <div>
        <Link
          to={displayUrl}
          className="font-semibold text-gray-900 hover:underline"
        >
          {displayName}
        </Link>
        <p className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>{formatPostDate(createdAt)}</span>
          <SeparatorDot ariaHidden />
          <span>{formatPostClock(createdAt)}</span>
          {isEdited && (
            <>
              <SeparatorDot ariaHidden />
              <span className="text-gray-400 italic">Edited</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default PostHeaderLeft;
