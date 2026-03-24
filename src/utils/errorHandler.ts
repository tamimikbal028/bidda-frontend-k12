import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiError } from "../types";

// Overload 1: Higher-Order Function usage
export function handleMutationError(
  fallbackMessage: string
): (error: AxiosError<ApiError>) => void;

// Overload 2: Direct execution usage
export function handleMutationError(
  error: AxiosError<ApiError>,
  fallbackMessage: string
): void;

// Implementation
export function handleMutationError(
  arg1: AxiosError<ApiError> | string,
  arg2?: string
) {
  // If the first argument is a string, it's the HOF usage
  if (typeof arg1 === "string") {
    const fallback = arg1; // It must be defined based on the overload
    return (error: AxiosError<ApiError>) => {
      _processError(error, fallback);
    };
  }

  // Otherwise, it's the direct execution usage
  const error = arg1 as AxiosError<ApiError>;
  const fallback = arg2 as string; // It must be defined based on the overload
  _processError(error, fallback);
}

// Core error extraction logic
const _processError = (error: AxiosError<ApiError>, fallbackMessage: string) => {
  const errorData = error.response?.data;

  // Case 1: Multiple validation errors (422 status)
  if (
    errorData?.errors &&
    Array.isArray(errorData.errors) &&
    errorData.errors.length > 0
  ) {
    errorData.errors.forEach((err) => toast.error(err));
    return;
  }

  // Case 2: Single error message
  if (errorData?.message) {
    toast.error(errorData.message);
    return;
  }

  // Case 3: Fallback
  toast.error(fallbackMessage);
};
