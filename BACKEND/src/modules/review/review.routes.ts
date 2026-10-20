import { Router } from "express";

import {
  authenticate,
  authorize,
} from "../../middlewares/auth";



import validate from "../../middlewares/validation";

import {
  getSubmissionsQuerySchema,
  reviewSubmissionSchema,
} from "./review.validation";

import {
    approveSubmissionController,
  getSubmissionsController,
  rejectSubmissionController,
} from "./review.controller";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.get(
  "/submissions",
  authenticate,
  authorize(Role.MENTOR),
  validate(
    getSubmissionsQuerySchema,
    "query",
  ),
  getSubmissionsController,
);
router.patch(
  "/submissions/:id/approve",
  authenticate,
  authorize(Role.MENTOR),
  validate(
    reviewSubmissionSchema,
    "body",
  ),
  approveSubmissionController,
);

router.patch(
  "/submissions/:id/reject",
  authenticate,
  authorize(Role.MENTOR),
  validate(
    reviewSubmissionSchema,
    "body",
  ),
  rejectSubmissionController,
);
export default router;