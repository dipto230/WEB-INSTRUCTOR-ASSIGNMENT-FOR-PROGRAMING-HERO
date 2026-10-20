import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodSchema } from "zod";

type ValidationTarget =
  | "body"
  | "query"
  | "params";

interface ValidatedRequest extends Request {
  validatedQuery?: unknown;
  validatedParams?: unknown;
}

const validate = (
  schema: ZodSchema,
  target: ValidationTarget = "body",
) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(
      req[target],
    );

    if (!result.success) {
      const errors = result.error.issues.map(
        (issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }),
      );

      return next({
        statusCode: 400,
        message: "Validation failed",
        errors,
      });
    }

    if (target === "body") {
      req.body = result.data;
    }

    if (target === "query") {
      (
        req as ValidatedRequest
      ).validatedQuery = result.data;
    }

    if (target === "params") {
      (
        req as ValidatedRequest
      ).validatedParams = result.data;
    }

    next();
  };
};

export default validate;