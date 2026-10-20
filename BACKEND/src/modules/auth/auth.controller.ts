import { Request, Response, NextFunction } from "express";
import { signup } from "./auth.service";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const user = await signup({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Student registration successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};