"use client";

import { useEffect, useState } from "react";
import { User } from "../types/auth";
import { getUser,logout as clearAuth } from "../lib/auth";


export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();

    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout: handleLogout,
  };
};