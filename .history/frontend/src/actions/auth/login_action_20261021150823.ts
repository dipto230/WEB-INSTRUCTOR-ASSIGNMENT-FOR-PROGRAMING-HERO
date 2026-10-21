import api from "@/lib/api";
import { LoginData, LoginResponse } from "@/types/auth";

export const loginAction = async (
  data: LoginData,
): Promise<LoginResponse> => {
  const response = await api.post(
    "/auth/login",
    data,
  );

  return response.data.data;
};