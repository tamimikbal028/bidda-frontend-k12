import institutionHooks from "../../../hooks/useInstitution";

const InstitutionAbout = () => {
  const { data: detailsResponse, isLoading } =
    institutionHooks.useInstitutionDetails();

  const institution = detailsResponse?.data.institution;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="py-20 text-center text-gray-500">
        Failed to load institution details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="flex justify-between gap-3">
        {/* Total Posts Card */}
        <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Posts</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {institution.postsCount}
            </p>
          </div>
        </div>

        {/* Followers Card */}
        <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Followers</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {institution.followersCount}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Institution Details */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Institution Name
                </p>
                <p className="mt-1 text-base font-semibold text-gray-900">
                  {institution.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Code</p>
                <p className="mt-1 text-base font-semibold text-gray-900">
                  {institution.code}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Type</p>
                <p className="mt-1 text-base font-semibold text-gray-900 capitalize">
                  {institution.type.toLowerCase()}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="mt-1 text-base font-semibold text-gray-900 capitalize">
                  {institution.category.toLowerCase()}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="mt-1 text-base font-semibold text-gray-900">
                  {institution.location}
                </p>
              </div>

              {institution.description && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Description
                  </p>
                  <p className="mt-1 text-base text-gray-700">
                    {institution.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Contact Information
            </h3>
            <div className="space-y-4">
              {institution.website ? (
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-base font-medium text-blue-600 hover:underline"
                  >
                    {institution.website}
                  </a>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <p className="mt-1 text-base text-gray-400 italic">
                    Not available
                  </p>
                </div>
              )}

              {institution.contactEmails &&
              institution.contactEmails.length > 0 ? (
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <div className="mt-1 space-y-1">
                    {institution.contactEmails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="block text-base font-medium text-blue-600 hover:underline"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-base text-gray-400 italic">
                    Not available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionAbout;
