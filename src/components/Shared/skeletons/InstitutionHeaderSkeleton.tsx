const InstitutionHeaderSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      {/* Top Info Bar Skeleton */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          {/* Logo Skeleton */}
          <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-200"></div>

          {/* Name Skeleton */}
          <div className="h-6 flex-1 rounded bg-gray-200"></div>

          {/* Follow Button Skeleton */}
          <div className="h-10 w-24 rounded-lg bg-gray-200"></div>
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <div className="relative h-64 w-full bg-gray-200 md:h-80">
        {/* Back Button Skeleton */}
        <div className="absolute top-4 left-4 h-10 w-10 rounded-lg bg-gray-300/50"></div>

        {/* Menu Button Skeleton */}
        <div className="absolute top-4 right-4 h-10 w-10 rounded-lg bg-gray-300/50"></div>

        {/* Stats Section Skeleton */}
        <div className="absolute right-4 bottom-4 left-4">
          <div className="rounded-lg bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
              <div className="h-4 w-16 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* NavBar Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="flex gap-4 px-4 py-3">
          <div className="h-8 w-16 rounded bg-gray-200"></div>
          <div className="h-8 w-24 rounded bg-gray-200"></div>
          <div className="h-8 w-20 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionHeaderSkeleton;
