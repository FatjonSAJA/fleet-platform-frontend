export type AuthGroup =
  | "admin";


export type User = {
  id: number;
  email: string;
  username: string;
  auth_token: string;
  groups: Array<{
    name: AuthGroup;
  }>;
};

export interface LoginRequest {
  email: string;
  password: string;
}
