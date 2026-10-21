```tsx
"use client";

import { useState } from "react";
import { User } from "../types/auth";
import { getUser, logout as clearAuth } from "../lib/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => getUser());

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  return {
    user,
    loading: false,
    isAuthenticated: !!user,
    logout: handleLogout,
  };
};
