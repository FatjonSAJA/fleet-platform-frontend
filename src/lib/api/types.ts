export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Django backend API error response structure
 *
 * Response types:
 * 1. ValidationError: { success, message, code?, codes? }
 * 2. RawAPIResponse: { success, detail } (no message)
 * 3. APIException: { success, message, detail, code?, error: "Programming Error" }
 * 4. SASValidationError/SASValueError: { success, message, error: "Validation Error" }
 * 5. ServerError (500): { success, message, detail, error: "Server Error" }
 */
export interface DjangoApiErrorResponse {
  success: false;
  message?: string;
  detail?: string | Record<string, unknown> | unknown[];
  error?: string;
  code?: string;
  codes?: string[];
}
