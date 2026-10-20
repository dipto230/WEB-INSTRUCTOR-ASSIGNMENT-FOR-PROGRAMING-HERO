import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/auth";
import { createSubmission } from "./submission.service";

export const createSubmissionController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const submission = await createSubmission(
      req.user.userId,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};