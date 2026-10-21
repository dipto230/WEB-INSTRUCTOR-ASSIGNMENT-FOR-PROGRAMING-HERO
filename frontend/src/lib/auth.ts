import { User } from "@/types/auth";

export const saveAuth = (
  token: string,
  user: User,
) => {
  localStorage.setItem("token", token);
  localStorage.setItem(
    "user",
    JSON.stringify(user),
  );
};

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};