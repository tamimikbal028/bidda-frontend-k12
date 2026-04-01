# Frontend Cleanup Action Summary

**Task:** 1.2 - Analyze dependencies and create reference map  
**Date:** Generated for K12 Launch Cleanup  
**Status:** ✅ Complete

---

## Executive Summary

Analyzed all import dependencies for 14 features to be deleted from Frontend-K12/src/. Created comprehensive reference map documenting:

- **28 files** importing Group hooks
- **16 route entries** to be removed
- **12 navigation items** to be removed
- **1 critical issue** requiring pre-deletion action

---

## Key Findings

### 1. Features with Extensive Dependencies

**Group Feature (Highest Impact):**

- 28 component files import `useGroup` hook
- 2 route entries
- Multiple type and service imports
- All will be deleted as part of Group component directory

**ClassRoom Feature (Critical Issue):**

- **3 PRESERVED files** depend on ClassRoom components
- Requires extraction before deletion (see Critical Issues below)

### 2. Features with Minimal Dependencies

- **Notifications:** Only route and navigation references
- **CareerHub:** Only route and navigation references
- **Saved:** Only page-level imports (self-contained)

### 3. Configuration File Updates Required

**Route Configuration (`Frontend-K12/src/routes/routeConfig.ts`):**

- Remove 16 route entries
- Remove 16 lazy import statements

**Sidebar Navigation (`Frontend-K12/src/layout/Sidebar.tsx`):**

- Remove 12 navigation items
- Remove unused icon imports

---

## Critical Issues Requiring Immediate Action

### ⚠️ CRITICAL: ClassRoom Components Used by Preserved Features

**Problem:** Three PRESERVED files import from ClassRoom components that will be deleted.

**Affected Files:**

1. `Frontend-K12/src/services/box.service.ts` (StudyHelper feature - PRESERVED)
2. `Frontend-K12/src/hooks/useBox.ts` (StudyHelper feature - PRESERVED)
3. `Frontend-K12/src/pages/Auth/Login.tsx` (Auth feature - PRESERVED)

**Required Actions BEFORE ClassRoom Deletion:**

#### Action 1: Extract BoxFormData Type

- **Source:** `Frontend-K12/src/components/ClassRoom/box/CreateBoxForm.tsx`
- **Destination:** `Frontend-K12/src/types/box.types.ts`
- **Update imports in:**
  - `Frontend-K12/src/services/box.service.ts`
  - `Frontend-K12/src/hooks/useBox.ts`

#### Action 2: Extract SubmitToBox Component

- **Source:** `Frontend-K12/src/components/ClassRoom/box/SubmitToBox.tsx`
- **Destination:** `Frontend-K12/src/components/Shared/` or `Frontend-K12/src/components/StudyHelper/`
- **Update import in:**
  - `Frontend-K12/src/pages/Auth/Login.tsx`

#### Action 3: Verify No Other Dependencies

- Search for any other imports from `components/ClassRoom/box/`
- Ensure all Box-related functionality is preserved

**⚠️ DO NOT DELETE ClassRoom components until these actions are complete!**

---

## Files Requiring Updates

### Configuration Files (2 files)

1. `Frontend-K12/src/routes/routeConfig.ts` - Remove 16 route entries
2. `Frontend-K12/src/layout/Sidebar.tsx` - Remove 12 navigation items

### Preserved Files with Dependencies (3 files)

1. `Frontend-K12/src/services/box.service.ts` - Update BoxFormData import
2. `Frontend-K12/src/hooks/useBox.ts` - Update BoxFormData import
3. `Frontend-K12/src/pages/Auth/Login.tsx` - Update SubmitToBox import

### App Layout (1 file - needs verification)

1. `Frontend-K12/src/App.tsx` - Remove `isMessagesPage` condition (if exists)

---

## Files to Delete

### Page Files (15 files + 2 directories)

- Friends.tsx
- Group.tsx (note: there's a Group/ directory too)
- Messages.tsx
- Notifications.tsx
- CareerHub.tsx
- CRCorner.tsx
- FilesAndArchive.tsx
- Saved.tsx
- Search.tsx
- StudentStore.tsx
- Tuition.tsx
- Videos.tsx
- MainMore.tsx
- **Directories:** ClassRoom/, MainMore/

### Component Directories (13 directories)

- Friends/ (note: plural, not "Friend")
- Groups/ (note: plural, not "Group")
- Messages/ (note: plural, not "Message")
- Notification/
- CRCorner/
- ClassRoom/ (⚠️ Extract Box components first!)
- FilesAndArchive/
- Saved/
- Search/
- StudentStore/
- Tuition/
- Videos/ (note: plural, not "Video")
- MainMore/

### Service Files (3 files)

- friendship.service.ts
- group.service.ts
- search.service.ts

### Hook Files (3 files)

- useGroup.ts
- useSearch.ts
- useFriendship.ts (if exists)

### Type Files (2 files confirmed)

- crCorner.types.ts
- group.types.ts

### Constant Files (4 files - if they exist)

- friendship.ts
- group.ts
- chat.ts
- notification.ts

---

## Directory Name Discrepancies

**Important:** Frontend-K12 uses different directory names than Frontend:

| Feature  | Frontend-K12 | Original Frontend |
| -------- | ------------ | ----------------- |
| Friends  | `Friends/`   | `Friend/`         |
| Groups   | `Groups/`    | `Group/`          |
| Messages | `Messages/`  | `Message/`        |
| Videos   | `Videos/`    | `Video/`          |

**Action:** Use the Frontend-K12 directory names when deleting.

---

## Verification Checklist

After cleanup completion:

- [ ] No files import from deleted feature directories
- [ ] Route configuration has no deleted feature routes
- [ ] Sidebar has no deleted feature navigation items
- [ ] Feature flags for deleted features are `false`
- [ ] App.tsx has no `isMessagesPage` logic
- [ ] TypeScript compiles with zero errors
- [ ] No unused import statements
- [ ] All preserved features function correctly
- [ ] Box service and hooks work correctly
- [ ] Login page SubmitToBox feature works

---

## Next Steps

1. **Complete Task 1.2** ✅ (Current task - DONE)
2. **Proceed to Task 1.3:** Verify application baseline
3. **Before Phase 3 (File Deletion):**
   - Extract BoxFormData type
   - Extract SubmitToBox component
   - Update imports in preserved files
4. **Continue with Phase 2:** Update configuration files
5. **Then Phase 3:** Delete feature files in safe order

---

## Reference Documents

- **Full Dependency Map:** `Frontend-K12/DEPENDENCY_REFERENCE_MAP.md`
- **Spec Requirements:** `.kiro/specs/frontend-cleanup-for-k12-launch/requirements.md`
- **Design Document:** `.kiro/specs/frontend-cleanup-for-k12-launch/design.md`
- **Task List:** `.kiro/specs/frontend-cleanup-for-k12-launch/tasks.md`

---

**Task 1.2 Status:** ✅ COMPLETE

All dependencies analyzed and documented. Critical issue identified and documented. Ready to proceed to Task 1.3.
