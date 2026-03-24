import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const FriendsHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/friends/search";

  const handleSearchClick = () => {
    navigate("/friends/search");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          title="Go back"
          className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <FaArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
      </div>

      {/* Search Button - Circle with icon only */}
      <button
        onClick={handleSearchClick}
        title={isSearchPage ? "Search Active" : "Search People"}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
          isSearchPage
            ? "border-2 border-blue-600 bg-blue-50 text-blue-700 shadow-md"
            : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
        }`}
      >
        <FaSearch className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FriendsHeader;
