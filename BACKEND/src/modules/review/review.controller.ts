import {
  Response,
  NextFunction,
} from "express";

import {
  AuthenticatedRequest,
} from "../../types/auth";

import {
  getSubmissions,
} from "./review.service";

import {
  GetSubmissionsQuery,
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