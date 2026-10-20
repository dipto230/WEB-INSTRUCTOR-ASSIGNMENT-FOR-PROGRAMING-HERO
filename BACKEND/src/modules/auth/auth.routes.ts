import { Router } from "express";

import {
  loginController,
  signupController,
} from "./auth.controller";

import validate from "../../middlewares/validation";

import {
  loginSchema,
  signupSchema,
} from "./auth.validation";

import { authenticate } from "../../middlewares/auth";

import { AuthenticatedRequest } from "../../types/auth";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema),
  signupController,
);

router.post(
  "/login",
  validate(loginSchema),
  loginController,
);

router.get(
  "/me",
  authenticate,
  (req: AuthenticatedRequest, res) => {
    res.status(200).json({
      success: true,
      message: "Authenticated user",
      data: req.user,
    });
  },
);

export default router;