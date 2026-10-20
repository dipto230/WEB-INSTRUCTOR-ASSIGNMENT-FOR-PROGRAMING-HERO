import { Router } from "express";

import {
  authenticate,
  authorize,
} from "../../middlewares/auth";



import validate from "../../middlewares/validation";

import {
  getSubmissionsQuerySchema,
} from "./review.validation";

import {
  getSubmissionsController,
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

export default router;