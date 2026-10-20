import { Router } from "express";
import { signupController } from "./auth.controller";
import { signupSchema } from "./auth.validation";
import validate from "../../middlewares/validation";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema),
  signupController,
);

export default router;