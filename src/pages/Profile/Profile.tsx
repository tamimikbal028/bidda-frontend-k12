import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProfileHeader,
  ProfilePosts,
  PublicFiles,
  ProfileTabs,
  CreateProfilePost,
  ProfileNotFound,
  ProfileBlocked,
} from "../../components/Profile";
import authHooks from "../../hooks/useAuth";
import profileHooks from "../../hooks/useProfile";
import ProfileHeaderSkeleton from "../../components/Shared/skeletons/ProfileHeaderSkeleton";
import confirm from "../../utils/sweetAlert";
import friendshipHooks from "../../hooks/common/useFriendship";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"posts" | "files">("posts");

  const { user: currentUser } = authHooks.useUser();
  const { mutate: unblockUser } = friendshipHooks.useUnblock();

  const {
    data: profileData,
    isLoading,
    error,
  } = profileHooks.useProfileHeader();

  if (isLoading) {
    return <ProfileHeaderSkeleton />;
  }

  if (error || !profileData) {
    return <ProfileNotFound />;
  }

  const { user, meta } = profileData;
  const isOwnProfile = meta?.isOwnProfile ?? username === currentUser?.userName;

  const handleUnblock = async () => {
    const ok = await confirm({
      title: "Unblock User?",
      text: "You will be able to send friend requests or follow this user again.",
      confirmButtonText: "Yes, unblock",
      icon: "question",
    });

    if (ok) {
      unblockUser({ userId: user._id });
    }
  };

  // 🚫 BLOCKED VIEW HANDLER
  if (meta.isBlockedByMe || meta.isBlockedByTarget) {
    return (
      <ProfileBlocked
        fullName={user.fullName}
        isBlockedByMe={!!meta.isBlockedByMe}
        onUnblock={meta.isBlockedByMe ? handleUnblock : undefined}
      />
    );
  }

  return (
    <>
      <ProfileHeader data={profileData} />

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOwnProfile={isOwnProfile}
        data={profileData}
      />

      {/* Tab Content */}
      <div>
        {activeTab === "posts" && (
          <div className="space-y-3">
            {/* Create Post Section (Only for Own Profile) */}
            {isOwnProfile && currentUser?._id && (
              <div className="mb-4">
                <CreateProfilePost />
              </div>
            )}
            <ProfilePosts isOwnProfile={isOwnProfile} />
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-3">
            <PublicFiles username={user.userName} isOwnProfile={isOwnProfile} />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
