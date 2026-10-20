import { Router } from "express";

import {
  authenticate,
  authorize,
} from "../../middlewares/auth";



import validate from "../../middlewares/validation";

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
  authenticate,
  authorize(Role.STUDENT),
  validate(createSubmissionSchema),
  createSubmissionController,
);

export default router;