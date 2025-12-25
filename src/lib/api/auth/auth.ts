import { apiClient } from "../client";
import type { LoginRequest, User } from "./types";

export async function login(credentials: LoginRequest): Promise<User> {
  const response = await apiClient.post<User>("auth/login/", credentials);
  return response.data;
}
