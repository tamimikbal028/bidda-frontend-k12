# Dependency Reference Map for Frontend Cleanup

**Generated:** Task 1.2 - Analyze dependencies and create reference map  
**Purpose:** Document all files that import from features to be deleted  
**Target Folder:** Frontend-K12/src/

---

## Summary

This document maps all import dependencies for the 14 features to be deleted. Use this as a reference during the cleanup process to identify files that need updates after deletions.

### Features to Delete:

1. Friends
2. Group
3. Messages
4. Notifications
5. CareerHub
6. CRCorner
7. ClassRoom
8. FilesAndArchive
9. Saved
10. Search
11. StudentStore
12. Tuition
13. Videos
14. MainMore (including Blood Donation)

---

## 1. Friends Feature Dependencies

### Service Imports

**File:** `Frontend-K12/src/hooks/common/useFriendship.ts`

- Imports: `friendServices from "../../services/friendship.service"`
- **Action Required:** Delete this hook file (it's in the deletion list)

### Component Imports

**File:** `Frontend-K12/src/pages/Friends.tsx`

- Imports from: `"../components/Friends"` (note: directory name is "Friends" not "Friend")
- Imports: `SearchFriends from "../components/Friends/SearchFriends"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Line 287-292: Route entry for `/friends/*`
- Lazy import: `lazy(() => import("../pages/Friends"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 158-162: Navigation item for Friends
- Path: `/friends`
- **Action Required:** Remove navigation item

---

## 2. Group Feature Dependencies

### Service Imports

**File:** `Frontend-K12/src/hooks/useGroup.ts`

- Imports: `groupServices from "../services/group.service"`
- **Action Required:** Delete this hook file (it's in the deletion list)

### Hook Imports (Extensive - 28 files)

The following files import `groupHooks from "../../hooks/useGroup"` or similar:

#### Page Files:

1. `Frontend-K12/src/pages/Group/GroupDetail.tsx`
2. `Frontend-K12/src/pages/Group/EditGroupPage.tsx`
3. `Frontend-K12/src/pages/Group/CreateGroupPage.tsx`

#### Component Files:

4. `Frontend-K12/src/components/Shared/post/PostEdit.tsx`
5. `Frontend-K12/src/components/Groups/Edit/GeneralTab.tsx`
6. `Frontend-K12/src/components/Groups/Edit/SettingsTab.tsx`
7. `Frontend-K12/src/components/Groups/Edit/PhotosTab.tsx`
8. `Frontend-K12/src/components/Groups/PendingPostCard.tsx`
9. `Frontend-K12/src/components/Groups/GroupPostCard.tsx`
10. `Frontend-K12/src/components/Groups/GroupNavBar.tsx`
11. `Frontend-K12/src/components/Groups/utils/GroupAccessDenied.tsx`
12. `Frontend-K12/src/components/Groups/GroupMemberCard.tsx`
13. `Frontend-K12/src/components/Groups/utils/GroupCard.tsx`
14. `Frontend-K12/src/components/Groups/GroupHeader.tsx`
15. `Frontend-K12/src/components/Groups/group-tabs-inside/GroupModerationTab.tsx`
16. `Frontend-K12/src/components/Groups/group-tabs/MyGroups.tsx`
17. `Frontend-K12/src/components/Groups/group-tabs/SearchGroups.tsx`
18. `Frontend-K12/src/components/Groups/group-tabs/SentGroupRequests.tsx`
19. `Frontend-K12/src/components/Groups/group-tabs-inside/Marketplace.tsx`
20. `Frontend-K12/src/components/Groups/group-tabs/UniversityGroups.tsx`
21. `Frontend-K12/src/components/Groups/group-tabs-inside/GroupRequestsTab.tsx`
22. `Frontend-K12/src/components/Groups/group-tabs/SuggestedGroups.tsx`
23. `Frontend-K12/src/components/Groups/group-tabs/InvitedGroup.tsx`
24. `Frontend-K12/src/components/Groups/group-tabs-inside/GroupPosts.tsx`
25. `Frontend-K12/src/components/Groups/group-tabs-inside/GroupPinnedPosts.tsx`
26. `Frontend-K12/src/components/Groups/group-tabs-inside/GroupMembersTab.tsx`
27. `Frontend-K12/src/components/Groups/group-tabs/CareerGroups.tsx`
28. `Frontend-K12/src/components/Groups/CreateMarketplacePost.tsx`
29. `Frontend-K12/src/components/Groups/CreateGroupPost.tsx`

**Action Required:** All these files will be deleted as part of Group component directory deletion

### Component Imports

**File:** `Frontend-K12/src/pages/Group/Groups.tsx`

- Imports multiple components from `"../../components/Groups/"`
- **Action Required:** Delete this page file (it's in the deletion list)

**File:** `Frontend-K12/src/pages/Group/GroupDetail.tsx`

- Imports multiple components from `"../../components/Groups/"`
- **Action Required:** Delete this page file (it's in the deletion list)

**File:** `Frontend-K12/src/pages/Group/EditGroupPage.tsx`

- Imports components from `"../../components/Groups/Edit/"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Type Imports

**File:** `Frontend-K12/src/services/group.service.ts`

- Imports: `CreateGroupData from "../types/group.types"`
- **Action Required:** Delete this service file (it's in the deletion list)

**Files importing group types:**

1. `Frontend-K12/src/components/Groups/utils/GroupAccessDenied.tsx`
2. `Frontend-K12/src/components/Groups/utils/GroupBanned.tsx`

**Action Required:** All these files will be deleted as part of Group component directory deletion

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 215-220: Route entry for `/groups/*`
- Lines 224-229: Route entry for `/groups/:slug/edit`
- Lazy imports: `lazy(() => import("../pages/Group/Groups"))` and `lazy(() => import("../pages/Group/EditGroupPage"))`
- **Action Required:** Remove both route entries and lazy imports

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 90-94: Navigation item for Groups
- Path: `/groups`
- **Action Required:** Remove navigation item

---

## 3. Messages Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/Messages.tsx`

- Imports: `{ ConversationList, ChatArea } from "../components/Messages"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 242-247: Route entry for `/messages`
- Lazy import: `lazy(() => import("../pages/Messages"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 83-87: Navigation item for Messages
- Path: `/messages`
- **Action Required:** Remove navigation item

### App Layout Logic

**File:** `Frontend-K12/src/App.tsx`

- Contains `isMessagesPage` condition (needs verification)
- **Action Required:** Remove `isMessagesPage` constant and related conditional logic

---

## 4. Notifications Feature Dependencies

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 233-238: Route entry for `/notifications`
- Lazy import: `lazy(() => import("../pages/Notifications"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 165-170: Navigation item for Notifications
- Path: `/notifications`
- Badge: 5 (notification count)
- **Action Required:** Remove navigation item

---

## 5. CareerHub Feature Dependencies

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 269-274: Route entry for `/career-hub`
- Lazy import: `lazy(() => import("../pages/CareerHub"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 180-184: Navigation item for Career Hub
- Path: `/career-hub`
- **Action Required:** Remove navigation item

---

## 6. CRCorner Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/CRCorner.tsx`

- Imports multiple components from `"../components/CRCorner/"`
- Imports: `AnnouncementForm, PollForm, AnnouncementCard, PollCard, EndedPollCard`
- **Action Required:** Delete this page file (it's in the deletion list)

### Type Imports

**File:** `Frontend-K12/src/pages/CRCorner.tsx`

- Imports: `{ Announcement, Poll } from "../types/crCorner.types"`

**Files importing crCorner types:**

1. `Frontend-K12/src/components/CRCorner/EndedPollCard.tsx`
2. `Frontend-K12/src/components/CRCorner/PollCard.tsx`
3. `Frontend-K12/src/components/CRCorner/AnnouncementCard.tsx`

**Action Required:** All these files will be deleted as part of CRCorner component directory deletion

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 72-77: Route entry for `/cr-corner`
- Lazy import: `lazy(() => import("../pages/CRCorner"))`
- **Action Required:** Remove route entry and lazy import

---

## 7. ClassRoom Feature Dependencies

### Component Imports (Extensive)

**File:** `Frontend-K12/src/services/box.service.ts`

- Imports: `BoxFormData from "../components/ClassRoom/box/CreateBoxForm"`
- **Action Required:** This service is PRESERVED. Need to move BoxFormData type definition out of ClassRoom components

**File:** `Frontend-K12/src/hooks/useBox.ts`

- Imports: `BoxFormData from "../components/ClassRoom/box/CreateBoxForm"`
- **Action Required:** This hook is PRESERVED. Need to move BoxFormData type definition out of ClassRoom components

**File:** `Frontend-K12/src/pages/Auth/Login.tsx`

- Imports: `SubmitToBox from "../../components/ClassRoom/box/SubmitToBox"`
- **Action Required:** This is a PRESERVED page. Need to move SubmitToBox component out of ClassRoom directory

#### Page Files:

1. `Frontend-K12/src/pages/ClassRoom/EditRoomPage.tsx` - Imports from `"../../components/ClassRoom/Edit/"`
2. `Frontend-K12/src/pages/ClassRoom/RoomDetails.tsx` - Imports multiple components from `"../../components/ClassRoom/"`
3. `Frontend-K12/src/pages/ClassRoom/CreateRoomPage.tsx` - Imports from `"../../components/ClassRoom/"`
4. `Frontend-K12/src/pages/ClassRoom/ClassRoom.tsx` - Imports multiple components from `"../../components/ClassRoom/"`

**Action Required:** All these page files will be deleted

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 83-88: Route entry for `/classroom/*`
- Lazy import: `lazy(() => import("../pages/ClassRoom/ClassRoom"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 69-73: Navigation item for ClassRoom
- Path: `/classroom`
- **Action Required:** Remove navigation item

### **CRITICAL ISSUE - Preserved Features Depend on ClassRoom Components:**

The following PRESERVED files import from ClassRoom components:

1. `Frontend-K12/src/services/box.service.ts` (PRESERVED - StudyHelper feature)
2. `Frontend-K12/src/hooks/useBox.ts` (PRESERVED - StudyHelper feature)
3. `Frontend-K12/src/pages/Auth/Login.tsx` (PRESERVED - Auth feature)

**Required Actions Before Deletion:**

1. Extract `BoxFormData` type from `components/ClassRoom/box/CreateBoxForm` and move to `types/box.types.ts`
2. Extract `SubmitToBox` component from `components/ClassRoom/box/` and move to `components/Shared/` or `components/StudyHelper/`
3. Update imports in the 3 preserved files above

---

## 8. FilesAndArchive Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/FilesAndArchive.tsx`

- Imports: `PersonalFiles from "../components/FilesAndArchive/PersonalFiles"`
- Imports: `CommunityStudyArchive from "../components/FilesAndArchive/CommunityStudyArchive"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 184-190: Route entry for `/files`
- Lazy import: `lazy(() => import("../pages/FilesAndArchive"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 76-80: Navigation item for Files & Archive
- Path: `/files`
- **Action Required:** Remove navigation item

---

## 9. Saved Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/Saved.tsx`

- Imports: `mockSavedItems from "../components/Saved/data/savedData"`
- Imports: `SavedCategories from "../components/Saved/SavedCategories"`
- Imports: `SavedItemCard from "../components/Saved/SavedItemCard"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 278-283: Route entry for `/saved`
- Lazy import: `lazy(() => import("../pages/Saved"))`
- **Action Required:** Remove route entry and lazy import

---

## 10. Search Feature Dependencies

### Service Imports

**File:** `Frontend-K12/src/hooks/useSearch.ts`

- Imports: `searchServices from "../services/search.service"`
- **Action Required:** Delete this hook file (it's in the deletion list)

### Hook Imports

**Files importing useSearch hook:**

1. `Frontend-K12/src/components/Search/tabs/SearchComments.tsx`
2. `Frontend-K12/src/components/Search/tabs/SearchPosts.tsx`
3. `Frontend-K12/src/components/Search/tabs/SearchHashtags.tsx`

**Action Required:** All these files will be deleted as part of Search component directory deletion

### Component Imports

**File:** `Frontend-K12/src/pages/Search.tsx`

- Imports multiple components from `"../components/Search/"`
- Imports: `SearchHeader, SearchFilters, SearchPosts, SearchHashtags, SearchComments`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 174-179: Route entry for `/search`
- Lazy import: `lazy(() => import("../pages/Search"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 97-101: Navigation item for Search
- Path: `/search`
- **Action Required:** Remove navigation item

---

## 11. StudentStore Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/StudentStore.tsx`

- Imports from `"../components/StudentStore/data/marketplaceData"`
- Imports: `ProductCard, FilterBar, ProductModal, SellModal from "../components/StudentStore/"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 195-200: Route entry for `/store`
- Lazy import: `lazy(() => import("../pages/StudentStore"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 187-191: Navigation item for Student Store
- Path: `/store`
- **Action Required:** Remove navigation item

---

## 12. Tuition Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/Tuition.tsx`

- Imports: `FindTutor from "../components/Tuition/FindTutor"`
- Imports: `BecomeTutor from "../components/Tuition/BecomeTutor"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 204-209: Route entry for `/tuition`
- Lazy import: `lazy(() => import("../pages/Tuition"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 194-198: Navigation item for Tuition
- Path: `/tuition`
- **Action Required:** Remove navigation item

---

## 13. Videos Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/Videos.tsx`

- Imports: `VideosHeader from "../components/Videos/VideosHeader"`
- Imports: `VideoCategories from "../components/Videos/VideoCategories"`
- Imports: `VideoGrid from "../components/Videos/VideoGrid"`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 296-301: Route entry for `/videos`
- Lazy import: `lazy(() => import("../pages/Videos"))`
- **Action Required:** Remove route entry and lazy import

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 201-205: Navigation item for Videos
- Path: `/videos`
- **Action Required:** Remove navigation item

---

## 14. MainMore Feature Dependencies

### Component Imports

**File:** `Frontend-K12/src/pages/MainMore/BloodDonation.tsx`

- Imports multiple components from `"../../components/MainMore/BloodDonation/"`
- Imports: `BloodDonationHeader, BloodDonationTabs, BloodRequestsTab, FindDonorsTab, DonorListTab`
- **Action Required:** Delete this page file (it's in the deletion list)

### Route Configuration

**File:** `Frontend-K12/src/routes/routeConfig.ts`

- Lines 346-352: Route entry for `/more`
- Lines 356-361: Route entry for `/more/blood-donation`
- Lazy imports: `lazy(() => import("../pages/MainMore"))` and `lazy(() => import("../pages/MainMore/BloodDonation"))`
- **Action Required:** Remove both route entries and lazy imports

### Navigation

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

- Lines 208-212: Navigation item for More
- Path: `/more`
- **Action Required:** Remove navigation item

---

## Configuration Files Summary

### Route Configuration File

**File:** `Frontend-K12/src/routes/routeConfig.ts`

**Routes to Remove (14 features = 16 route entries):**

1. Line 72-77: `/cr-corner`
2. Line 83-88: `/classroom/*`
3. Line 174-179: `/search`
4. Line 184-190: `/files`
5. Line 195-200: `/store`
6. Line 204-209: `/tuition`
7. Line 215-220: `/groups/*`
8. Line 224-229: `/groups/:slug/edit`
9. Line 233-238: `/notifications`
10. Line 242-247: `/messages`
11. Line 269-274: `/career-hub`
12. Line 278-283: `/saved`
13. Line 287-292: `/friends/*`
14. Line 296-301: `/videos`
15. Line 346-352: `/more`
16. Line 356-361: `/more/blood-donation`

### Sidebar Navigation File

**File:** `Frontend-K12/src/layout/Sidebar.tsx`

**Navigation Items to Remove (14 features):**

1. Lines 69-73: ClassRoom
2. Lines 76-80: Files & Archive
3. Lines 83-87: Messages
4. Lines 90-94: Groups
5. Lines 97-101: Search
6. Lines 158-162: Friends
7. Lines 165-170: Notifications (with badge)
8. Lines 180-184: Career Hub
9. Lines 187-191: Student Store
10. Lines 194-198: Tuition
11. Lines 201-205: Videos
12. Lines 208-212: More

---

## Critical Issues Requiring Pre-Deletion Actions

### Issue 1: ClassRoom Components Used by Preserved Features

**Problem:** Three PRESERVED files import from ClassRoom components that will be deleted:

1. **`Frontend-K12/src/services/box.service.ts`** (PRESERVED - StudyHelper)
   - Imports: `BoxFormData from "../components/ClassRoom/box/CreateBoxForm"`

2. **`Frontend-K12/src/hooks/useBox.ts`** (PRESERVED - StudyHelper)
   - Imports: `BoxFormData from "../components/ClassRoom/box/CreateBoxForm"`

3. **`Frontend-K12/src/pages/Auth/Login.tsx`** (PRESERVED - Auth)
   - Imports: `SubmitToBox from "../../components/ClassRoom/box/SubmitToBox"`

**Solution Required:**

1. Extract `BoxFormData` type definition and move to `Frontend-K12/src/types/box.types.ts`
2. Extract `SubmitToBox` component and move to `Frontend-K12/src/components/Shared/` or `Frontend-K12/src/components/StudyHelper/`
3. Update imports in the 3 files above
4. Verify no other preserved files depend on ClassRoom components

**This must be completed BEFORE deleting ClassRoom components!**

---

## Files Requiring No Import Updates

The following files are part of features being deleted and will be removed entirely, so no import updates are needed:

- All page files for deleted features
- All component directories for deleted features
- All service files for deleted features (except box.service.ts which is preserved)
- All hook files for deleted features (except useBox.ts which is preserved)
- All type files for deleted features

---

## Verification Checklist

After completing the cleanup, verify:

- [ ] No remaining files import from deleted feature directories
- [ ] Route configuration contains no references to deleted features
- [ ] Sidebar navigation contains no items for deleted features
- [ ] Feature flags for deleted features are set to false
- [ ] App.tsx has no layout logic for deleted features (e.g., isMessagesPage)
- [ ] TypeScript compilation succeeds with zero errors
- [ ] No unused import statements remain
- [ ] All preserved features still function correctly

---

## Notes

1. **Directory Name Discrepancy:** The Friends feature uses directory name "Friends" (plural) in Frontend-K12, not "Friend" (singular) as in the original Frontend folder.

2. **Videos Directory Name:** The Videos feature uses directory name "Videos" (plural) in Frontend-K12, not "Video" (singular) as in the original Frontend folder.

3. **Groups Directory Name:** The Groups feature uses directory name "Groups" (plural) in Frontend-K12 for components.

4. **No Constants Found:** No import statements were found for:
   - `constants/friendship.ts`
   - `constants/group.ts`
   - `constants/chat.ts`
   - `constants/notification.ts`

   These files may not exist or may not be imported anywhere. Verify their existence before attempting deletion.

5. **No Direct Type Imports Found (except CRCorner and Group):** Most features don't have direct type imports in the search results, except:
   - `types/crCorner.types.ts` (imported by CRCorner components)
   - `types/group.types.ts` (imported by Group service and components)

---

**End of Dependency Reference Map**
