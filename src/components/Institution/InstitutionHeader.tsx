import { FOLLOW_TARGET_MODELS, INSTITUTION_KEYS } from "../../constants";
import InstitutionNavBar from "./InstitutionNavBar";
import FollowButton from "../Shared/Action Buttons/FollowButton";
import { useParams } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import BackButton from "../Shared/Action Buttons/BackButton";
import institutionHooks from "../../hooks/useInstitution";
import InstitutionHeaderSkeleton from "../Shared/skeletons/InstitutionHeaderSkeleton";
import NotFoundError from "../Shared/errors/NotFoundError";
import { AvatarImage, CoverImage } from "../../utils/components/FallbackImage";

const InstitutionHeader = () => {
  const { instId } = useParams();

  const { data, isLoading, error } = institutionHooks.useInstitutionHeader();

  if (isLoading) {
    return <InstitutionHeaderSkeleton />;
  }

  if (error || !data) {
    return (
      <NotFoundError
        title="Institution Not Found"
        message="The institution you are looking for does not exist or has been deactivated."
      />
    );
  }

  const { institution, meta } = data.data;

  return (
    <div className="relative">
      {/* Top Info Bar */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          {/* Logo - Smaller */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
            <AvatarImage
              src={institution.logo}
              name={institution.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Institution Name and Location - Can wrap to next line */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-gray-900">
              {institution.name}
            </h1>
            {institution.location && (
              <p className="truncate text-xs font-semibold tracking-wide text-gray-500 uppercase">
                {institution.location}
              </p>
            )}
          </div>

          {/* Follow Button - Stays on same line as logo */}
          <FollowButton
            targetId={institution._id}
            targetModel={FOLLOW_TARGET_MODELS.INSTITUTION}
            isFollowing={meta.isFollowing}
            invalidateKeys={[[INSTITUTION_KEYS.HEADER, instId]]}
          />
        </div>
      </div>

      {/* Cover Image with Floating Elements */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <CoverImage
          src={institution.coverImage}
          name={institution.name}
          className="h-full w-full object-cover"
        />

        {/* Back Button */}
        <BackButton />

        {/* 3-Dot Menu Button */}
        <HeaderMenu meta={meta} />

        {/* Website Link - Floating at Bottom*/}
        <div className="absolute right-4 bottom-4 left-4">
          <div className="rounded-lg bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-center text-sm md:justify-start">
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-medium text-blue-600 hover:underline"
              >
                <span>Website</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NavBar Section */}
      <div className="bg-white shadow-sm">
        <InstitutionNavBar />
      </div>
    </div>
  );
};

export default InstitutionHeader;
