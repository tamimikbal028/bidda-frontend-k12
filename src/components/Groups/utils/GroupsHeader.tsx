
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

const GroupsHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/groups/search";

  const handleSearchClick = () => {
    navigate("/groups/search");
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
        <p className="mt-1 text-gray-600">
          Connect with communities that share your interests
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search Button - Circle with icon only */}
        <button
          onClick={handleSearchClick}
          title={isSearchPage ? "Search Active" : "Search Groups"}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
            isSearchPage
              ? "border-2 border-blue-600 bg-blue-50 text-blue-700 shadow-md"
              : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
          }`}
        >
          <FaSearch className="h-4 w-4" />
        </button>

        {/* Create Group Button */}
        <Link
          to="/groups/creategroup"
          className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600 transition-all hover:border-blue-300 hover:bg-blue-100"
        >
          <FaPlus size={14} />
          Create Group
        </Link>
      </div>
    </div>
  );
};

export default GroupsHeader;
