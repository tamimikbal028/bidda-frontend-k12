import { FaFileAlt, FaComments, FaHashtag } from "react-icons/fa";

interface SearchFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const SearchFilters = ({
  activeFilter,
  onFilterChange,
}: SearchFiltersProps) => {
  const filters = [
    { id: "posts", name: "Posts", icon: FaFileAlt },
    { id: "hashtags", name: "Hashtags", icon: FaHashtag },
    { id: "comments", name: "Comments", icon: FaComments },
  ];

  return (
    <div className="flex items-center space-x-3 overflow-x-auto">
      {filters.map((filter) => {
        const IconComponent = filter.icon;

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`relative flex items-center space-x-2 rounded-full px-4 py-2 whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <IconComponent className="h-4 w-4" />
            <span className="text-sm font-medium">{filter.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SearchFilters;
