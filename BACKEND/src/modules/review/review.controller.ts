import {
  Response,
  NextFunction,
} from "express";

import {
  AuthenticatedRequest,
} from "../../types/auth";

import {
  getSubmissions,
  approveSubmission,
  rejectSubmission,
  getSubmissionStatistics,
} from "./review.service";

import {
  GetSubmissionsQuery,
  ReviewSubmissionInput,
} from "./review.validation";

interface ValidatedQueryRequest
  extends AuthenticatedRequest {
  validatedQuery?: GetSubmissionsQuery;
}

export const getSubmissionsController =
  async (
    req: ValidatedQueryRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const query =
        req.validatedQuery;

      if (!query) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid query parameters",
        });
      }

      const result =
        await getSubmissions(query);

      res.status(200).json({
        success: true,
        message:
          "Submissions retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

export const approveSubmissionController =
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required",
        });
      }

      const submissionId =
        req.params.id;

      if (
        typeof submissionId !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid submission ID",
        });
      }

      const submission =
        await approveSubmission(
          submissionId,
          req.user.userId,
          req.body as ReviewSubmissionInput,
        );

      res.status(200).json({
        success: true,
        message:
          "Submission approved successfully",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  };

export const rejectSubmissionController =
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required",
        });
      }

      const submissionId =
        req.params.id;

      if (
        typeof submissionId !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid submission ID",
        });
      }

      const submission =
        await rejectSubmission(
          submissionId,
          req.user.userId,
          req.body as ReviewSubmissionInput,
        );

      res.status(200).json({
        success: true,
        message:
          "Submission rejected successfully",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  };

export const getSubmissionStatisticsController =
  async (
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const statistics =
        await getSubmissionStatistics();

      res.status(200).json({
        success: true,
        message:
          "Submission statistics retrieved successfully",
        data: statistics,
      });
    } catch (error) {
      next(error);
    }
  };