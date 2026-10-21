import { LoginData, LoginResponse } from "@/src/types/auth";


export const loginAction = async (
  data: LoginData,
): Promise<LoginResponse> => {
  const response = await api.post(
    "/auth/login",
    data,
  );

  return response.data.data;
};