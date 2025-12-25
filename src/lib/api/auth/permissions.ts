import type { AuthGroup, User } from "./types";

export type PermissionRule =
  | AuthGroup
  | { type: "AND"; rules: PermissionRule[] }
  | { type: "OR"; rules: PermissionRule[] }
  | { type: "NOT"; rule: PermissionRule };

export const and = (...rules: PermissionRule[]): PermissionRule => ({
  type: "AND",
  rules,
});

export const or = (...rules: PermissionRule[]): PermissionRule => ({
  type: "OR",
  rules,
});

export const not = (rule: PermissionRule): PermissionRule => ({
  type: "NOT",
  rule,
});

export function hasAccess(
  user: User | null | undefined,
  rule?: PermissionRule,
): boolean {
  if (!rule) return true;
  if (!user) return false;

  const userGroups = new Set(user.groups.map((g) => g.name));

  const check = (r: PermissionRule): boolean => {
    if (typeof r === "string") {
      return userGroups.has(r);
    }
    switch (r.type) {
      case "AND":
        return r.rules.every(check);
      case "OR":
        return r.rules.some(check);
      case "NOT":
        return !check(r.rule);
    }
  };

  return check(rule);
}
