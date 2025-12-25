import type { ReactNode } from "react";
import type { ApiError } from "@/lib/api/exceptions";

export type ErrorVariant = "error" | "warning";

export interface FormErrorAlertProps {
  error: ApiError | Error | string | null | undefined;
  show?: boolean;
  fallbackMessage?: ReactNode;
  variant?: ErrorVariant;
  className?: string;
  title?: ReactNode;
  showIcon?: boolean;
  showCode?: boolean;
  "data-qa-id"?: string;
}
