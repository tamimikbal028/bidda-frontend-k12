import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { FEATURE_FLAGS } from "../constants/featureFlags";

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
    display: FEATURE_FLAGS.COMPETITION,
    Component: lazy(() => import("../pages/Gaming/Gaming")),
    requireAuth: true,
    title: "Gaming",
    category: "entertainment",
    meta: { description: "Gaming hub and competitions" },
  },

  // Institutions routes
  {
    path: "/institutions",
    display: FEATURE_FLAGS.INSTITUTIONS,
    Component: lazy(() => import("../pages/Institution/InstitutionLanding")),
    requireAuth: true,
    title: "Search Institution & Department",
    category: "education",
    meta: { description: "Find and join your institution" },
  },
  {
    path: "/my-institution",
    display: FEATURE_FLAGS.INSTITUTIONS,
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
    display: FEATURE_FLAGS.INSTITUTIONS,
    Component: lazy(() => import("../pages/Institution/InstitutionDetail")),
    requireAuth: true,
    title: "Institution",
    category: "education",
    meta: { description: "Official institution page and departments" },
  },
  {
    path: "/institutions/:instId/edit",
    display: FEATURE_FLAGS.INSTITUTIONS,
    Component: lazy(() => import("../pages/Institution/EditInstitutionPage")),
    requireAuth: true,
    title: "Edit Institution",
    category: "education",
    meta: { description: "Manage institution settings and information" },
  },

  // Departments routes
  {
    path: "/departments",
    display: FEATURE_FLAGS.DEPARTMENTS,
    Component: lazy(() => import("../pages/Department/DepartmentLanding")),
    requireAuth: true,
    title: "Search Institution & Department",
    category: "education",
    meta: { description: "Find and join your department" },
  },
  {
    path: "/my-department",
    display: FEATURE_FLAGS.DEPARTMENTS,
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
    display: FEATURE_FLAGS.DEPARTMENTS,
    Component: lazy(() => import("../pages/Department/DepartmentDetail")),
    requireAuth: true,
    title: "Department",
    category: "education",
    meta: { description: "Official department page and updates" },
  },
  {
    path: "/departments/:deptId/edit",
    display: FEATURE_FLAGS.DEPARTMENTS,
    Component: lazy(() => import("../pages/Department/EditDepartmentPage")),
    requireAuth: true,
    title: "Edit Department",
    category: "education",
    meta: { description: "Manage department settings and information" },
  },
  {
    path: "/study-helper",
    display: FEATURE_FLAGS.STUDY_HELPER,
    Component: lazy(() => import("../pages/StudyHelperAI")),
    requireAuth: true,
    title: "Study Helper AI",
    category: "education",
    meta: { description: "AI-powered study assistant" },
  },
  {
    path: "/open-discussion",
    display: FEATURE_FLAGS.OPEN_DISCUSSION,
    Component: lazy(() => import("../pages/OpenDiscussion")),
    requireAuth: true,
    title: "Open Discussion",
    category: "social",
    meta: { description: "Open discussions and chat rooms" },
  },

  // Settings routes
  {
    path: "/settings",
    display: FEATURE_FLAGS.SETTINGS,
    Component: lazy(() => import("../pages/Settings")),
    requireAuth: true,
    title: "Settings",
    category: "utility",
    meta: { description: "Account and app settings" },
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
