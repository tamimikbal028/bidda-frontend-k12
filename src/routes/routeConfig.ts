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
