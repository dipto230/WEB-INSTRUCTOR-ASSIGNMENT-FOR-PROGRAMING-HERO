import { User } from "../types/auth";


export const saveAuth = (
  token: string,
  user: User,
) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem(
    "user",
    JSON.stringify(user),
  );
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
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};