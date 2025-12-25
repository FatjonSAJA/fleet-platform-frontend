export type SessionType = "admin" | "fleet" | "rent" | null;

export const getSessionTypeFromPath = (path: string): SessionType => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (
    normalizedPath.startsWith("/admin")
  ) {
    return "admin";
  } else if (normalizedPath.startsWith("/fleet")) {
    return "fleet";
  } else if (normalizedPath.startsWith("/rent")) {
    return "rent";
  }

  return null;
};
