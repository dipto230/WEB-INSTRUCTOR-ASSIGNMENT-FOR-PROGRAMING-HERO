import { Router } from "express";
import { loginController, signupController } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.validation";
import validate from "../../middlewares/validation";

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

export default router;