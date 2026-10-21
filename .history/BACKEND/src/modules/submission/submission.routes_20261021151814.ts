import { Router } from "express";

import {
  authenticate,
  authorize,
} from "../../middlewares/auth";



import validate from "../../middlewares/validation";

import {
  submissionRateLimiter,
} from "../../middlewares/rateLimiter";

import {
  createSubmissionSchema,
} from "./submission.validation";

import {
  createSubmissionController,
} from "./submission.controller";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  submissionRateLimiter,
  authenticate,
  authorize(Role.STUDENT),
  validate(createSubmissionSchema),
  createSubmissionController,
);
router.get(
  "/my",
  authenticate,
  authorize(Role.STUDENT),
  getMySubmissionsController,
);

export default router;