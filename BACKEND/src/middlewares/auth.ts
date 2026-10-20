import {
  NextFunction,
  Response,
} from "express";

import AppError from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/auth";
import { Role } from "../generated/prisma/enums";

export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(
        "Authentication required",
        401,
      );
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(
        "Invalid authorization format",
        401,
      );
    }

    const payload = verifyToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    return next(
      new AppError(
        "Invalid or expired token",
        401,
      ),
    );
  }
};

export const authorize = (...allowedRoles: Role[]) => {
  return (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      return next(
        new AppError(
          "Authentication required",
          401,
        ),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to access this resource",
          403,
        ),
      );
    }

    next();
  };
};