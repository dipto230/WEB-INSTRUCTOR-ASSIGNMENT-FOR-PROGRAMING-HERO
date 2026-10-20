import prisma from "../../config/prisma";
import AppError from "../../utils/AppError";
import { hashPassword } from "../../utils/password";
import { SignupInput } from "./auth.validation";

export const signup = async ({
  name,
  email,
  password,
}: SignupInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};