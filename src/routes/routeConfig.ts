import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Enhanced Route configuration - Industry standard approach
interface RouteConfig {
  path: string;
  Component: LazyExoticComponent<ComponentType> | ComponentType;
  requireAuth: boolean;
  title: string;
  preload?: boolean;
  category?: string;
  display: boolean;
  meta?: {
    description?: string;
    keywords?: string[];
    ogTitle?: string;
  };
}

export const routes: RouteConfig[] = [
  // Public routes
  {
    path: "/login",
    display: true,
    Component: Login,
    requireAuth: false,
    title: "Login",
    category: "auth",
    meta: {
      description: "Login to your account",
      keywords: ["login", "signin"],
    },
  },
  {
    path: "/register",
    display: true,
    Component: Register,
    requireAuth: false,
    title: "Register",
    category: "auth",
    meta: {
      description: "Create a new account",
      keywords: ["register", "signup"],
    },
  },

  // Core app routes
  {
    path: "/",
    display: true,
    Component: Home,
    requireAuth: true,
    title: "Home",
    preload: true,
    category: "main",
    meta: { description: "Your social hub dashboard" },
  },
  {
    path: "/gaming/*",
    display: import.meta.env.VITE_COMPETITION === "true",
    Component: lazy(() => import("../pages/Gaming/Gaming")),
    requireAuth: true,
    title: "Gaming",
    category: "entertainment",
    meta: { description: "Gaming hub and competitions" },
  },
  {
    path: "/cr-corner",
    display: import.meta.env.VITE_CR_CORNER === "true",
    Component: lazy(() => import("../pages/CRCorner")),
    requireAuth: true,
    title: "CR Corner",
    category: "education",
    meta: {
      description: "Class announcements, polls, and updates from your CR",
    },
  },
  {
    path: "/classroom/*",
    display: import.meta.env.VITE_CLASSROOM === "true",
    Component: lazy(() => import("../pages/ClassRoom/ClassRoom")),
    requireAuth: true,
    title: "ClassRoom",
    category: "education",
    meta: { description: "Attend and manage live online classes" },
  },

  // Institutions routes
  {
    path: "/institutions",
    display: import.meta.env.VITE_INSTITUTIONS === "true",
    Component: lazy(() => import("../pages/Institution/InstitutionLanding")),
    requireAuth: true,
    title: "Search Institution & Department",
    category: "education",
    meta: { description: "Find and join your institution" },
  },
  {
    path: "/my-institution",
    display: import.meta.env.VITE_INSTITUTIONS === "true",
    Component: lazy(
      () => import("../components/Shared/academic/JoinInstDeptPage")
    ),
    requireAuth: true,
    title: "My Institution",
    category: "profile",
    meta: { description: "General view or setup for your institution" },
  },
  {
    path: "/institutions/:instId/*",
    display: import.meta.env.VITE_INSTITUTIONS === "true",
    Component: lazy(() => import("../pages/Institution/InstitutionDetail")),
    requireAuth: true,
    title: "Institution",
    category: "education",
    meta: { description: "Official institution page and departments" },
  },
  {
    path: "/institutions/:instId/edit",
    display: import.meta.env.VITE_INSTITUTIONS === "true",
    Component: lazy(() => import("../pages/Institution/EditInstitutionPage")),
    requireAuth: true,
    title: "Edit Institution",
    category: "education",
    meta: { description: "Manage institution settings and information" },
  },

  // Departments routes
  {
    path: "/departments",
    display: import.meta.env.VITE_DEPARTMENTS === "true",
    Component: lazy(() => import("../pages/Department/DepartmentLanding")),
    requireAuth: true,
    title: "Search Institution & Department",
    category: "education",
    meta: { description: "Find and join your department" },
  },
  {
    path: "/my-department",
    display: import.meta.env.VITE_DEPARTMENTS === "true",
    Component: lazy(
      () => import("../components/Shared/academic/JoinInstDeptPage")
    ),
    requireAuth: true,
    title: "My Department",
    category: "profile",
    meta: { description: "General view or setup for your department" },
  },
  {
    path: "/departments/:deptId/*",
    display: import.meta.env.VITE_DEPARTMENTS === "true",
    Component: lazy(() => import("../pages/Department/DepartmentDetail")),
    requireAuth: true,
    title: "Department",
    category: "education",
    meta: { description: "Official department page and updates" },
  },
  {
    path: "/departments/:deptId/edit",
    display: import.meta.env.VITE_DEPARTMENTS === "true",
    Component: lazy(() => import("../pages/Department/EditDepartmentPage")),
    requireAuth: true,
    title: "Edit Department",
    category: "education",
    meta: { description: "Manage department settings and information" },
  },

  // Utility routes
  {
    path: "/search",
    display: import.meta.env.VITE_SEARCH === "true",
    Component: lazy(() => import("../pages/Search")),
    requireAuth: true,
    title: "Search",
    category: "utility",
    meta: { description: "Search across the platform" },
  },

  {
    path: "/files",
    display: import.meta.env.VITE_FILES === "true",
    Component: lazy(() => import("../pages/FilesAndArchive")),
    requireAuth: true,
    title: "Files & Archive",
    category: "education",
    meta: {
      description: "Manage personal files and explore community study archive",
    },
  },
  {
    path: "/store",
    display: import.meta.env.VITE_STORE === "true",
    Component: lazy(() => import("../pages/StudentStore")),
    requireAuth: true,
    title: "Store",
    category: "shopping",
    meta: { description: "Student marketplace and store" },
  },
  {
    path: "/tuition",
    display: import.meta.env.VITE_TUITION === "true",
    Component: lazy(() => import("../pages/Tuition")),
    requireAuth: true,
    title: "Tuition",
    category: "education",
    meta: { description: "Find tutors and tuition services" },
  },

  // Social features
  {
    path: "/groups/*",
    display: import.meta.env.VITE_GROUPS === "true",
    Component: lazy(() => import("../pages/Group/Groups")),
    requireAuth: true,
    title: "Groups",
    category: "social",
    meta: { description: "Join and manage groups" },
  },
  {
    path: "/groups/:slug/edit",
    display: import.meta.env.VITE_GROUPS === "true",
    Component: lazy(() => import("../pages/Group/EditGroupPage")),
    requireAuth: true,
    title: "Manage Group",
    category: "social",
    meta: { description: "Edit group information and settings" },
  },
  {
    path: "/notifications",
    display: import.meta.env.VITE_NOTIFICATIONS === "true",
    Component: lazy(() => import("../pages/Notifications")),
    requireAuth: true,
    title: "Notifications",
    category: "social",
    meta: { description: "Your notifications and updates" },
  },
  {
    path: "/messages",
    display: import.meta.env.VITE_MESSAGES === "true",
    Component: lazy(() => import("../pages/Messages")),
    requireAuth: true,
    title: "Messages",
    category: "social",
    meta: { description: "Chat and messaging" },
  },
  {
    path: "/study-helper",
    display: import.meta.env.VITE_STUDY_HELPER === "true",
    Component: lazy(() => import("../pages/StudyHelperAI")),
    requireAuth: true,
    title: "Study Helper AI",
    category: "education",
    meta: { description: "AI-powered study assistant" },
  },
  {
    path: "/open-discussion",
    display: import.meta.env.VITE_OPEN_DISCUSSION === "true",
    Component: lazy(() => import("../pages/OpenDiscussion")),
    requireAuth: true,
    title: "Open Discussion",
    category: "social",
    meta: { description: "Open discussions and chat rooms" },
  },
  {
    path: "/career-hub",
    display: import.meta.env.VITE_CAREER_HUB === "true",
    Component: lazy(() => import("../pages/CareerHub")),
    requireAuth: true,
    title: "Career Hub",
    category: "career",
    meta: { description: "Find jobs and internship opportunities" },
  },
  {
    path: "/saved",
    display: import.meta.env.VITE_SAVED === "true",
    Component: lazy(() => import("../pages/Saved")),
    requireAuth: true,
    title: "Saved",
    category: "utility",
    meta: { description: "Your saved posts and content" },
  },
  {
    path: "/friends/*",
    display: import.meta.env.VITE_FRIENDS === "true",
    Component: lazy(() => import("../pages/Friends")),
    requireAuth: true,
    title: "Friends",
    category: "social",
    meta: { description: "Manage your friends and connections" },
  },
  {
    path: "/videos",
    display: import.meta.env.VITE_VIDEOS === "true",
    Component: lazy(() => import("../pages/Videos")),
    requireAuth: true,
    title: "Videos",
    category: "education",
    meta: { description: "Watch and share videos" },
  },

  // Profile routes
  {
    path: "/profile/:username",
    display: import.meta.env.VITE_PROFILE === "true",
    Component: lazy(() => import("../pages/Profile/Profile")),
    requireAuth: true,
    title: "User Profile",
    category: "profile",
    meta: { description: "View user profile" },
  },
  {
    path: "/profile/edit",
    display: import.meta.env.VITE_PROFILE === "true",
    Component: lazy(() => import("../pages/Profile/ProfileEdit")),
    requireAuth: true,
    title: "Edit Profile",
    category: "profile",
    meta: { description: "Edit your profile information" },
  },
  {
    path: "/profile/:username/details",
    display: import.meta.env.VITE_PROFILE === "true",
    Component: lazy(() => import("../pages/Profile/ProfileDetails")),
    requireAuth: true,
    title: "User Profile Details",
    category: "profile",
    meta: { description: "View user's detailed profile information" },
  },

  // Settings routes
  {
    path: "/settings",
    display: import.meta.env.VITE_SETTINGS === "true",
    Component: lazy(() => import("../pages/Settings")),
    requireAuth: true,
    title: "Settings",
    category: "utility",
    meta: { description: "Account and app settings" },
  },

  // More routes
  {
    path: "/more",
    display: import.meta.env.VITE_MORE === "true",
    Component: lazy(() => import("../pages/MainMore")),
    requireAuth: true,
    title: "More",
    category: "utility",
    meta: { description: "Additional features and services" },
  },
  {
    path: "/more/blood-donation",
    display: import.meta.env.VITE_BLOOD_DONATION === "true",
    Component: lazy(() => import("../pages/MainMore/BloodDonation")),
    requireAuth: true,
    title: "Blood Donation",
    category: "utility",
    meta: { description: "Find blood donors and save lives" },
  },

  // 404 route
  {
    path: "*",
    display: false,
    Component: lazy(() => import("../pages/Fallbacks/NotFound")),
    requireAuth: false,
    title: "Page Not Found",
    category: "error",
    meta: { description: "The page you're looking for doesn't exist" },
  },
];

export const getRouteByPath = (path: string) =>
  routes.find((route) => route.path === path);
