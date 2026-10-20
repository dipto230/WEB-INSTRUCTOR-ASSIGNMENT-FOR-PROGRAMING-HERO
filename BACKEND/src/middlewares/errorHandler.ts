import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

interface ValidationError extends Error {
  statusCode?: number;
  errors?: {
    field: string;
    message: string;
  }[];
}

const errorHandler = (
  error: ValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error.statusCode === 400 && error.errors) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;