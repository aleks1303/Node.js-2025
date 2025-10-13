import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(userValidator.create),
  authController.signUp,
);
router.post("/sign-in", authController.signIn);

export const authRouter = router;
