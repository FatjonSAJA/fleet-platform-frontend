import type { AxiosError } from "axios";
import type { DjangoApiErrorResponse } from "./types";

export class ApiError extends Error {
  /** Error code from Django */
  code: string | null;
  /** HTTP status code */
  status: number | null;
  /** All error codes from validation errors */
  codes: string[];

  constructor(
    message: string,
    code: string | null = null,
    status: number | null = null,
    codes: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.codes = codes;
  }

  /** Check if error has a specific code */
  hasCode(code: string): boolean {
    return this.code === code || this.codes.includes(code);
  }
}

/**
 * Extracts user-friendly error message from Django API error response
 * Priority: message > detail (string) > detail (array) > detail (object)
 */
function extractErrorMessage(
  data: DjangoApiErrorResponse | undefined,
): string | undefined {
  if (!data) {
    return undefined;
  }

  if (data.message) {
    return data.message;
  }

  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    const messages = data.detail
      .map((item) => (typeof item === "string" ? item : String(item)))
      .filter(Boolean);
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  if (
    data.detail &&
    typeof data.detail === "object" &&
    !Array.isArray(data.detail)
  ) {
    const messages = extractNestedMessages(
      data.detail as Record<string, unknown>,
    );
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return undefined;
}

/**
 * Recursively extracts string messages from nested error detail objects
 */
function extractNestedMessages(obj: Record<string, unknown>): string[] {
  const messages: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      if (key === "non_field_errors") {
        messages.push(value);
      } else {
        messages.push(`${key}: ${value}`);
      }
    } else if (Array.isArray(value)) {
      const arrayMessages = value
        .map((item) => (typeof item === "string" ? item : null))
        .filter((item): item is string => item !== null);
      if (arrayMessages.length > 0) {
        if (key === "non_field_errors") {
          messages.push(arrayMessages.join(" "));
        } else {
          messages.push(`${key}: ${arrayMessages.join(" ")}`);
        }
      }
    } else if (value && typeof value === "object") {
      messages.push(...extractNestedMessages(value as Record<string, unknown>));
    }
  }

  return messages;
}

/**
 * Creates an ApiError from an Axios error response
 */
export function createApiError(
  axiosError: AxiosError<DjangoApiErrorResponse>,
): ApiError {
  const data = axiosError.response?.data;
  const status = axiosError.response?.status ?? null;

  const message =
    extractErrorMessage(data) ||
    axiosError.message ||
    "An unexpected error occurred";

  const code = data?.code ?? null;
  const codes = data?.codes ?? [];

  return new ApiError(message, code, status, codes);
}
