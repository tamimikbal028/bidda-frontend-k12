import { useState } from "react";
import SearchHeader from "../components/Search/SearchHeader";
import SearchFilters from "../components/Search/SearchFilters";
import SearchPosts from "../components/Search/tabs/SearchPosts";
import SearchHashtags from "../components/Search/tabs/SearchHashtags";
import SearchComments from "../components/Search/tabs/SearchComments";

const Search = () => {
  const [activeFilter, setActiveFilter] = useState<string>("posts");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <SearchHeader />
      <SearchFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Tab Content */}
      <div>
        {activeFilter === "posts" && <SearchPosts />}
        {activeFilter === "hashtags" && <SearchHashtags />}
        {activeFilter === "comments" && <SearchComments />}
      </div>
    </>
  );
};

export default Search;
