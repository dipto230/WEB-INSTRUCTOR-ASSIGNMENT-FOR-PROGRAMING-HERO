import { SignupData } from "@/src/types/auth";


export const signupAction = async (
  data: SignupData,
): Promise<User> => {
  const response = await api.post(
    "/auth/signup",
    data,
  );

  return response.data.data;
};