import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/auth";
import { createSubmission,getMySubmissions } from "./submission.service";

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

export const getMySubmissionsController =
  async (
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

      const submissions =
        await getMySubmissions(
          req.user.userId,
        );

      res.status(200).json({
        success: true,
        message:
          "Your submissions retrieved successfully",
        data: submissions,
      });
    } catch (error) {
      next(error);
    }
  };