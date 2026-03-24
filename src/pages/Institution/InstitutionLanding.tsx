import { useState } from "react";
import { FaSearch, FaUniversity } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import institutionService from "../../services/institution.service";
import InstitutionCard from "../../components/Institution/InstitutionCard";

const InstitutionLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 🏛️ Get Followed Institutions
  const { data: followedData, isLoading: isLoadingFollowed } = useQuery({
    queryKey: ["followedInstitutions"],
    queryFn: () => institutionService.getFollowedInstitutions(),
    staleTime: 1000 * 60 * 5,
  });

  const { data: searchResults, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["institutionsSearch", searchQuery],
    queryFn: () => institutionService.searchInstitutions(searchQuery),
    enabled: searchQuery.length > 1,
    staleTime: 1000 * 60 * 5,
  });

  const followedInstitutions = followedData?.data.institutions || [];

  return (
    <>
      {/* Search Section - Always prominent */}
      <div className="space-y-3">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Institutions
          </h1>
          <p className="mt-2 text-gray-500">
            Search and discover academic communities across the platform
          </p>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="flex items-center rounded-2xl border-2 border-gray-100 bg-white px-5 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50/50">
            <FaSearch className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Institution name or Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent py-4 pl-4 text-lg text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.length > 1 && (
            <div className="absolute top-full right-0 left-0 z-20 mt-3 max-h-[400px] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
              {isLoadingSearch ? (
                <div className="flex items-center justify-center py-10">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                </div>
              ) : searchResults?.data.institutions?.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {searchResults.data.institutions.map((inst) => (
                    <InstitutionCard key={inst._id} inst={inst} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-sm font-medium text-gray-500">
                  No institutions found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Institutions You Follow */}
      {!searchQuery && (
        <div className="space-y-3 rounded-2xl bg-[#f8fafc] px-3 py-5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900">
              Institutions You Follow
            </h2>
            {followedInstitutions.length > 0 && (
              <span className="text-sm font-medium text-gray-500">
                {followedInstitutions.length} followed
              </span>
            )}
          </div>

          {isLoadingFollowed ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-gray-200"
                ></div>
              ))}
            </div>
          ) : followedInstitutions.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {followedInstitutions.map((inst) => (
                <InstitutionCard key={inst._id} inst={inst} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                <FaUniversity className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Not following any institutions yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Search for your college or university to stay updated.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InstitutionLanding;
