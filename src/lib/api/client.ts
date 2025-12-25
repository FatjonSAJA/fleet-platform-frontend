import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { env } from "@/env";
import { ApiError, createApiError } from "@/lib/api/exceptions.ts";
import type { DjangoApiErrorResponse } from "@/lib/api/types.ts";
import { getSessionTypeFromPath } from "@/lib/utils/session-type";
import { useAuthStore } from "@/stores/shared/authStore";
import { useLoadingStore } from "@/stores/shared/loadingStore";

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 30 * 60 * 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    useLoadingStore.getState().startRequest();

    const { adminSession, fleetSession, rentSession } = useAuthStore.getState();

    const sessionType = getSessionTypeFromPath(window.location.pathname);
    let token: string | undefined;

    switch (sessionType) {
      case "admin":
        token = adminSession?.auth_token;
        break;
      case "fleet":
        token = fleetSession?.auth_token;
        break;
      case "rent":
        token = rentSession?.auth_token;
        break;
    }

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    useLoadingStore.getState().endRequest();
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    useLoadingStore.getState().endRequest();
    return response;
  },
  (error: AxiosError<DjangoApiErrorResponse>) => {
    useLoadingStore.getState().endRequest();

    // Network error
    if (!error.response) {
      if (error.request) {
        return Promise.reject(
          new ApiError(
            "No response from server. Please check your connection.",
            "network_error",
            null,
          ),
        );
      }
      return Promise.reject(
        new ApiError(error.message || "Request failed", "request_error", null),
      );
    }

    const { status, data } = error.response;

    if (status === 401) {
      const { setAdminSession, setFleetSession, setRentSession } =
        useAuthStore.getState();
      const sessionType = getSessionTypeFromPath(window.location.pathname);

      switch (sessionType) {
        case "admin":
          setAdminSession(undefined);
          break;
        case "fleet":
          setFleetSession(undefined);
          break;
        case "rent":
          setRentSession(undefined);
          break;
        default:
          console.warn(
            "Received 401 but could not determine session type from path.",
          );
          break;
      }

      console.warn(
        `Session expired for ${sessionType || "unknown"}. Please log in again.`,
      );
    }

    switch (status) {
      case 400:
      case 422:
        console.error(
          `${data?.error || "Validation error"}:`,
          data?.message || data?.detail || data,
        );
        break;
      case 403:
        console.error("Access forbidden:", data);
        break;
      case 404:
        console.error("Resource not found:", error.config?.url);
        break;
      case 429:
        console.warn("Too many requests. Please try again later.");
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        console.error(
          `${data?.error || "Server error"} (${status}):`,
          data?.message || data?.detail,
        );
        break;
      default:
        console.error("API error:", data);
    }

    return Promise.reject(createApiError(error));
  },
);
